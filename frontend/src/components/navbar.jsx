import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronDown,
  ChevronRight,
  Menu, 
  X, 
  User, 
  Phone, 
  Mail, 
  Globe, 
  Send 
} from "lucide-react";

// --- QUOTE MODAL COMPONENT ---
function QuoteModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    journeyType: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="bg-white w-full max-w-md rounded shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50 rounded-t">
          <div>
            <h2 className="text-[18px] font-bold text-[#051A14] leading-tight">Request a Quote</h2>
            <p className="text-[12px] text-gray-500 mt-1">We'll get back to you within 2 hours.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-[#051A14] bg-white border border-gray-200 hover:border-gray-300 rounded p-1.5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-5">
            <div>
              <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1.5">Full Name</label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-3 text-gray-400" />
                <input type="text" name="fullName" placeholder="John Doe" value={form.fullName} onChange={handleChange}
                  className="w-full text-[13px] border border-gray-200 rounded py-2.5 pl-9 pr-3 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-white transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1.5">Phone</label>
                <div className="relative flex items-center">
                  <Phone size={16} className="absolute left-3 text-gray-400" />
                  <input type="tel" name="phone" placeholder="+1 234 567 8900" value={form.phone} onChange={handleChange}
                    className="w-full text-[13px] border border-gray-200 rounded py-2.5 pl-9 pr-3 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-white transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1.5">Email</label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-3 text-gray-400" />
                  <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange}
                    className="w-full text-[13px] border border-gray-200 rounded py-2.5 pl-9 pr-3 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-white transition-colors" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1.5">Journey Type</label>
              <div className="relative flex items-center">
                <Globe size={16} className="absolute left-3 text-gray-400 pointer-events-none" />
                <select name="journeyType" value={form.journeyType} onChange={handleChange}
                  className="w-full text-[13px] border border-gray-200 rounded py-2.5 pl-9 pr-8 appearance-none focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-white text-gray-700 cursor-pointer">
                  <option value="" disabled hidden>Select journey type...</option>
                  <option value="umrah">Umrah Package</option>
                  <option value="hajj">Hajj Package</option>
                  <option value="visa">Visa Only</option>
                  <option value="custom">Custom Itinerary</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="pt-3">
              <button type="button" onClick={onClose}
                className="w-full bg-[#051A14] hover:bg-[#D4AF37] text-white hover:text-[#051A14] transition-colors duration-300 text-[13px] font-bold uppercase tracking-widest py-3.5 px-4 rounded flex items-center justify-center gap-2 shadow-sm">
                Request Quote <Send size={15} />
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

// --- Navigation Links with State ---
const umrahLinks = [
  { label: "All Umrah Packages", path: "/umrah", state: { tab: "ALL" } },
  { label: "Budget Umrah Packages", path: "/umrah", state: { tab: "BUDGET" } },
  { label: "Value Umrah Packages", path: "/umrah", state: { tab: "VALUE" } },
  { label: "Luxury Umrah Packages", path: "/umrah", state: { tab: "LUXURY" } },
  { label: "Ramadan Umrah Packages", path: "/umrah", state: { tab: "RAMADAN" } },
  { label: "December Umrah Packages", path: "/umrah", state: { tab: "DECEMBER" } },
  { label: "Featured Packages", path: "/featured-umrah-packages" },
];

const navLinks = [
  { label: "Umrah", path: "/umrah" },
  { label: "Hajj", path: "/hajj" },
  { label: "Visas", path: "/visa" },
  { label: "Contact Us", path: "/contact-us" },
];

