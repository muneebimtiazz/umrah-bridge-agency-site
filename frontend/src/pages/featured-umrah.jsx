import { useState } from "react";
// Import the live data array directly from your source file
import { packages } from "../data/home.js";
import {
  MapPin,
  FileText,
  PhoneCall,
  Plane,
  Map,
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
  Building2,
  UtensilsCrossed,
  SlidersHorizontal
} from "lucide-react";

// Helper structure for dynamic inclusion icon rows
const amenityIcons = {
  visa: { icon: <SlidersHorizontal className="w-4 h-4 text-[#c9a84c]" />, label: "Visa Processing" },
  flights: { icon: <Plane className="w-4 h-4 text-[#c9a84c]" />, label: "Airfare Logistics" },
  hotelAccommodation: { icon: <Building2 className="w-4 h-4 text-[#c9a84c]" />, label: "Hotel Accommodation" },
  airportTransfers: { icon: <MapPin className="w-4 h-4 text-[#c9a84c]" />, label: "Airport Transfers" },
  groundTransport: { icon: <Map className="w-4 h-4 text-[#c9a84c]" />, label: "Ground Transportation" },
  ziyaratTours: { icon: <Landmark className="w-4 h-4 text-[#c9a84c]" />, label: "Guided Ziyarat Tours" },
  meals: { icon: <UtensilsCrossed className="w-4 h-4 text-[#c9a84c]" />, label: "Catering & Meals" }
};

// Sub-Component: 5-Star Row rating generator
function StarRow({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-[#c9a84c] text-[#c9a84c]" strokeWidth={0} />
      ))}
    </div>
  );
}

