import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { PackageCard } from "../components/package-card";
import { getAllPackages } from "../services/package.service";

const tabs = ["ALL", "BUDGET", "VALUE", "LUXURY", "RAMADAN", "DECEMBER", "KABA VIEW"];

// Map UI tab names to the exact backend schema enums for accurate filtering
const tabToTierMap = {
  "ALL": "all",
  "BUDGET": "budget",
  "VALUE": "value",
  "LUXURY": "luxury",
  "RAMADAN": "ramadan",
  "DECEMBER": "december",
  "KABA VIEW": "view"
};

export default function Umrah() {
  const location = useLocation();

  // Initialize activeTab with state from the React Router Link, default to "ALL"
  const [activeTab, setActiveTab] = useState(location.state?.tab || "ALL");

  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Catch router state changes if the user clicks the nav dropdown while ALREADY on the page
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  // Fetch the live package list from the API once on mount
  useEffect(() => {
    let isMounted = true;

    const fetchPackages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Explicitly request Umrah packages. 
        // Increase limit to 100 so client-side tab filtering has all the data to work with.
        const res = await getAllPackages({ 
          journeyType: "Umrah", 
          limit: 100 
        });

        // Axios wraps the response in .data, and your backend returns { success: true, data: [...] }
        const list = res?.data?.data || [];

        if (isMounted) setPackages(list);
      } catch (err) {
        console.error("Failed to load packages:", err);
        if (isMounted) {
          setError("We couldn't load Umrah packages right now. Please try again shortly.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPackages();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Safely filter packages using the mapping object
  const filteredPackages = activeTab === "ALL"
      ? packages
      : packages.filter((pkg) => pkg.tier === tabToTierMap[activeTab]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="px-5 py-12 md:px-10 lg:px-16 max-w-[90rem] mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#D4AF37] font-semibold text-xs uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1.5 rounded-full inline-block">
            Sacred Journeys
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Umrah <span className="text-[#D4AF37]">Packages</span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Experience a pilgrimage defined by serenity and excellence. Our meticulously
            crafted itineraries blend spiritual devotion with premium comfort, ensuring
            every step of your journey is as sacred as the destination.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-gray-200 mb-10 overflow-x-auto scrollbar-none">
          <div className="flex space-x-2 sm:space-x-4 pb-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 text-[12px] font-semibold tracking-widest transition-colors relative whitespace-nowrap ${
                  activeTab === tab
                    ? "text-[#b8963e]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#b8963e] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-400">
            <Loader2 className="w-7 h-7 animate-spin text-[#D4AF37]" />
            <p className="text-sm">Loading Umrah packages...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="py-16 text-center">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}

        {/* Cards Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPackages.map((pkg, index) => (
              <PackageCard key={pkg._id || index} {...pkg} id={pkg._id} />
            ))}

            {/* Fallback state if a category has no packages */}
            {filteredPackages.length === 0 && (
              <div className="col-span-full py-12 text-center flex flex-col items-center justify-center">
                <p className="text-gray-500 font-medium">No packages are currently available for this category.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}