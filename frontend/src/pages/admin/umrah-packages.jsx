import { useState } from "react";
import { Search, Plus, ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";

const allUmrahPackages = [
  { id: 1,  name: "Royal Ramadan Luxe",   subtitle: "5-Star Luxury Experience",     category: "PREMIUM", price: "$4,500", duration: "14 Days" },
  { id: 2,  name: "Spiritual Essence",    subtitle: "Guided Educational Tour",      category: "VALUE",   price: "$2,800", duration: "10 Days" },
  { id: 3,  name: "Humble Path",          subtitle: "Economy Shifting Package",     category: "BUDGET",  price: "$1,950", duration: "21 Days" },
  { id: 4,  name: "Divine Journey",       subtitle: "Spiritual Enlightenment",      category: "PREMIUM", price: "$3,900", duration: "15 Days" },
  { id: 5,  name: "Pure Serenity",        subtitle: "Peaceful Retreat",             category: "VALUE",   price: "$2,400", duration: "12 Days" },
  { id: 6,  name: "Sacred Oasis",         subtitle: "Comfort & Devotion",           category: "BUDGET",  price: "$1,700", duration: "16 Days" },
  { id: 7,  name: "Majestic Makkah",      subtitle: "Grand Experience",             category: "PREMIUM", price: "$5,200", duration: "14 Days" },
];

const categoryStyles = {
  PREMIUM: "bg-[#D4AF37] text-white",
  VALUE:   "bg-[#9BC1BC] text-white",
  BUDGET:  "bg-[#051A14] text-white",
  RAMADAN: "bg-[#C6ECAE] text-white",
};

const ITEMS_PER_PAGE = 10;

// Tiny placeholder image box
function PackageThumb() {
  return (
    <div className="w-8 h-8 rounded-md bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
      <div className="w-full h-full bg-gray-200" />
    </div>
  );
}

export default function UmrahPackages() {
  const [search, setSearch]           = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = allUmrahPackages.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
<div className="max-w-5xl mx-auto">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[16px] font-bold text-gray-900 tracking-tight">Umrah Packages</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search packages..."
              value={search}
              onChange={handleSearch}
              className="pl-7 pr-3 py-1.5 text-[10px] border border-gray-200 rounded-lg bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:border-gray-300 w-41.25"
            />
          </div>
          <button className="flex items-center gap-1.5 bg-[#c9a84c] hover:bg-[#b8963e] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
            <Plus className="w-3 h-3" strokeWidth={2.5} />
            Add New Package
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        {/* Column headers */}
        <div className="grid grid-cols-[2fr_1fr_0.8fr_0.9fr_1.1fr] px-4 py-3 border-b border-gray-100 bg-white">
          {["PACKAGE NAME", "CATEGORY", "PRICE", "DURATION", "ACTIONS"].map((col) => (
            <span key={col} className="text-[8.5px] font-bold text-gray-400 tracking-widest uppercase">
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100">
          {paginated.map((pkg) => (
            <div
              key={pkg.id}
              className="grid grid-cols-[2fr_1fr_0.8fr_0.9fr_1.1fr] items-center px-4 py-2.5 hover:bg-gray-50/50 transition-colors"
            >
              {/* Package name */}
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <PackageThumb />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-gray-900 leading-tight truncate">{pkg.name}</p>
                  <p className="text-[9px] text-gray-400 leading-tight truncate">{pkg.subtitle}</p>
                </div>
              </div>

              {/* Category */}
              <div>
                <span className={`inline-block text-[8px] font-bold px-2 py-0.5 rounded tracking-wide ${categoryStyles[pkg.category]}`}>
                  {pkg.category}
                </span>
              </div>

              {/* Price */}
              <span className="text-[11px] font-semibold text-gray-800">{pkg.price}</span>

              {/* Duration */}
              <span className="text-[10px] text-gray-600">{pkg.duration}</span>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                <button className="flex items-center gap-1 bg-[#c9a84c] hover:bg-[#b8963e] text-white text-[8.5px] font-bold px-2 py-1 rounded transition-colors">
                  <Pencil className="w-2.5 h-2.5" strokeWidth={2.5} />
                  Edit
                </button>
                {/* <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-[8.5px] font-bold px-2 py-1 rounded transition-colors">
                  <Trash2 className="w-2.5 h-2.5" strokeWidth={2.5} />
                  Delete
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer / Pagination ── */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-[9.5px] text-gray-400">
            Showing {paginated.length} of {filtered.length} packages
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:border-gray-300 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-3 h-3" strokeWidth={2} />
            </button>

            {Array.from({ length: Math.max(totalPages, 2) }, (_, i) => i + 1).slice(0, 3).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-semibold transition-colors ${
                  currentPage === page
                    ? "bg-[#c9a84c] text-white"
                    : "border border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(Math.max(totalPages, 2), p + 1))}
              disabled={currentPage >= Math.max(totalPages, 2)}
              className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:border-gray-300 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-3 h-3" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
</div>
    </div>
  );
}