import React, { useState, useEffect } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllPackages } from "../services/package.service";
import { PackageCard } from "../components/package-card.jsx";

export function FeaturedUmrahPackages() {
  const [featured, setFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFeatured = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // OPTIMIZATION: Let the backend do the filtering and limiting!
        // We only request exactly what we need: 4 Featured Umrah Packages.
        const res = await getAllPackages({
          journeyType: "Umrah",
          isFeatured: "true",
          limit: 4
        });

        // Clean, direct data extraction matching your backend response shape
        const featuredOnly = res?.data?.data || [];

        if (isMounted) setFeatured(featuredOnly);
      } catch (err) {
        console.error("Failed to load featured packages:", err);
        if (isMounted) {
          setError("We couldn't load featured packages right now. Please try again shortly.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchFeatured();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
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

          <Link
            to="/umrah"
            className="group w-full max-w-60 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#051A14] transition-colors duration-200 text-[12px] font-bold uppercase tracking-widest py-3 px-3 rounded flex items-center justify-center gap-1.5 mt-2"
          >
            View All Packages
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>

        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin text-[#D4AF37]" />
            <p className="text-sm">Loading featured packages...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {!isLoading && error && (
          <div className="py-12 text-center">
            <p className="text-red-500 font-medium text-sm">{error}</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && !error && featured.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 font-medium text-sm">
              No featured packages are available right now.
            </p>
          </div>
        )}

        {/* GRID */}
        {!isLoading && !error && featured.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((pkg, index) => (
              <PackageCard
                key={pkg._id ?? index}
                id={pkg._id}
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
                isFeatured={pkg.isFeatured} // Explicitly passing the top-level isFeatured flag
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}