import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  FileText,
  PhoneCall,
  PlaneTakeoff,
  Car,
  Bus,
  Star,
  Lock,
  User,
  Mail,
  Globe,
  Users,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight,
  Landmark,
  BedDouble,
  UtensilsCrossed,
  SlidersHorizontal,
  ClipboardList,
  Phone,
  Loader2
} from "lucide-react";

// Import your API service
import { getAllPackages } from "../services/package.service";

const timelineSteps = [
  {
    step: 1,
    title: "Registration",
    desc: "Secure your spot with an initial deposit. Our agents will contact you to confirm details.",
  },
  {
    step: 2,
    title: "Document Submission",
    desc: "Provide passports, photos, and required medical certificates via our secure portal.",
  },
  {
    step: 3,
    title: "Visa Processing",
    desc: "We handle all Ministry of Hajj & Umrah communications and visa processing on your behalf.",
  },
  {
    step: 4,
    title: "Pre-Departure Seminar",
    desc: "Attend our exclusive spiritual and logistical preparation seminar led by expert scholars.",
  },
];

// Helper to map DB data to the card's expected features
const generateFeatures = (pkg) => {
  const features = [];
  if (pkg.makkahHotel?.name) features.push({ icon: BedDouble, label: pkg.makkahHotel.name });
  else features.push({ icon: BedDouble, label: `${pkg.tier || "Premium"} Accommodation` });

  if (pkg.directFlights) features.push({ icon: PlaneTakeoff, label: "Direct Flights" });
  else features.push({ icon: PlaneTakeoff, label: "Premium Airfare" });

  if (pkg.inclusions?.groundTransport) features.push({ icon: Bus, label: "Guided Transport" });
  else features.push({ icon: Car, label: "Private Transfers" });

  return features;
};

