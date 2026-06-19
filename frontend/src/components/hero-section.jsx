import heroBg from "../assets/images/Gemini_Generated_Image_vhejavhejavhejav.png";
import NavBar from "./navbar";
import { NavLink } from "react-router-dom";

// import { Instagram, Facebook, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import {  ArrowUpRight } from "lucide-react";

const facilities = [
  "Tour guide",
  "Travel Packages",
  "Accommodation",
  "Transportation",
  "Food",
  "Insurance",
  "Online Ordering",
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-140 h-screen max-h-200 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
style={{
  backgroundImage: `url(${heroBg})`,
}}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-10 py-5 md:py-6">

        {/* Top Row */}
<div className="mt-15 flex justify-end w-full">
  <div className="flex items-start gap-4">
    {/* Info Card */}
    <div className="hidden md:block bg-white/20 backdrop-blur-md border border-white/30 rounded px-5 py-3 max-w-70 text-white">
      <p className="mb-1 text-sm font-semibold">
        Want traveling?
      </p>

      <p className="text-[11px] leading-relaxed opacity-90">
        This activity involves the movement of people from one
        location to another, domestically or internationally.
        <span className="ml-1 cursor-pointer underline">
          Visit more
        </span>
      </p>
    </div>

    {/* Social Icons */}
    <div className="flex flex-col items-center gap-3">
      <a
        href="#"
        className="text-white transition-opacity hover:opacity-70"
      >
        {/* <Instagram size={16} /> */}
      </a>

      <a
        href="#"
        className="text-white transition-opacity hover:opacity-70"
      >
        {/* <Facebook size={16} /> */}
      </a>

      <a
        href="#"
        className="text-white transition-opacity hover:opacity-70"
      >
        {/* <Linkedin size={16} /> */}
      </a>

      <a
        href="#"
        className="text-white transition-opacity hover:opacity-70"
      >
        {/* <Twitter size={16} /> */}
      </a>
    </div>
  </div>
</div>

{/* Middle: Hero Headline */}
<div className="flex flex-col items-center mt-4 md:mt-0 font-sans">
  <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] tracking-tight text-center">

    {/* First Line */}
    <span className="inline-flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
      <span className="font-light tracking-wide text-white/90">Crafting</span>

      <svg
        viewBox="0 0 440 110"
        className="h-14 sm:h-18 md:h-22 lg:h-24 w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
      >
        <defs>
          <mask id="journeys-mask">
            <rect width="100%" height="100%" rx="55" fill="white" />

            <text
              x="50%"
              y="53%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="70"
              fontWeight="800"
              fontFamily="sans-serif"
              letterSpacing="-0.03em"
            >
              Journeys
            </text>
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          rx="55"
          fill="white"
          mask="url(#journeys-mask)"
        />
      </svg>
    </span>

    <br />

    {/* Second Line */}
    <span className="inline-flex items-center gap-3 sm:gap-4 flex-wrap mt-3 justify-center">
      <span className="font-light tracking-wide text-white/90">Not</span>

      <svg
        viewBox="0 0 240 110"
        className="h-14 sm:h-18 md:h-22 lg:h-24 w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
      >
        <defs>
          <mask id="just-mask">
            <rect width="100%" height="100%" rx="55" fill="white" />

            <text
              x="50%"
              y="53%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="70"
              fontWeight="800"
              fontFamily="sans-serif"
              letterSpacing="-0.03em"
            >
              Just
            </text>
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          rx="55"
          fill="white"
          mask="url(#just-mask)"
        />
      </svg>

      <span className="font-black tracking-tight">Trips.</span>
    </span>

  </h1>
</div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-4 md:mt-0">
          {/* Left: Facilities */}
          <div className="flex flex-col gap-2">
            <p className="text-white font-semibold text-sm">
              The facilities we provide :
            </p>
            <div className="flex flex-wrap gap-2 max-w-xs md:max-w-sm">
              {facilities.map((item) => (
                <button
                  key={item}
                  className="bg-transparent border border-white/70 text-white text-xs rounded px-3 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer backdrop-blur-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Counseling text + CTA */}
          <div className="flex flex-col items-end gap-3">
            <p className="hidden md:block text-white text-[11px] text-right max-w-70 leading-relaxed opacity-90">
              Embark on a sacred journey of a lifetime. We handle all the travel logistics so you can focus entirely on your spiritual connection and peace of mind.
            </p>
<NavLink
  to="/umrah"
  className="w-full max-w-50 border border-[#C9A84C] bg-[#C9A84C] text-[#051A14] hover:bg-transparent hover:text-[#C9A84C] transition-colors duration-200 text-[0.7rem] font-bold uppercase tracking-widest py-3 px-3 rounded cursor-pointer flex items-center justify-center gap-1.5"
>
  View Packages
  <ArrowUpRight size={15} />
</NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}