// Sub-Component: Hotel Showcase Image Slider Loop
function HotelImageSlider({ image, badge, name }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Simulating secondary interior images for the slider track loop safely
  const slides = [image, "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&q=80"];

  return (
    <div className="relative overflow-hidden h-48 w-full group/slider">
      <div 
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((img, idx) => (
          <div key={idx} className="w-full h-full shrink-0">
            <img src={img} alt={`${name} view ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <span className="absolute top-3 left-3 bg-[#051a14] text-[#c9a84c] text-[10px] font-bold px-2.5 py-0.5 rounded-sm border border-[#1a3028] tracking-wider uppercase shadow-md z-10">
        {badge}
      </span>

      <button 
        type="button"
        onClick={(e) => { e.stopPropagation(); setCurrentIndex(v => v === 0 ? slides.length - 1 : v - 1); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded bg-white/80 text-[#051a14] opacity-0 group-hover/slider:opacity-100 transition-opacity z-10 shadow-sm cursor-pointer"
      >
        <ChevronLeft size={16} />
      </button>
      <button 
        type="button"
        onClick={(e) => { e.stopPropagation(); setCurrentIndex(v => v === slides.length - 1 ? 0 : v + 1); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded bg-white/80 text-[#051a14] opacity-0 group-hover/slider:opacity-100 transition-opacity z-10 shadow-sm cursor-pointer"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function PackageDetail() {
  // ─── DATA EXTRACTION ZONE ───
  // Reads directly from your dynamic array asset file. 
  // Grabs the first package object as the primary model schema.
  const activePackage = packages[0] || {};

  // Form handling state parameters
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    journeyType: `${activePackage.journeyType || "Umrah"} Package`,
    travelers: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Fallback defaults if dataset items are structurally empty or missing fields
  const title = activePackage.title || "Premium Spiritual Journey Plan";
  const tier = activePackage.tier || "luxury";
  const desc = activePackage.description || "Thoughtfully curated pilgrimage itinerary constructed for peace of mind.";
  const mNights = activePackage.makkahNights || 4;
  const madNights = activePackage.madinahNights || 4;
  const totalDays = mNights + madNights + 1;
  const baseAmount = activePackage.pricing?.amount || 3500;
  const currencySymbol = activePackage.pricing?.currency === "GBP" ? "£" : "$";
  const shareType = activePackage.pricing?.sharingType || "Double";
  const heroImg = activePackage.heroImage || "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=80";

  // Synthesize timeline blocks dynamically based on data values
  const activeItinerary = [
    { id: 1, title: `Makkah Residency (${mNights} Nights)`, description: "Private luxury transfers from airport directly to your selected sanctuary steps from the Holy Mosque. Mornings dedicated to performing private guided rituals and prayers." },
    { id: 2, title: `Haramain High-Speed Connection`, description: "Boarding the modern high-speed rail corridor system in premium class quarters, cutting transit time down across the scenic desert pathways straight into Madinah." },
    { id: 3, title: `Madinah Sanctuary Stay (${madNights} Nights)`, description: "Residency within serene spaces adjacent to Al-Masjid an-Nabawi. Dedicated time frames to experience rawdah visit slots accompanied by historical local insights." }
  ];

  // Dynamically extract explicitly true array strings from inclusion boolean objects
  const verifiedInclusions = Object.keys(activePackage.inclusions || {})
    .filter((key) => activePackage.inclusions[key] === true && amenityIcons[key])
    .map((key) => ({
      title: amenityIcons[key].label,
      icon: amenityIcons[key].icon,
      desc: `Full premium service compliance verification mapped directly inside this ${tier} tier configuration.`
    }));

  return (
    <div className="bg-gray-50/40 min-h-screen font-sans antialiased text-gray-900">
      
      {/* ─── Hero Section ─── */}
      <div className="bg-[#051a14] px-6 py-12 relative overflow-hidden border-b border-[#1a3028]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-4">
            <span className="bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
              Limited 2027 Seasonal Space Remaining
            </span>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 max-w-2xl">
            {title}
          </h1>
          <p className="text-[#b4bbb9] text-[13px] sm:text-[14px] leading-relaxed max-w-xl mb-8">
            {desc}
          </p>
          <div>
            <p className="text-[#b4bbb9] text-[11px] font-bold uppercase tracking-widest mb-1">Starting from</p>
            <p className="text-[#c9a84c] text-3xl font-black leading-none">
              {currencySymbol}{baseAmount.toLocaleString()} <span className="text-sm font-normal text-[#b4bbb9]">/ person ({shareType} sharing)</span>
            </p>
          </div>
        </div>
      </div>

      {/* ─── Dashboard Tri-Column Workspace Layout ─── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* COLUMN 1 & 2: Dynamic Lodging Cards & Flow Timelines */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Top Showcase Section Area */}
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm space-y-4">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <h2 className="text-[15px] font-bold text-[#051a14] uppercase tracking-wide flex items-center gap-2">
                  <span className="h-4 w-1 bg-[#c9a84c] rounded-full" />
                  Your Accommodation Sanctuaries
                </h2>
                <span className="text-[11px] font-bold bg-[#051a14] text-[#c9a84c] px-2 py-0.5 rounded tracking-wider uppercase">
                  {totalDays} Days / {totalDays - 1} Nights Total
                </span>
              </div>

              {/* Side-by-Side Premium Hotel Showcase Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Makkah Accommodations Card */}
                <div className="border border-gray-100 bg-gray-50/20 rounded overflow-hidden flex flex-col shadow-sm">
                  <HotelImageSlider image={heroImg} badge="Makkah Hotel" name="Premium Hotel Option A" />
                  <div className="p-4 flex flex-col flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[14px] font-bold text-[#051a14]">Makkah Sanctuary Base</h4>
                      <StarRow count={5} />
                    </div>
                    <p className="text-[11px] font-bold text-[#c9a84c] tracking-wider uppercase">{mNights} Nights Allocated Stay</p>
                    <div className="flex items-center gap-2 text-gray-500 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c9a84c]" />
                      <span className="text-[12px]">Direct Walking Distance Corridor Access</span>
                    </div>
                  </div>
                </div>

                {/* Madinah Accommodations Card */}
                <div className="border border-gray-100 bg-gray-50/20 rounded overflow-hidden flex flex-col shadow-sm">
                  <HotelImageSlider image="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80" badge="Madinah Hotel" name="Premium Hotel Option B" />
                  <div className="p-4 flex flex-col flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[14px] font-bold text-[#051a14]">Prophetic City Retreat</h4>
                      <StarRow count={5} />
                    </div>
                    <p className="text-[11px] font-bold text-[#c9a84c] tracking-wider uppercase">{madNights} Nights Allocated Stay</p>
                    <div className="flex items-center gap-2 text-gray-500 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c9a84c]" />
                      <span className="text-[12px]">Facing Central Courtyard Boundary Lanes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Timeline Component Block */}
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

            {/* Inclusions Block Generated Dynamically from Object Flags */}
            <div className="bg-[#051a14] rounded p-5 shadow-md border border-[#1a3028]">
              <h2 className="text-[15px] font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2">
                <span className="h-4 w-1 bg-[#c9a84c] rounded-full" />
                Verified Package Inclusions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {verifiedInclusions.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 group">
                    <div className="p-2 rounded bg-white/5 border border-white/10">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white mb-0.5">{item.title}</p>
                      <p className="text-[12px] text-gray-400 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COLUMN 3: Right Sidebar Configurator & Inquiry Form */}
          <div className="space-y-6">
            
            {/* Live Pricing Tier Breakdown */}
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#c9a84c]" />
              <div className="text-center mb-4">
                <p className="text-[11px] font-bold tracking-widest uppercase text-[#c9a84c] mb-0.5">Live Selected Track Tier</p>
                <h2 className="text-[20px] font-black text-[#051a14] tracking-tight uppercase">{tier} Experience</h2>
              </div>
              <div className="bg-gray-50 rounded p-3 space-y-2.5 border border-gray-100 mb-4">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Sharing Matrix</span>
                  <span className="font-bold text-[#051a14]">{shareType} Occupancy Room</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Flight Option</span>
                  <span className="font-bold text-[#051a14]">{activePackage.directFlights ? "Direct Routes" : "Standard Multi-City"}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3.5 mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Base Cost Estimation</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#051a14]">{currencySymbol}{baseAmount.toLocaleString()}</span>
                    <p className="text-[10px] text-gray-400 mt-0.5">Per Pilgrim Rate</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-gray-400 bg-gray-50/50 py-2 rounded border border-dashed border-gray-200">
                <Lock className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span className="text-[11px] font-semibold text-gray-500">Fully Protected ATOL Bookings</span>
              </div>
            </div>

            {/* Custom Embedded Form Matching image_910dc0.png Style Precisely */}
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

              <form className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative flex items-center">
                    <User size={15} className="absolute left-3 text-[#c9a84c]" />
                    <input type="text" name="fullName" placeholder="Enter your full name" value={form.fullName} onChange={handleChange}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-sm py-2.5 pl-9 pr-3 placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Phone / WhatsApp</label>
                  <div className="relative flex items-center">
                    <PhoneCall size={15} className="absolute left-3 text-[#c9a84c]" />
                    <input type="tel" name="phone" placeholder="+44 7912 345678" value={form.phone} onChange={handleChange}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-sm py-2.5 pl-9 pr-3 placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]" />
                  </div>
                </div>

                {/* Email */}
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

                {/* Journey Dropdown */}
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

                {/* Travelers Dropdown */}
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

                {/* Message */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Special Requests</label>
                    <span className="text-[11px] text-gray-500 font-medium">Optional</span>
                  </div>
                  <div className="relative flex items-start">
                    <MessageSquare size={15} className="absolute left-3 top-3 text-[#c9a84c]" />
                    <textarea name="message" placeholder="Preferred travel windows, custom extension targets, or lodging needs..." value={form.message} onChange={handleChange} rows={2}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-sm py-2.5 pl-9 pr-3 placeholder-gray-600 focus:outline-none focus:border-[#c9a84c] resize-none" />
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <button type="button"
                    className="w-full bg-[#c9a84c] hover:bg-white text-[#051a14] transition-colors duration-300 text-[12px] font-extrabold uppercase tracking-widest py-3.5 px-4 rounded flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Submit Inquiry</span>
                    <Send size={14} />
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