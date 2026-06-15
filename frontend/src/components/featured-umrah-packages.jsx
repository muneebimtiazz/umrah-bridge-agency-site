import React from "react";
import { ChevronRight } from "lucide-react";
import { packages } from "../data/home.js";
import { PackageCard } from "../components/package-card.jsx";

export function FeaturedUmrahPackages() {
  const featured = packages
    .filter((pkg) => pkg.inclusions?.featured === true)
    .slice(0, 4);

  return (
    <section className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER (unchanged UI) */}
        <div className="mb-12 flex flex-col items-center text-center gap-6">

          <div className="max-w-2xl mx-auto">
            <span className="text-[#D4AF37] font-semibold text-xs uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1.5 rounded-full inline-block">
              Our Offerings
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Featured Umrah <span className="text-[#D4AF37]">Packages</span>
            </h2>

            <p className="mt-4 text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
              Discover thoughtfully curated Umrah experiences designed for comfort,
              convenience, and spiritual fulfillment. Choose the package that best suits your journey.
            </p>
          </div>

          <button className="group w-full max-w-60 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#051A14] transition-colors duration-200 text-[12px] font-bold uppercase tracking-widest py-3 px-3 rounded flex items-center justify-center gap-1.5 mt-2">
            View All Packages
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>

        </div>

        {/* GRID (STRICT DATA PASSING ONLY) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((pkg, index) => (
            <PackageCard
              key={pkg.title ?? index}
              title={pkg.title}
              heroImage={pkg.heroImage}
              makkahNights={pkg.makkahNights}
              madinahNights={pkg.madinahNights}
              makkahHotel={pkg.makkahHotel}
              madinahHotel={pkg.madinahHotel}
              tier={pkg.tier}
              pricing={pkg.pricing}
              inclusions={pkg.inclusions}
              directFlights={pkg.directFlights}
            />
          ))}
        </div>

      </div>
    </section>
  );
}