import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PackageCard } from "../components/package-card";
import { packages } from "../data/home.js";

// Added DECEMBER to tabs to support UI mapping requirements 
const tabs = ["ALL", "BUDGET", "VALUE", "LUXURY", "RAMADAN", "DECEMBER"];

export default function Umrah() {
  const location = useLocation();
  
  // 1. Initialize activeTab with state from the React Router Link, otherwise default to "ALL"
  const [activeTab, setActiveTab] = useState(location.state?.tab || "ALL");

  // 2. Add useEffect to catch router state changes if the user clicks the nav dropdown while ALREADY on the /umrah page
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  // Filter logic based on dataset "tier". 
  // Safely handles new UI tabs (like DECEMBER) that might not map to data yet.
  const filteredPackages =
    activeTab === "ALL"
      ? packages
      : packages.filter((pkg) => pkg.tier?.toUpperCase() === activeTab);

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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPackages.map((pkg, index) => (
            <PackageCard key={pkg.title || index} {...pkg} />
          ))}
          
          {/* Fallback state if a UI-only tab (like December) is clicked and has no packages yet */}
          {filteredPackages.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-500 font-medium">No packages are currently available for this category.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}