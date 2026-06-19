import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader2, ChevronDown } from "lucide-react";
import { PackageCard } from "../components/package-card";
import { getAllPackages } from "../services/package.service";

const tabs = ["ALL", "BUDGET", "VALUE", "LUXURY", "RAMADAN", "DECEMBER", "KABA VIEW"];

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

  const [activeTab, setActiveTab] = useState(location.state?.tab || "ALL");
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  useEffect(() => {
    let isMounted = true;

    const fetchPackages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getAllPackages({ 
          journeyType: "Umrah", 
          limit: 100 
        });

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

  const filteredPackages = activeTab === "ALL"
      ? packages
      : packages.filter((pkg) => pkg.tier === tabToTierMap[activeTab]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="px-4 py-12 md:px-10 lg:px-16 max-w-[90rem] mx-auto w-full">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[#D4AF37] font-semibold text-[11px] sm:text-xs uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1.5 rounded-full inline-block">
            Sacred Journeys
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Umrah <span className="text-[#D4AF37]">Packages</span>
          </h1>

          <p className="mt-3 sm:mt-4 text-[13px] sm:text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Experience a pilgrimage defined by serenity and excellence. Our meticulously
            crafted itineraries blend spiritual devotion with premium comfort, ensuring
            every step of your journey is as sacred as the destination.
          </p>
        </div>

        {/* ── Responsive Tabs Section ── */}
        <div className="mb-10 w-full max-w-md mx-auto sm:max-w-none">
          {/* Mobile View: Custom Dropdown Menu */}
          <div className="block sm:hidden relative w-full">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-[13px] font-bold tracking-wider appearance-none focus:outline-none focus:border-[#b8963e] focus:ring-1 focus:ring-[#b8963e] shadow-sm transition-all"
            >
              {tabs.map((tab) => (
                <option key={tab} value={tab}>
                  {tab}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-3.5 pointer-events-none text-gray-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Desktop/Tablet View: Horizontal Tab Bar */}
          <div className="hidden sm:flex justify-center border-b border-gray-200 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex space-x-2 md:space-x-4 pb-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 lg:px-6 text-[12px] font-semibold tracking-widest transition-colors relative whitespace-nowrap ${
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
            <p className="text-red-500 font-medium text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Cards Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {filteredPackages.map((pkg, index) => (
              <PackageCard key={pkg._id || index} {...pkg} id={pkg._id} />
            ))}

            {/* Fallback state if a category has no packages */}
            {filteredPackages.length === 0 && (
              <div className="col-span-full py-16 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-500 font-medium text-sm sm:text-base">
                  No packages are currently available for this category.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}