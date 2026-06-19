import React, { useState } from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  MessageCircle,
  FileText,
  ShieldCheck,
  Send
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Contact Umrah Bridge",
    description: "Call +44 7445 274723 or WhatsApp +44 7445 274723 with your travel dates, travelers, and nationality.",
  },
  {
    number: "02",
    title: "Gather Documents",
    description: "Collect passport, photos, vaccination certificate, flight ticket, and any additional documents.",
  },
  {
    number: "03",
    title: "Book via Nusuk Masar",
    description: "Confirm hotel through Saudi's official Nusuk Masar platform before visa submission.",
  },
  {
    number: "04",
    title: "Submit & Pay",
    description: "Send us your documents. We review, submit, and process payment securely.",
  },
  {
    number: "05",
    title: "Government Approval",
    description: "We liaise directly with Saudi authorities for expedited processing.",
  },
  {
    number: "06",
    title: "Digital Delivery",
    description: "Receive your approved visa via email in as little as 24 hours.",
  },
];

const coreRequirements = [
  {
    title: "Valid Passport",
    description: "6+ months validity from entry date. At least 2 blank pages. Must not be damaged or expired.",
  },
  {
    title: "Passport-Size Photos",
    description: "2 recent 2×2\" photos. White background, full face, no glasses or head coverings (except religious).",
  },
  {
    title: "Round-Trip Flight Ticket",
    description: "Confirmed reservation showing arrival and departure from Saudi Arabia.",
  },
  {
    title: "Hotel Accommodation",
    description: "Confirmed booking in Makkah or Madinah via the official Nusuk Masar platform.",
  },
  {
    title: "Meningitis Vaccine Certificate",
    description: "Meningococcal ACYW135 vaccine. Administered 10+ days before travel, valid 3 years. COVID-19 also strongly recommended.",
  },
  {
    title: "Green Card (non-US citizens)",
    description: "Copy of Green Card or valid US visa alongside your home-country passport.",
  },
];

const additionalRequirements = [
  {
    type: "Wife traveling with husband",
    docs: "Official Marriage Certificate (translated to Arabic if needed).",
  },
  {
    type: "Children under 18",
    docs: "Official Birth Certificate showing parentage (translated to Arabic if necessary).",
  },
  {
    type: "Women without mahram (group travel)",
    docs: "Notarized No-Objection Letter from husband or closest male guardian authorizing travel for religious purposes.",
  },
  {
    type: "New Muslim (non-Islamic name)",
    docs: "Certificate or letter from an Islamic Center confirming conversion to Islam.",
  },
];

const visaComparison = [
  { feature: "Who Issues It", umrah: "Authorized agency (e.g., Umrah Bridge)", evisa: "Saudi MOFA portal / online" },
  { feature: "Validity", umrah: "30 days", evisa: "1 year (multiple entry)" },
  { feature: "Stay Per Visit", umrah: "Up to 30 days", evisa: "Up to 90 days per visit" },
  { feature: "Travel Within KSA", umrah: "Makkah & Madinah only", evisa: "All of Saudi Arabia" },
  { feature: "Umrah Permitted?", umrah: "Yes", evisa: "Yes (since Sept 2019)" },
  { feature: "Approximate Cost", umrah: "$100–$200 (often in package)", evisa: "~£95–£119 GBP" },
  { feature: "Best For", umrah: "Group pilgrims, package travelers", evisa: "Independent travelers, families" },
];

