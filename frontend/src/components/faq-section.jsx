import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "../data/home.js";

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-[#051A14] px-6 py-10 md:px-12 relative overflow-hidden">
      {/* Decorative subtle background glows for a modern dark-mode depth */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Modern Header Layout */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold text-xs uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1.5 rounded-full">
            Have Questions?
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Frequently Asked <span className="text-[#D4AF37]">Questions</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-emerald-100/60 max-w-lg mx-auto">
            Can't find what you're looking for? Reach out to our dedicated support team anytime.
          </p>
        </div>

        {/* FAQ Accordion Wrapper */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`transition-all duration-300 rounded-2xl border backdrop-blur-sm ${
                  isOpen
                    ? "border-[#D4AF37]/30 bg-white/[0.03] shadow-[0_10px_30px_-10px_rgba(212,175,55,0.1)]"
                    : "border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.12]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left group"
                >
                  <span className={`pr-6 text-base font-medium transition-colors duration-300 md:text-lg ${
                    isOpen ? "text-[#D4AF37]" : "text-white/90 group-hover:text-white"
                  }`}>
                    {faq.q}
                  </span>

                  {/* Modern single-icon rotating toggle */}
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen 
                      ? "border-[#D4AF37] bg-[#D4AF37] text-[#051A14] rotate-45" 
                      : "border-white/20 text-white/60 group-hover:border-white/40 group-hover:text-white"
                  }`}>
                    <Plus size={16} strokeWidth={2.5} />
                  </div>
                </button>

                {/* CSS Grid Smooth Height Transition */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-sm md:text-base leading-relaxed text-emerald-100/70 border-t border-white/[0.04] pt-4 mt-1">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}