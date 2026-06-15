import { useState } from "react";
import { 
  User, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  MessageSquare, 
  Send,
  MapPin, 
  Building2, 
  Clock,
  ChevronDown
} from "lucide-react";

const JOURNEY_TYPES = [
  "Umrah Package",
  "Hajj Package",
  "Visa Service",
  "Custom Itinerary",
  "General Inquiry"
];

const TRAVELER_COUNTS = [
  "1 Traveler",
  "2 Travelers",
  "3 Travelers",
  "4 Travelers",
  "5+ Travelers",
  "Group (10+)"
];

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    journeyType: "",
    travelers: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <section className="bg-gray-50/50 py-16 md:py-24 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        
        {/* Unified Premium Split Card */}
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* ── Left: The Concierge Form (Dark Theme) ── */}
          <div className="flex-1 bg-[#051A14] p-8 md:p-12 relative overflow-hidden">
            {/* Subtle Gold Glow Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C] opacity-5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 mb-8">
              <span className="inline-block px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-[12px] font-bold uppercase tracking-widest rounded-full mb-4">
                Bespoke Planning
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                Request a Quote
              </h1>
              <p className="text-[13px] text-[#B4BBB9]">
                Allow our concierges to craft your perfect spiritual journey. We will respond within 2 hours.
              </p>
            </div>

            <form className="relative z-10 space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-[12px] font-bold text-[#B4BBB9] uppercase tracking-wide mb-2">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User size={16} className="absolute left-3.5 text-[#C9A84C]" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-lg py-3 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:border-[#C9A84C] transition-colors shadow-inner"
                  />
                </div>
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] font-bold text-[#B4BBB9] uppercase tracking-wide mb-2">
                    Phone / WhatsApp
                  </label>
                  <div className="relative flex items-center">
                    <Phone size={16} className="absolute left-3.5 text-[#C9A84C]" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 234 567 8900"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-lg py-3 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:border-[#C9A84C] transition-colors shadow-inner"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-[12px] font-bold text-[#B4BBB9] uppercase tracking-wide">
                      Email Address
                    </label>
                    <span className="text-[12px] text-gray-500">Optional</span>
                  </div>
                  <div className="relative flex items-center">
                    <Mail size={16} className="absolute left-3.5 text-[#C9A84C]" />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-lg py-3 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:border-[#C9A84C] transition-colors shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* Journey & Travelers Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] font-bold text-[#B4BBB9] uppercase tracking-wide mb-2">
                    Journey Type
                  </label>
                  <div className="relative flex items-center">
                    <Globe size={16} className="absolute left-3.5 text-[#C9A84C] pointer-events-none" />
                    <select
                      name="journeyType"
                      value={form.journeyType}
                      onChange={handleChange}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-lg py-3 pl-10 pr-10 appearance-none focus:outline-none focus:border-[#C9A84C] transition-colors cursor-pointer shadow-inner"
                    >
                      <option value="" disabled hidden className="text-gray-500">Select type...</option>
                      {JOURNEY_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-[#051A14] text-white">{type}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#B4BBB9] uppercase tracking-wide mb-2">
                    Travelers
                  </label>
                  <div className="relative flex items-center">
                    <Users size={16} className="absolute left-3.5 text-[#C9A84C] pointer-events-none" />
                    <select
                      name="travelers"
                      value={form.travelers}
                      onChange={handleChange}
                      className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-lg py-3 pl-10 pr-10 appearance-none focus:outline-none focus:border-[#C9A84C] transition-colors cursor-pointer shadow-inner"
                    >
                      <option value="" disabled hidden className="text-gray-500">Select count...</option>
                      {TRAVELER_COUNTS.map((count) => (
                        <option key={count} value={count} className="bg-[#051A14] text-white">{count}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-[12px] font-bold text-[#B4BBB9] uppercase tracking-wide">
                    Additional Details
                  </label>
                  <span className="text-[12px] text-gray-500">Optional</span>
                </div>
                <div className="relative flex items-start">
                  <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-[#C9A84C]" />
                  <textarea
                    name="message"
                    placeholder="Preferred dates, special requests, hotel preferences..."
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full text-[13px] text-white border border-[#1a3028] bg-[#0a241c] rounded-lg py-3 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:border-[#C9A84C] transition-colors resize-none shadow-inner"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  className="w-full bg-[#C9A84C] hover:bg-white text-[#051A14] transition-colors duration-300 text-[13px] font-extrabold uppercase tracking-widest py-3.5 px-4 rounded-lg cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  Submit Inquiry
                  <Send size={16} className="ml-1" />
                </button>
              </div>
            </form>
          </div>

          {/* ── Right: Headquarters & Map (Light Theme) ── */}
          <div className="w-full lg:w-[420px] bg-white p-8 md:p-12 flex flex-col justify-between shrink-0 border-l border-gray-100">
            
            <div>
              <h3 className="text-[20px] font-bold text-gray-900 tracking-tight mb-8 flex items-center gap-2">
                <Building2 className="text-[#C9A84C]" />
                Our Headquarters
              </h3>

              <div className="space-y-7">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <MapPin size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-1">Visit Us</p>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      13 Station Rd<br />
                      London SE25 5AH<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                {/* Contact Links */}
                <div className="flex items-start gap-4">
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <Phone size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-1">Direct Lines</p>
                    <a href="tel:+441425480400" className="block text-[13px] text-gray-600 hover:text-[#C9A84C] font-medium transition-colors mb-1">
                      +44 1425 480 400
                    </a>
                    <a href="mailto:support@umrahbridge.com" className="block text-[13px] text-gray-600 hover:text-[#C9A84C] transition-colors">
                      support@umrahbridge.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <Clock size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-1">Business Hours</p>
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-0.5">
                      <span className="font-semibold text-gray-800">Mon - Fri:</span> 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      <span className="font-semibold text-gray-800">Sat - Sun:</span> 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Integration */}
            <div className="mt-10 rounded-xl overflow-hidden border border-gray-200 shadow-sm h-[180px] relative">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2489.281077848114!2d-0.07590179999999999!3d51.397889899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876012361b16685%3A0xbfeaee28299f17e7!2s13%20Station%20Rd%2C%20London%20SE25%205AH%2C%20UK!5e0!3m2!1sen!2s!4v1780908350024!5m2!1sen!2s"
                style={{
                  border: 0,
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}