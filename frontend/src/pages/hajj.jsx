import React, { useState } from "react";
import pkgIMG1 from "../assets/images/afif-ramdhasuma-UZEzPMVkbDk-unsplash.jpg"
import pkgIMG2 from "../assets/images/abdurahman-iseini-DNwQ35LdxXQ-unsplash.jpg"
import pkgIMG3 from "../assets/images/yasmine-arfaoui-R6rh5ttDO-4-unsplash.jpg"

import {
  BedDouble,
  PlaneTakeoff,
  Car,
  Bus,
  ClipboardList,
  Phone,
  ChevronRight,
  Star,
} from "lucide-react";

const packages = [
  {
    id: 1,
    badge: "5-Star Elite",
    title: "Premium Hajj",
    description:
      "The ultimate VIP experience. Stay in opulent 5-star hotels directly facing the Haram, with private luxury transport and dedicated scholarly guidance throughout your rites.",
    features: [
      { icon: BedDouble, label: "5-Star VIP Accommodation" },
      { icon: PlaneTakeoff, label: "First-Class Direct Flights" },
      { icon: Car, label: "Private SUV Transport" },
    ],
    price: "$14,500",
    image: pkgIMG1,
    highlight: true,
    layout: "side-image",
  },
  {
    id: 2,
    badge: null,
    title: "Value Hajj",
    description:
      "A perfectly balanced itinerary offering exceptional comfort and convenience. Includes premium 4-star accommodations and guided group transport.",
    features: [
      { icon: BedDouble, label: "Premium 4-Star Hotels" },
      { icon: PlaneTakeoff, label: "Premium Economy Flights" },
      { icon: Bus, label: "Guided Group Transport" },
    ],
    price: "$9,800",
    image: pkgIMG2,
    highlight: false,
    layout: "side-image",
  },
  {
    id: 3,
    badge: null,
    title: "Essential Hajj",
    description:
      "A streamlined, accessible option that never compromises on safety, support, or spiritual fulfilment. Clean, comfortable accommodations slightly further from the Haram.",
    features: [
      { icon: BedDouble, label: "Comfortable 3-Star Hotels" },
      { icon: PlaneTakeoff, label: "Standard Flights" },
      { icon: Bus, label: "Organised Coach Transport" },
    ],
    price: "$7,200",
    image: pkgIMG3,
    highlight: false,
    layout: "bg-image",
  },
];

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

