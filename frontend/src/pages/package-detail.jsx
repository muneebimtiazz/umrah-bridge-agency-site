import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Plane,
  Star,
  User,
  Mail,
  Globe,
  Users,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Building2,
  UtensilsCrossed,
  SlidersHorizontal,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { getPackageById } from "../services/package.service";
import { createInquiry } from "../services/enquiry.service";

// Mapping helper for inclusions to clean text and premium icons
const inclusionMeta = {
  visa: { icon: <SlidersHorizontal className="w-4 h-4 text-[#c9a84c]" />, label: "Umrah Visa Processing" },
  flights: { icon: <Plane className="w-4 h-4 text-[#c9a84c]" />, label: "Return Airfare Logistics" },
  hotelAccommodation: { icon: <Building2 className="w-4 h-4 text-[#c9a84c]" />, label: "Hotel Accommodations" },
  airportTransfers: { icon: <MapPin className="w-4 h-4 text-[#c9a84c]" />, label: "Ground Airport Transfers" },
  groundTransport: { icon: <Globe className="w-4 h-4 text-[#c9a84c]" />, label: "Inter-City Transport" },
  ziyaratTours: { icon: <Landmark className="w-4 h-4 text-[#c9a84c]" />, label: "Guided Ziyarat Tours" },
  meals: { icon: <UtensilsCrossed className="w-4 h-4 text-[#c9a84c]" />, label: "Suhoor & Iftar Catering" }
};

const JOURNEY_TYPES = ["Umrah Package", "Hajj Package", "Custom Itinerary", "Visa Only"];
const TRAVELER_COUNTS = ["1 Pilgrim", "2 Pilgrims", "3-4 Pilgrims", "5+ Pilgrims"];

function StarRow({ count = 3 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-[#c9a84c] text-[#c9a84c]" strokeWidth={0} />
      ))}
    </div>
  );
}