const faqs = [
  {
    q: "Can US Muslims apply for an Umrah Visa online?",
    a: "Yes. US Muslims can apply through an authorized agency like Umrah Bridge, or apply for the Saudi Tourist eVisa directly at the official Saudi government portal. Umrah Bridge handles the entire process and can get your visa approved in as little as 24 hours.",
  },
  {
    q: "How long does it take to get an Umrah Visa from the USA?",
    a: "With Umrah Bridge's expedited service: as little as 24 hours. Standard agency processing: 5–10 business days. During Ramadan and Dhul Hijjah peak seasons, allow 2–3 weeks. Apply at least 3–4 weeks before your travel date.",
  },
  {
    q: "Can women perform Umrah from the USA without a mahram?",
    a: "Yes. Women of all ages can now perform Umrah without a mahram when traveling with an authorized group. With a Saudi Tourist eVisa, women can travel completely independently. Umrah Bridge will advise on the correct visa type.",
  },
  {
    q: "What is the difference between an Umrah Visa and the Saudi Tourist eVisa?",
    a: "An Umrah Visa is valid for 30 days, single-entry, restricted to Makkah and Madinah. The Saudi Tourist eVisa is valid for 1 year with multiple entries and allows 90 days per visit across all of Saudi Arabia, including Makkah and Madinah for Umrah.",
  },
  {
    q: "What vaccinations are required?",
    a: "Meningococcal Meningitis vaccination (ACYW135) is mandatory — administered at least 10 days before travel, valid 3 years. COVID-19 vaccination is strongly recommended. Influenza and polio may also be required based on your health history.",
  },
  {
    q: "How much does an Umrah Visa cost from the USA?",
    a: "The Saudi Tourist eVisa costs approximately $120–$150 USD. A traditional Umrah Visa through an agency is £80–£160, often included within a full package. Call Umrah Bridge at 332-334-0324 for a personalized quote.",
  },
];

const importantRules = [
  "Nusuk Masar Platform (New — June 2027): All pilgrims must book accommodation through the official Nusuk Masar platform before submitting a visa application.",
  "Hajj Season Restriction: Umrah is not permitted during official Hajj season. Entry to Makkah is restricted approx. 1 month before Hajj begins.",
  "Women Without Mahram: Women of all ages can now perform Umrah without a male guardian when traveling with an authorized group, or independently on a Tourist eVisa.",
  "Health Requirements: Meningitis vaccination (ACYW135) is mandatory. COVID-19 vaccination is strongly recommended.",
  "Overstay Penalties: Overstaying your visa carries heavy fines, possible detention, deportation, or a ban from future Saudi Arabia entry.",
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3.5 text-left group"
      >
        <span className="text-[13px] font-bold text-gray-900 group-hover:text-[#C9A84C] transition-colors pr-4">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#C9A84C] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#C9A84C] shrink-0 transition-colors" />
        )}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-[12px] text-gray-600 leading-relaxed pr-6">{a}</p>
      </div>
    </div>
  );
}