export default function NavBar() {
  const [umrahOpen, setUmrahOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileUmrahOpen, setMobileUmrahOpen] = useState(false);
  
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();

  const darkRoutes = [
    "/visa",
    "/featured-umrah-packages",
    "/contact-us",
    "/umrah",
  ];

  const isDarkNav = darkRoutes.includes(location.pathname);

  const navTextClass = isDarkNav
    ? "text-black hover:text-[#D4AF37]"
    : "text-white hover:text-[#D4AF37]";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setUmrahOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileUmrahOpen(false);
    setUmrahOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="w-full">
        <div className="flex h-20 items-center justify-between px-6 w-full max-w-7xl mx-auto">
          
          <Link
            to="/"
            className={`text-sm font-extrabold uppercase tracking-[0.2em] shrink-0 ${
              isDarkNav ? "text-[#051A14]" : "text-white"
            }`}
          >
            LOGO
          </Link>

          <div className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map((link) =>
              link.label === "Umrah" ? (
                <div
                  key={link.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setUmrahOpen(true)}
                  onMouseLeave={() => setUmrahOpen(false)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-[13px] font-bold transition-colors py-2 ${navTextClass}`}
                  >
                    <span>Umrah</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        umrahOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Desktop Dropdown - Extreme Luxury Aesthetic */}
                  <div
                    className={`absolute left-0 top-full mt-2 w-72 bg-white rounded shadow-2xl border border-gray-100 transition-all duration-300 origin-top-left z-50 overflow-hidden ${
                      umrahOpen
                        ? "opacity-100 scale-100 translate-y-0 visible"
                        : "opacity-0 scale-95 -translate-y-2 invisible"
                    }`}
                  >
                    {/* Top Gold Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37]" />
                    
                    <div className="py-2 mt-1">
                      {umrahLinks.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          state={item.state}
                          // This group handles the elegant hover transitions: White -> Deep Green, Black -> White
                          className="group flex items-center justify-between px-5 py-3.5 text-[13px] font-bold text-black transition-all duration-300 hover:bg-[#051A14] hover:text-white"
                        >
                          {/* Text slides slightly right on hover for an elegant feel */}
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            {item.label}
                          </span>
                          
                          {/* Chevron slides in and turns Gold */}
                          <ChevronRight 
                            size={16} 
                            className="text-[#D4AF37] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" 
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-[13px] font-bold transition-colors ${
                    location.pathname === link.path
                      ? "text-[#D4AF37]"
                      : navTextClass
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="hidden lg:flex flex-col text-right">
              <span className={`text-[12px] font-medium ${isDarkNav ? 'text-gray-500' : 'text-gray-300'}`}>
                Call us from 9am
              </span>
              <a href="tel:01425480400" className={`font-bold text-[14px] hover:text-[#D4AF37] transition-colors ${isDarkNav ? 'text-[#051A14]' : 'text-white'}`}>
                01425 480 400
              </a>
            </div>

            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="max-w-5xl border border-[#D4AF37] bg-[#D4AF37] text-[#051A14] hover:bg-[#051A14] hover:border-[#051A14] hover:text-[#D4AF37] transition-colors duration-300 text-[12px] font-bold uppercase tracking-widest py-2.5 px-4 rounded cursor-pointer flex items-center justify-center gap-1.5"
            >
              REQUEST A QUOTE
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`md:hidden shrink-0 ${
              isDarkNav ? "text-[#051A14]" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden bg-[#051A14] transition-all duration-300 md:hidden absolute left-0 right-0 z-40 shadow-xl ${
            mobileOpen
              ? "max-h-screen opacity-100 border-t border-[#D4AF37]/20"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-5">
            <div className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setMobileUmrahOpen((prev) => !prev)}
                className="flex w-full items-center justify-between py-4 text-left text-[13px] font-bold text-white hover:text-[#D4AF37]"
              >
                <span>Umrah</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    mobileUmrahOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileUmrahOpen ? "max-h-[400px] pb-4" : "max-h-0"
                }`}
              >
                <div className="pl-4 ml-2 border-l border-[#D4AF37]/30 space-y-1 mt-1">
                  {umrahLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      state={item.state}
                      className="flex items-center gap-2.5 py-2.5 text-[12px] font-bold text-white hover:text-[#D4AF37] transition-colors"
                    >
                      <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks
              .filter((item) => item.label !== "Umrah")
              .map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`block border-b border-white/10 py-4 text-[13px] font-bold ${
                    location.pathname === link.path
                      ? "text-[#D4AF37]"
                      : "text-white hover:text-[#D4AF37]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            <button
              onClick={() => {
                setMobileOpen(false);
                setIsQuoteModalOpen(true);
              }}
              className="mt-6 flex w-full items-center justify-center rounded bg-[#D4AF37] px-5 py-3.5 text-[13px] font-bold uppercase tracking-widest text-[#051A14] transition-colors hover:bg-white"
            >
              REQUEST A QUOTE
            </button>
          </div>
        </div>
      </div>

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </>
  );
}