function HotelImageSlider({ images = [], badge, name }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Extract URLs from database objects. If no images uploaded, use a fallback banner.
  const slides = images && images.length > 0 
    ? images.map(img => img.url) 
    : ["https://placehold.co/600x400/0d2820/c9a84c?text=Images+Coming+Soon"];

  return (
    <div className="relative overflow-hidden h-56 w-full group/slider bg-[#0d2820]">
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((imgUrl, idx) => (
          <div key={idx} className="w-full h-full shrink-0">
            <img src={imgUrl} alt={`${name} preview ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <span className="absolute top-3 left-3 bg-[#051a14] text-[#c9a84c] text-[10px] font-bold px-2.5 py-1 rounded-sm border border-[#1a3028] tracking-wider uppercase shadow-md z-10">
        {badge}
      </span>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setCurrentIndex(v => v === 0 ? slides.length - 1 : v - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded bg-white/90 text-[#051a14] hover:bg-white opacity-0 group-hover/slider:opacity-100 transition-all z-10 shadow-sm cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setCurrentIndex(v => v === slides.length - 1 ? 0 : v + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded bg-white/90 text-[#051a14] hover:bg-white opacity-0 group-hover/slider:opacity-100 transition-all z-10 shadow-sm cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
}

export default function PackageDetail() {
  const { id } = useParams();

  const [pkg, setPkg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    journeyType: "Umrah Package",
    travelers: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  const [submitError, setSubmitError] = useState(null);

  // ─── Fetch the real package by ID ───
  useEffect(() => {
    let isMounted = true;

    const fetchPackage = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getPackageById(id);

        const payload = res?.data;
        const data = payload?.data || payload?.package || payload;

        if (isMounted) {
          setPkg(data);
          setForm((prev) => ({
            ...prev,
            journeyType: `${data?.journeyType || "Umrah"} Package`,
          }));
        }
      } catch (err) {
        console.error("Failed to load package:", err);
        if (isMounted) {
          setError("We couldn't find this package. It may have been removed or the link is incorrect.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (id) {
      fetchPackage();
    } else {
      setError("No package was specified.");
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ─── Submit the inquiry form via the enquiry service ───
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.phone) {
      setSubmitStatus("error");
      setSubmitError("Please share your name and phone number so we can reach you.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitError(null);

    try {
      await createInquiry({
        ...form,
        packageId: pkg?._id,
        packageTitle: pkg?.title,
      });

      setSubmitStatus("success");
      setForm({
        fullName: "",
        phone: "",
        email: "",
        journeyType: `${pkg?.journeyType || "Umrah"} Package`,
        travelers: "",
        message: "",
      });
    } catch (err) {
      console.error("Failed to submit inquiry:", err);
      setSubmitStatus("error");
      setSubmitError("Something went wrong sending your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50/40 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <Loader2 className="w-7 h-7 animate-spin text-[#c9a84c]" />
          <p className="text-sm font-medium">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="bg-gray-50/40 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="text-gray-700 font-semibold mb-1">Package Unavailable</p>
          <p className="text-gray-500 text-sm">{error || "This package could not be found."}</p>
        </div>
      </div>
    );
  }

  const totalNights = (pkg.makkahNights || 0) + (pkg.madinahNights || 0);
  const currencySymbol = pkg.pricing?.currency === "GBP" ? "£" : "$";

  const activeItinerary = [
    { id: 1, title: `Arrival & Makkah Residency (${pkg.makkahNights} Nights)`, description: "Arrive at the terminal checkpoint where our handling team greets you. Enjoy comfortable shared transfers directly to your Makkah lodging room setup. Perfect for experiencing peaceful Ramadan atmospheric environments near the Holy Site." },
    { id: 2, title: `Inter-City Transit Phase`, description: "Logistical transport connection routing your pilgrim group safely across the regional highway network lanes from Makkah directly into the heart of Madinah." },
    { id: 3, title: `Madinah Prophetic Sanctuary Stay (${pkg.madinahNights} Nights)`, description: `Residency allocated inside clean, accessible spaces for ${pkg.madinahNights} nights. Structured to provide time frames for prayer inside Masjid an-Nabawi.` }
  ];

  const activeInclusions = Object.keys(pkg.inclusions || {})
    .filter((key) => pkg.inclusions[key] === true && inclusionMeta[key])
    .map((key) => ({
      title: inclusionMeta[key].label,
      icon: inclusionMeta[key].icon
    }));

  const whatsappMessage = encodeURIComponent(`I am interested in the ${pkg.title} package`);

  return (
    <div className="bg-gray-50/40 min-h-screen font-sans antialiased text-gray-900">

      {/* ─── Hero Billboard Header ─── */}
      <div className="bg-[#051a14] px-6 py-24 relative overflow-hidden border-b border-[#1a3028]">
        
        {/* Dynamic Background Image using Hero Image */}
        {pkg.heroImage?.url && (
          <>
            <img 
              src={pkg.heroImage.url} 
              alt={pkg.title} 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#051a14] via-[#051a14]/80 to-transparent" />
          </>
        )}

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-4">
            <span className="bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
              Seasonal {pkg.tier} Category Availability
            </span>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 max-w-2xl">
            {pkg.title}
          </h1>
          <p className="text-[#b4bbb9] text-[13px] sm:text-[14px] leading-relaxed max-w-xl mb-8">
            {pkg.description} 
          </p>
          <div>
            <p className="text-[#b4bbb9] text-[11px] font-bold uppercase tracking-widest mb-1">Package Starting Rate</p>
            <p className="text-[#c9a84c] text-3xl font-black leading-none">
              {currencySymbol}{pkg.pricing?.amount?.toLocaleString()} <span className="text-sm font-normal text-[#b4bbb9]">/ per pilgrim ({pkg.pricing?.sharingType} Room Configuration)</span>
            </p>
          </div>
        </div>
      </div>

      {/* ─── Main Tri-Column Matrix Layout ─── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm space-y-4">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <h2 className="text-[15px] font-bold text-[#051a14] uppercase tracking-wide flex items-center gap-2">
                  <span className="h-4 w-1 bg-[#c9a84c] rounded-full" />
                  Your Accommodation Bases
                </h2>
                <span className="text-[11px] font-bold bg-[#051a14] text-[#c9a84c] px-2.5 py-0.5 rounded tracking-wider uppercase">
                  {totalNights + 1} Days / {totalNights} Nights Structure
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Makkah Accommodations Card */}
                <div className="border border-gray-100 bg-gray-50/20 rounded overflow-hidden flex flex-col shadow-sm">
                  <HotelImageSlider 
                    images={pkg.makkahHotel?.images} 
                    badge="Makkah Lodging" 
                    name={pkg.makkahHotel?.name || "Makkah Accommodation"} 
                  />
                  <div className="p-4 flex flex-col flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[14px] font-bold text-[#051a14]">
                        {pkg.makkahHotel?.name || "Makkah Premium Base"}
                      </h4>
                      <StarRow count={pkg.makkahHotel?.starRating || 3} />
                    </div>
                    <p className="text-[11px] font-bold text-[#c9a84c] tracking-wider uppercase">{pkg.makkahNights} Nights Total Stay</p>
                    <div className="flex items-center gap-2 text-gray-500 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                      <span className="text-[12px] text-gray-600 line-clamp-1" title={pkg.makkahHotel?.distanceFromHaram}>
                        {pkg.makkahHotel?.distanceFromHaram ? `${pkg.makkahHotel.distanceFromHaram} to Haram` : "Clean, reliable transit corridor access"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Madinah Accommodations Card */}
                <div className="border border-gray-100 bg-gray-50/20 rounded overflow-hidden flex flex-col shadow-sm">
                  <HotelImageSlider 
                    images={pkg.madinahHotel?.images} 
                    badge="Madinah Lodging" 
                    name={pkg.madinahHotel?.name || "Madinah Accommodation"} 
                  />
                  <div className="p-4 flex flex-col flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[14px] font-bold text-[#051a14]">
                        {pkg.madinahHotel?.name || "Madinah Clean Quarters"}
                      </h4>
                      <StarRow count={pkg.madinahHotel?.starRating || 3} />
                    </div>
                    <p className="text-[11px] font-bold text-[#c9a84c] tracking-wider uppercase">{pkg.madinahNights} Nights Total Stay</p>
                    <div className="flex items-center gap-2 text-gray-500 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                      <span className="text-[12px] text-gray-600 line-clamp-1" title={pkg.madinahHotel?.distanceFromHaram}>
                        {pkg.madinahHotel?.distanceFromHaram ? `${pkg.madinahHotel.distanceFromHaram} to Masjid an-Nabawi` : "Convenient central coordinates inside the city"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <div className="border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                <span className="h-4 w-1 bg-[#c9a84c] rounded-full" />
                <h2 className="text-[15px] font-bold text-[#051a14] uppercase tracking-wide">
                  Spiritual Itinerary Flow Timeline
                </h2>
              </div>

              <div className="flex flex-col">
                {activeItinerary.map((step, idx) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-5 h-5 rounded-full bg-[#051a14] border-2 border-[#c9a84c] flex items-center justify-center mt-0.5 shadow-sm">
                        <span className="text-[10px] text-[#c9a84c] font-black">{step.id}</span>
                      </div>
                      {idx < activeItinerary.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gray-200/80 my-1.5" />
                      )}
                    </div>
                    <div className="pb-5 flex-1">
                      <h3 className="text-[13px] font-bold text-[#051a14] leading-tight mb-1">{step.title}</h3>
                      <p className="text-[12px] text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#051a14] rounded p-5 shadow-md border border-[#1a3028]">
              <h2 className="text-[15px] font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2">
                <span className="h-4 w-1 bg-[#c9a84c] rounded-full" />
                Guaranteed Included Services
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeInclusions.map((item) => (
                  <div key={item.title} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-sm">
                    <div className="p-1.5 rounded bg-white/5 shrink-0">
                      {item.icon}
                    </div>
                    <p className="text-[13px] font-bold text-white tracking-wide">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#c9a84c]" />
              <div className="text-center mb-4">
                <p className="text-[11px] font-bold tracking-widest uppercase text-[#c9a84c] mb-0.5">Package Configurator</p>
                <h2 className="text-[20px] font-black text-[#051a14] tracking-tight uppercase">{pkg.tier} Track Specifications</h2>
              </div>

              <div className="bg-gray-50 rounded p-3 space-y-2.5 border border-gray-100 mb-4">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Room Distribution</span>
                  <span className="font-bold text-[#051a14]">{pkg.pricing?.sharingType} Room Configuration</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Flight Routing</span>
                  <span className="font-bold text-[#051a14]">{pkg.directFlights ? "Direct Flight Route" : "Standard Connection"}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3.5 mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Estimated Base Rate</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#051a14]">{currencySymbol}{pkg.pricing?.amount?.toLocaleString()}</span>
                    <p className="text-[10px] text-gray-400 mt-0.5">Per Pilgrim Price</p>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/447445274723?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-4 rounded font-bold text-[12px] uppercase tracking-widest transition-colors duration-300 shadow-sm cursor-pointer w-full"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.516 2.266 2.27 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.295 1.489 5.356 1.491 5.487 0 9.954-4.431 9.957-9.874.001-2.637-1.03-5.112-2.905-6.979C17.223 1.925 14.734.896 12.01.896 6.518.896 2.053 5.328 2.05 10.772c-.001 2.04.507 3.633 1.467 5.258l-1.01 3.687 3.81-.973zM17.65 15c-.3-.15-1.77-.874-2.046-.975-.276-.101-.476-.15-.676.15-.199.3-.774.975-.95 1.174-.175.2-.351.224-.651.075-1.206-.597-2.008-1.055-2.812-2.435-.213-.365.213-.34.61-.133.356.186.476.3.651.45.175.15.175.25.088.425-.088.175-.476.95-.576 1.1-.1.149-.2.174-.5.025-.3-.15-1.272-.469-2.422-1.496-.895-.798-1.5-1.783-1.675-2.083-.175-.3-.018-.463.13-.612.134-.133.3-.349.45-.524.149-.174.199-.299.299-.499.1-.2.05-.375-.025-.525-.075-.15-.676-1.628-.926-2.228-.244-.585-.491-.507-.676-.516-.174-.008-.374-.01-.575-.01-.2 0-.525.075-.8.376-.274.301-1.049 1.026-1.049 2.503 0 1.477 1.075 2.903 1.224 3.103.15.2 2.115 3.23 5.124 4.532.715.31 1.273.495 1.708.633.719.229 1.373.196 1.89.119.577-.087 1.771-.724 2.022-1.424.25-.7.25-1.3.175-1.425-.075-.125-.275-.199-.575-.349z"/>
                </svg>
                <span>Chat via WhatsApp</span>
              </a>
            </div>

            <div className="bg-[#051a14] rounded p-6 shadow-xl border border-[#1a3028]">
              <div className="mb-6">
                <span className="inline-block px-2.5 py-0.5 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-[11px] font-bold uppercase tracking-widest rounded-full mb-2">
                  Bespoke Planning
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight">Request a Quote</h2>
                <p className="text-[12px] text-gray-400 mt-1 leading-normal">
                  Allow our concierges to craft your perfect spiritual journey. We will respond within 2 hours.
                </p>
              </div>

              {submitStatus === "success" && (
                <div className="mb-4 flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-[12px] font-semibold rounded-sm px-3 py-2.5">
                  <CheckCircle2 size={15} />
                  Thank you — your inquiry has been received. Our team will reach out shortly.
                </div>
              )}
              {submitStatus === "error" && submitError && (
                <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-[12px] font-semibold rounded-sm px-3 py-2.5">
                  {submitError}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative flex items-center">
                    <User size={15} className="absolute left-3 text-[#c9a84c]" />
                    <input type="text" name="fullName" placeholder="Enter your full name" value={form.fullName} onChange={handleChange}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-sm py-2.5 pl-9 pr-3 placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Phone / WhatsApp</label>
                  <div className="relative flex items-center">
                    <Mail size={15} className="absolute left-3 text-[#c9a84c]" />
                    <input type="tel" name="phone" placeholder="+44 7912 345678" value={form.phone} onChange={handleChange}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-sm py-2.5 pl-9 pr-3 placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <span className="text-[11px] text-gray-500 font-medium">Optional</span>
                  </div>
                  <div className="relative flex items-center">
                    <Mail size={15} className="absolute left-3 text-[#c9a84c]" />
                    <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-sm py-2.5 pl-9 pr-3 placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Journey Type</label>
                  <div className="relative flex items-center">
                    <Globe size={15} className="absolute left-3 text-[#c9a84c] pointer-events-none" />
                    <select name="journeyType" value={form.journeyType} onChange={handleChange}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-sm py-2.5 pl-9 pr-8 appearance-none focus:outline-none focus:border-[#c9a84c] cursor-pointer"
                    >
                      {JOURNEY_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-[#051a14] text-white">{type}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 flex items-center text-gray-500"><span className="text-[10px]">▼</span></div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Travelers</label>
                  <div className="relative flex items-center">
                    <Users size={15} className="absolute left-3 text-[#c9a84c] pointer-events-none" />
                    <select name="travelers" value={form.travelers} onChange={handleChange}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-sm py-2.5 pl-9 pr-8 appearance-none focus:outline-none focus:border-[#c9a84c] cursor-pointer"
                    >
                      <option value="" disabled hidden>Select count...</option>
                      {TRAVELER_COUNTS.map((count) => (
                        <option key={count} value={count} className="bg-[#051a14] text-white">{count}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 flex items-center text-gray-500"><span className="text-[10px]">▼</span></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Special Requests</label>
                    <span className="text-[11px] text-gray-500 font-medium">Optional</span>
                  </div>
                  <div className="relative flex items-start">
                    <MessageSquare size={15} className="absolute left-3 top-3 text-[#c9a84c]" />
                    <textarea name="message" placeholder="Preferred travel windows, custom expansion targets, or lodging needs..." value={form.message} onChange={handleChange} rows={2}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-sm py-2.5 pl-9 pr-3 placeholder-gray-600 focus:outline-none focus:border-[#c9a84c] resize-none" />
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-[#c9a84c] hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed text-[#051a14] transition-colors duration-300 text-[12px] font-extrabold uppercase tracking-widest py-3.5 px-4 rounded flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                    {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}