export default function Visa() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passportNumber: "",
    nationality: "",
    visaType: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-12 md:px-10 lg:px-16 font-sans">

      <div className="text-center mb-16 max-w-2xl mx-auto">
        {/* Modern pill badge */}
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1.5 rounded-full mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">
            ARC & IATA Certified • Since 2025
          </span>
        </div>
        
        {/* Main H1 heading corrected to target audience described in text */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#051A14] sm:text-4xl md:text-5xl lg:text-6xl">
          Umrah Visa from <span className="text-[#D4AF37]">the US</span>
        </h1>
        
        {/* Subheading matching the layout constraints and modern text sizing */}
        <p className="mt-4 text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
          Umrah Bridge handles your entire Umrah Visa application — from documentation to approval 
          in as little as 24 hours. Serving US citizens, Green Card holders, and legal residents 
          of all nationalities.
        </p>

        {/* Refined CTAs with micro-interactions matching the premium architecture */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a 
            href="tel:3323340324" 
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:border-[#D4AF37]/40 hover:shadow-[0_4px_20px_rgba(212,175,55,0.08)] transition-all duration-300 group"
          >
            <Phone className="w-4 h-4 text-[#051A14] group-hover:text-[#D4AF37] transition-colors" />
            <span className="text-xs font-bold text-[#051A14] group-hover:text-[#D4AF37] transition-colors tracking-wide">+44 7445 274723</span>
          </a>
          
          <a 
            href="https://wa.me/447445274723" 
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:border-[#25D366]/40 hover:shadow-[0_4px_20px_rgba(37,211,102,0.08)] transition-all duration-300 group"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span className="text-xs font-bold text-[#051A14] group-hover:text-[#25D366] transition-colors tracking-wide">WhatsApp Us</span>
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">

        {/* ── Visa Type Comparison ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[#C9A84C]" />
            <h2 className="text-[16px] font-bold text-[#051A14]">
              Types of Umrah Visa for US Muslims
            </h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-[#051A14]">
                    <th className="px-5 py-3 text-[12px] font-bold text-gray-300 uppercase tracking-wider w-1/3">Feature</th>
                    <th className="px-5 py-3 text-[12px] font-bold text-white uppercase tracking-wider w-1/3">Traditional Umrah Visa</th>
                    <th className="px-5 py-3 text-[12px] font-bold text-[#C9A84C] uppercase tracking-wider w-1/3">Saudi Tourist eVisa</th>
                  </tr>
                </thead>
                <tbody>
                  {visaComparison.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                      <td className="px-5 py-3 text-[12px] font-bold text-[#051A14]">{row.feature}</td>
                      <td className="px-5 py-3 text-[12px] text-gray-600 font-medium">{row.umrah}</td>
                      <td className="px-5 py-3 text-[12px] text-gray-600 font-medium">{row.evisa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Steps & Processing Times Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Steps */}
          <div className="lg:col-span-2">
            <h2 className="text-[16px] font-bold text-[#051A14] mb-4">How to Apply — Step by Step</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step) => (
                <div key={step.number} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                  {/* Subtle background number */}
                  <span className="absolute -right-2 -bottom-4 text-6xl font-black text-gray-50 group-hover:text-[#C9A84C]/5 transition-colors z-0">
                    {step.number}
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-[13px] font-bold text-[#051A14] mb-1.5 flex items-center gap-2">
                      <span className="text-[#C9A84C]">{step.number}.</span> {step.title}
                    </h3>
                    <p className="text-[12px] text-gray-500 leading-relaxed pr-2">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Processing Times & Alerts */}
          <div className="space-y-4">
            <h2 className="text-[16px] font-bold text-[#051A14] mb-4">Processing Times</h2>
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex flex-col gap-3">
              {[
                { label: "Expedited", time: "24 Hours", highlight: true },
                { label: "Tourist eVisa (Online)", time: "24–72 Hours", highlight: false },
                { label: "Standard Agency", time: "5–10 Days", highlight: false },
                { label: "Peak Seasons", time: "2–3 Weeks", highlight: false },
              ].map((item) => (
                <div key={item.label} className={`flex items-center justify-between px-3 py-2.5 rounded-md ${item.highlight ? "bg-[#C9A84C]/10 border border-[#C9A84C]/30" : "bg-gray-50 border border-gray-100"}`}>
                  <span className={`text-[12px] font-bold ${item.highlight ? "text-[#051A14]" : "text-gray-600"}`}>{item.label}</span>
                  <span className={`text-[12px] font-extrabold ${item.highlight ? "text-[#C9A84C]" : "text-gray-800"}`}>{item.time}</span>
                </div>
              ))}
            </div>

            {/* Alert Cards */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-[12px] text-amber-800 leading-relaxed">
                <strong className="text-amber-900 block mb-0.5">2027 Hajj Restriction</strong>
                Umrah is restricted approx. 1 month before Hajj begins. Check current MOFA announcements before booking flights.
              </p>
            </div>
          </div>
        </div>

        {/* ── Requirements + Form ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start pt-4">

          {/* Requirements List */}
          <div className="flex-1 w-full space-y-8">
            <div>
              <h2 className="text-[16px] font-bold text-[#051A14] mb-4">Core Document Requirements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coreRequirements.map((req) => (
                  <div key={req.title} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-bold text-[#051A14] mb-1">{req.title}</p>
                      <p className="text-[12px] text-gray-500 leading-relaxed">{req.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[16px] font-bold text-[#051A14] mb-4">Conditional Documents</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {additionalRequirements.map((item) => (
                  <div key={item.type} className="bg-white rounded-xl border-l-2 border-l-[#C9A84C] border-y border-r border-gray-100 p-4 shadow-sm">
                    <p className="text-[12px] font-bold text-[#051A14] uppercase tracking-wide mb-1">{item.type}</p>
                    <p className="text-[12px] text-gray-500 leading-relaxed">{item.docs}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 w-full lg:w-[380px] shrink-0 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C9A84C]" />
            <h2 className="text-[18px] font-bold text-[#051A14] mb-1">Start Application</h2>
            <p className="text-[12px] text-gray-500 mb-5 leading-relaxed">Submit your details. Our concierges will guide you on the best visa option.</p>
            
            <form className="space-y-3.5">
              <div className="flex gap-3">
                <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange}
                  className="w-1/2 text-[12px] border border-gray-200 rounded-lg px-3 py-2.5 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] bg-gray-50/50 transition-colors" />
                <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange}
                  className="w-1/2 text-[12px] border border-gray-200 rounded-lg px-3 py-2.5 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] bg-gray-50/50 transition-colors" />
              </div>
              <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange}
                className="w-full text-[12px] border border-gray-200 rounded-lg px-3 py-2.5 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] bg-gray-50/50 transition-colors" />
              <input type="text" name="passportNumber" placeholder="Passport Number" value={form.passportNumber} onChange={handleChange}
                className="w-full text-[12px] border border-gray-200 rounded-lg px-3 py-2.5 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] bg-gray-50/50 transition-colors" />
              <input type="text" name="nationality" placeholder="Nationality" value={form.nationality} onChange={handleChange}
                className="w-full text-[12px] border border-gray-200 rounded-lg px-3 py-2.5 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] bg-gray-50/50 transition-colors" />
              
              <div className="relative">
                <select name="visaType" value={form.visaType} onChange={handleChange}
                  className="w-full text-[12px] border border-gray-200 rounded-lg px-3 py-2.5 text-gray-700 appearance-none focus:outline-none focus:border-[#C9A84C] bg-gray-50/50 transition-colors cursor-pointer">
                  <option value="" disabled hidden>Select Visa Type...</option>
                  <option value="umrah">Traditional Umrah Visa</option>
                  <option value="evisa">Saudi Tourist eVisa</option>
                  <option value="unsure">I'm not sure</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>

              <div className="pt-2">
                <button type="button" className="w-full bg-[#051A14] hover:bg-[#C9A84C] text-white hover:text-[#051A14] transition-colors duration-300 text-[12px] font-bold uppercase tracking-widest py-3.5 px-4 rounded-lg cursor-pointer flex items-center justify-center gap-2 shadow-sm">
                  Begin Processing <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Why Choose Us (Dark Section) ── */}
        <div className="bg-[#051A14] rounded-2xl shadow-xl p-6 sm:p-10 relative overflow-hidden">
          {/* Aesthetic background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C] opacity-5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-[20px] sm:text-2xl font-bold text-white mb-2">Why Choose Umrah Bridge?</h2>
              <p className="text-[12px] text-[#C9A84C] font-bold uppercase tracking-widest">Rated ⭐⭐⭐⭐⭐ by 75+ US pilgrims</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Licensed & Accredited", desc: "Fully ARC-certified and IATA-accredited. Your application is handled by recognized professionals." },
                { title: "17+ Years of Service", desc: "Helping US Muslims perform Umrah and Hajj since 2007. Deep experience with all visa situations." },
                { title: "Full-Service Convenience", desc: "We handle Nusuk Masar hotel booking, visa application, flights, transport, and accommodation." },
                { title: "All Nationalities Served", desc: "US citizens, Green Card holders, student & H-1B visa holders — all nationalities, all cases." },
                { title: "Fast & Transparent", desc: "Expedited visa in 24 hours. We track your application and keep you informed throughout." },
                { title: "Dedicated Support", desc: "Available by phone and WhatsApp at every step of your journey to the Holy Cities." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="bg-[#C9A84C]/20 p-1.5 rounded-md shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white mb-1">{item.title}</p>
                    <p className="text-[12px] text-[#B4BBB9] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ & Important Rules ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-[16px] font-bold text-[#051A14] mb-4">Frequently Asked Questions</h2>
            <div className="flex flex-col">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>

          {/* Rules */}
          <div>
            <h2 className="text-[16px] font-bold text-[#051A14] mb-4">Important 2027 Rules</h2>
            <div className="flex flex-col gap-3">
              {importantRules.map((rule, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-[#C9A84C]/50 transition-colors">
                  <Info className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                  <p className="text-[12px] text-gray-600 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}