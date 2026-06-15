import React from "react";
import { services } from "../data/home.js";
import { ServiceCard } from "./service-card.jsx";

export function CuratedSpiritualPaths() {
  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Subtle Premium Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50/80 to-transparent pointer-events-none" />

      <div className="px-6 md:px-12 max-w-[90rem] mx-auto relative z-10">
        {/* Premium Centered Header Section */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#D4AF37] font-semibold text-xs uppercase tracking-widest bg-[#D4AF37]/10 px-4 py-1.5 rounded-full inline-block shadow-sm">
            Our Specialities
          </span>
          
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Curated Spiritual <span className="text-[#D4AF37]">Paths</span>
          </h2>
          
          {/* Elegant Divider */}
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mt-6 mb-2 rounded-full" />
          
          <p className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Expertly guided journeys designed for absolute peace of mind. We handle the intricacies of travel, allowing you to focus entirely on your devotion and spiritual awakening.
          </p>
        </div>

        {/* Modern Responsive 5-Column Grid with enhanced spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 xl:gap-8">
          {services?.map((s, index) => (
            <ServiceCard key={s.id || s.title || index} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}