function SideImageCard({ pkg }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex rounded overflow-hidden transition-all duration-300 ${
        pkg.highlight
          ? "border border-[#C9A84C]/70 shadow-[0_0_28px_rgba(201,168,76,0.15)]"
          : hovered
          ? "border border-[#C9A84C]/40 shadow-[0_0_20px_rgba(201,168,76,0.08)]"
          : "border border-[#1e3a30]"
      } bg-[#0d2820]`}
    >
      {/* Left image */}
      <div className="w-32.5 sm:w-37.5 shrink-0 relative overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0d2820]/50" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-4 py-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3
            className={`font-bold text-base sm:text-lg leading-tight tracking-tight ${
              pkg.highlight ? "text-[#C9A84C]" : "text-white"
            }`}
          >
            {pkg.title}
          </h3>
          {pkg.badge && (
            <span className="shrink-0 bg-[#C9A84C] text-[#0a1f18] text-[0.5rem] font-bold uppercase tracking-widest px-2 py-1 rounded-sm mt-0.5 flex items-center gap-1 whitespace-nowrap">
              <Star size={7} fill="#0a1f18" strokeWidth={0} />
              {pkg.badge}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[#8ab5a0] text-[10px] sm:text-xs leading-relaxed mb-3">
          {pkg.description}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-1.5 mb-3">
          {pkg.features.map((f, i) => {
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
              {pkg.price}
            </p>
          </div>
          <button className="shrink-0 bg-[#C9A84C] hover:bg-[#ddb95a] text-[#0a1f18] text-[0.6rem] font-bold uppercase tracking-widest px-3 sm:px-4 py-2 rounded transition-colors duration-200 flex items-center gap-1.5 cursor-pointer">
            Select Package
            <ChevronRight size={10} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function BgImageCard({ pkg }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded overflow-hidden transition-all duration-300 ${
        hovered
          ? "border border-[#C9A84C]/40"
          : "border border-[#1e3a30]"
      }`}
      style={{ minHeight: "180px" }}
    >
      {/* Background image */}
      <img
        src={pkg.image}
        alt={pkg.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#051a14]/75" />

      {/* Content over image */}
      <div className="relative z-10 flex flex-col p-4">
        <h3 className="text-white font-bold text-base sm:text-lg leading-tight tracking-tight mb-1.5">
          {pkg.title}
        </h3>
        <p className="text-[#a8cfc0] text-[10px] sm:text-xs leading-relaxed mb-3 max-w-sm">
          {pkg.description}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-1.5 mb-3">
          {pkg.features.map((f, i) => {
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
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-[#8ab5a0] text-[0.55rem] uppercase tracking-widest mb-0.5">
              Starting from
            </p>
            <p className="text-[#C9A84C] text-lg sm:text-xl font-bold leading-none">
              {pkg.price}
            </p>
          </div>
          <button className="shrink-0 bg-[#C9A84C] hover:bg-[#ddb95a] text-[#0a1f18] text-[0.6rem] font-bold uppercase tracking-widest px-3 sm:px-4 py-2 rounded transition-colors duration-200 flex items-center gap-1.5 cursor-pointer">
            Select Package
            <ChevronRight size={10} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Hajj() {
  return (
    <section className="min-h-screen bg-[#051A14] px-4 sm:px-6 py-20 sm:py-30">
      <div className="max-w-5xl mx-auto">

<div className="text-center mb-16">
  {/* Modern pill badge matching your new standard on dark backgrounds */}
  <span className="text-[#D4AF37] font-semibold text-xs uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1.5 rounded-full inline-block">
    Sacred Pilgrimage
  </span>
  
  {/* Main heading following the premium typography, scaling, and gold color accent */}
  <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
    The Journey of a <span className="text-[#D4AF37]">Lifetime</span>
  </h2>
  
  {/* Subheading matching the layout constraints and modern text sizing */}
  <p className="mt-4 text-sm md:text-base text-[#8ab5a0] max-w-xl mx-auto leading-relaxed">
    Experience the Hajj with unparalleled serenity, luxury, and meticulous attention
    to detail. Our elite packages are designed to provide absolute peace of mind
    during your spiritual journey.
  </p>
</div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">

          {/* Left — Package cards */}
          <div className="flex flex-col gap-3 sm:gap-4 flex-1 min-w-0">
            {packages.map((pkg) =>
              pkg.layout === "bg-image" ? (
                <BgImageCard key={pkg.id} pkg={pkg} />
              ) : (
                <SideImageCard key={pkg.id} pkg={pkg} />
              )
            )}
          </div>

          {/* Right — Preparation Timeline sidebar */}
          <div className="lg:w-55 xl:w-60 shrink-0">
            <div className="sticky top-6 bg-[#0d2820] border border-[#1e3a30] rounded p-4">

              {/* Sidebar header */}
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList size={15} className="text-[#C9A84C]" strokeWidth={1.8} />
                <h4 className="text-white font-bold text-xs sm:text-sm">
                  Preparation Timeline
                </h4>
              </div>

              {/* Steps */}
              <ol className="relative flex flex-col gap-0">
                {timelineSteps.map((s, i) => (
                  <li key={s.step} className="relative flex gap-2.5 pb-4 last:pb-0">
                    {/* Vertical connector line */}
                    {i < timelineSteps.length - 1 && (
                      <div className="absolute left-2.75 top-6 w-px h-[calc(100%-6px)] bg-[#1e3a30]" />
                    )}

                    {/* Step number bubble */}
                    <div className="shrink-0 w-5.5 h-5.5 rounded-full bg-[#C9A84C] text-[#0a1f18] text-[0.6rem] font-bold flex items-center justify-center z-10 mt-0.5">
                      {s.step}
                    </div>

                    {/* Step content */}
                    <div>
                      <p className="text-white text-[10px] sm:text-xs font-semibold mb-0.5">
                        Step {s.step}: {s.title}
                      </p>
                      <p className="text-[#7aa090] text-[9px] sm:text-[10px] leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Divider */}
              <div className="border-t border-[#1e3a30] my-3.5" />

              {/* Help text + CTA */}
              <p className="text-[#7aa090] text-[9px] sm:text-[10px] leading-relaxed mb-3">
                Need assistance? Our elite concierge team is available 24/7.
              </p>
              <button className="w-full border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0a1f18] transition-colors duration-200 text-[0.6rem] font-bold uppercase tracking-widest py-2 rounded cursor-pointer flex items-center justify-center gap-1.5">
                <Phone size={10} strokeWidth={2} />
                Contact Concierge
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}