// ─── SIDE IMAGE CARD ───
function SideImageCard({ pkg }) {
  const [hovered, setHovered] = useState(false);

  const price = pkg.pricing?.amount || 0;
  const currencySymbol = pkg.pricing?.currency === "GBP" ? "£" : "$";
  const imageUrl = pkg.heroImage?.url || "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&q=80";
  const features = generateFeatures(pkg);
  const badge = pkg.tier === 'luxury' ? "5-Star Elite" : pkg.tier === 'value' ? "Premium Value" : null;
  const isHighlight = pkg.isFeatured || pkg.tier === 'luxury';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex rounded overflow-hidden transition-all duration-300 ${
        isHighlight
          ? "border border-[#C9A84C]/70 shadow-[0_0_28px_rgba(201,168,76,0.15)]"
          : hovered
          ? "border border-[#C9A84C]/40 shadow-[0_0_20px_rgba(201,168,76,0.08)]"
          : "border border-[#1e3a30]"
      } bg-[#0d2820]`}
    >
      {/* Left image */}
      <div className="w-32 sm:w-40 shrink-0 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={pkg.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d2820]/50" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-4 py-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3
            className={`font-bold text-base sm:text-lg leading-tight tracking-tight line-clamp-1 ${
              isHighlight ? "text-[#C9A84C]" : "text-white"
            }`}
          >
            {pkg.title}
          </h3>
          {badge && (
            <span className="shrink-0 bg-[#C9A84C] text-[#0a1f18] text-[0.5rem] font-bold uppercase tracking-widest px-2 py-1 rounded-sm mt-0.5 flex items-center gap-1 whitespace-nowrap">
              <Star size={7} fill="#0a1f18" strokeWidth={0} />
              {badge}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[#8ab5a0] text-[10px] sm:text-xs leading-relaxed mb-3 line-clamp-2">
          {pkg.description}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-1.5 mb-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <li key={i} className="flex items-center gap-2 text-[#c5ddd4] text-[10px] sm:text-xs">
                <Icon size={11} className="text-[#C9A84C] shrink-0" strokeWidth={1.8} />
                {f.label}
              </li>
            );
          })}
        </ul>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <p className="text-[#8ab5a0] text-[0.55rem] uppercase tracking-widest mb-0.5">
              Starting from
            </p>
            <p className="text-[#C9A84C] text-lg sm:text-xl font-bold leading-none">
              {currencySymbol}{price.toLocaleString()}
            </p>
          </div>
          <Link 
            to={`/umrah/${pkg._id}`}
            className="shrink-0 bg-[#C9A84C] hover:bg-[#ddb95a] text-[#0a1f18] text-[0.6rem] font-bold uppercase tracking-widest px-3 sm:px-4 py-2 rounded transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            Select Package
            <ChevronRight size={10} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── BG IMAGE CARD ───
function BgImageCard({ pkg }) {
  const [hovered, setHovered] = useState(false);

  const price = pkg.pricing?.amount || 0;
  const currencySymbol = pkg.pricing?.currency === "GBP" ? "£" : "$";
  const imageUrl = pkg.heroImage?.url || "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&q=80";
  const features = generateFeatures(pkg);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded overflow-hidden transition-all duration-300 ${
        hovered
          ? "border border-[#C9A84C]/40 shadow-[0_0_15px_rgba(201,168,76,0.1)]"
          : "border border-[#1e3a30]"
      }`}
      style={{ minHeight: "180px" }}
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt={pkg.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#051a14]/80" />

      {/* Content over image */}
      <div className="relative z-10 flex flex-col p-4 h-full">
        <h3 className="text-white font-bold text-base sm:text-lg leading-tight tracking-tight mb-1.5">
          {pkg.title}
        </h3>
        <p className="text-[#a8cfc0] text-[10px] sm:text-xs leading-relaxed mb-3 max-w-sm line-clamp-2">
          {pkg.description}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-1.5 mb-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <li key={i} className="flex items-center gap-2 text-[#c5ddd4] text-[10px] sm:text-xs">
                <Icon size={11} className="text-[#C9A84C] shrink-0" strokeWidth={1.8} />
                {f.label}
              </li>
            );
          })}
        </ul>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <p className="text-[#8ab5a0] text-[0.55rem] uppercase tracking-widest mb-0.5">
              Starting from
            </p>
            <p className="text-[#C9A84C] text-lg sm:text-xl font-bold leading-none">
              {currencySymbol}{price.toLocaleString()}
            </p>
          </div>
          <Link 
            to={`/umrah/${pkg._id}`}
            className="shrink-0 bg-[#C9A84C] hover:bg-[#ddb95a] text-[#0a1f18] text-[0.6rem] font-bold uppercase tracking-widest px-3 sm:px-4 py-2 rounded transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            Select Package
            <ChevronRight size={10} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Hajj() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Hajj packages from backend
  useEffect(() => {
    let isMounted = true;

    const fetchHajjPackages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getAllPackages({ 
          journeyType: "Hajj", 
          limit: 100 // Ensure we get all of them for this single page view
        });

        const payload = res?.data;
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.packages)
          ? payload.packages
          : [];

        if (isMounted) setPackages(list);
      } catch (err) {
        console.error("Failed to load Hajj packages:", err);
        if (isMounted) setError("We couldn't load our Hajj packages right now. Please try again shortly.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchHajjPackages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="min-h-screen bg-[#051A14] px-4 sm:px-6 py-20 sm:py-30 font-sans">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold text-xs uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1.5 rounded-full inline-block">
            Sacred Pilgrimage
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            The Journey of a <span className="text-[#D4AF37]">Lifetime</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#8ab5a0] max-w-xl mx-auto leading-relaxed">
            Experience the Hajj with unparalleled serenity, luxury, and meticulous attention
            to detail. Our elite packages are designed to provide absolute peace of mind
            during your spiritual journey.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-[#8ab5a0]">
            <Loader2 className="w-7 h-7 animate-spin text-[#D4AF37]" />
            <p className="text-sm">Preparing Hajj itineraries...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="py-16 text-center">
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        )}

        {/* Main Layout */}
        {!isLoading && !error && (
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">

            {/* Left — Package cards */}
            <div className="flex flex-col gap-3 sm:gap-4 flex-1 min-w-0">
              {packages.length > 0 ? (
                packages.map((pkg, index) => {
                  // Dynamically alternate layout: Every 3rd item is a BgImageCard
                  const useBgLayout = pkg.tier === 'budget' || index % 3 === 2;
                  
                  return useBgLayout ? (
                    <BgImageCard key={pkg._id || index} pkg={pkg} />
                  ) : (
                    <SideImageCard key={pkg._id || index} pkg={pkg} />
                  );
                })
              ) : (
                <div className="text-center py-16 border border-[#1e3a30] rounded bg-[#0d2820]">
                  <p className="text-[#8ab5a0] font-medium">2027 Hajj Packages are currently being finalized.</p>
                  <p className="text-xs text-[#7aa090] mt-1">Please contact our concierge to reserve your spot early.</p>
                </div>
              )}
            </div>

            {/* Right — Preparation Timeline sidebar */}
            <div className="lg:w-55 xl:w-64 shrink-0">
              <div className="sticky top-6 bg-[#0d2820] border border-[#1e3a30] rounded p-5 shadow-xl">

                {/* Sidebar header */}
                <div className="flex items-center gap-2 mb-5">
                  <ClipboardList size={16} className="text-[#C9A84C]" strokeWidth={2} />
                  <h4 className="text-white font-bold text-sm">
                    Preparation Timeline
                  </h4>
                </div>

                {/* Steps */}
                <ol className="relative flex flex-col gap-0">
                  {timelineSteps.map((s, i) => (
                    <li key={s.step} className="relative flex gap-3 pb-5 last:pb-0">
                      {/* Vertical connector line */}
                      {i < timelineSteps.length - 1 && (
                        <div className="absolute left-2.5 top-6 w-px h-[calc(100%-8px)] bg-[#1e3a30]" />
                      )}

                      {/* Step number bubble */}
                      <div className="shrink-0 w-5 h-5 rounded-full bg-[#C9A84C] text-[#0a1f18] text-[0.6rem] font-bold flex items-center justify-center z-10 mt-0.5 shadow-sm">
                        {s.step}
                      </div>

                      {/* Step content */}
                      <div>
                        <p className="text-white text-xs font-bold mb-1">
                          Step {s.step}: {s.title}
                        </p>
                        <p className="text-[#7aa090] text-[10px] sm:text-xs leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                {/* Divider */}
                <div className="border-t border-[#1e3a30] my-5" />

                {/* Help text + CTA */}
                <p className="text-[#7aa090] text-[10px] sm:text-xs leading-relaxed mb-3">
                  Need assistance? Our elite concierge team is available 24/7.
                </p>
                <a 
                  href="tel:+44 7445 274723"
                  className="w-full border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0a1f18] transition-colors duration-200 text-[0.65rem] font-bold uppercase tracking-widest py-2.5 rounded cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Phone size={12} strokeWidth={2} />
                  Contact Concierge
                </a>

              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}