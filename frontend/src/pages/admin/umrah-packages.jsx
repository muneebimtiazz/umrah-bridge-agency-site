import { useState, useEffect, useCallback } from "react";
import { Search, Plus, ChevronLeft, ChevronRight, Pencil, Trash2, Loader2 } from "lucide-react";
import EditPackageModal from "./edit-modal.jsx";
import { getAllPackages, deletePackage, updatePackage } from "../../services/package.service";

const ITEMS_PER_PAGE = 10;

function PackageThumb({ src }) {
  return (
    <div className="w-8 h-8 rounded-md bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
      {src ? (
        <img src={src} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-200" />
      )}
    </div>
  );
}

// ── Helper: Convert package to form shape ──────────────────────────────────
function toFormShape(pkg) {
  const nights = (pkg.makkahNights ?? 0) + (pkg.madinahNights ?? 0);
  return {
    id:            pkg._id,
    title:         pkg.title,
    description:   pkg.description || "",
    tier:          pkg.tier ?? "budget",
    makkahNights:  pkg.makkahNights ?? 4,
    madinahNights: pkg.madinahNights ?? 3,
    price:         pkg.pricing?.amount ?? 0,
    currency:      pkg.pricing?.currency ?? "GBP",
    sharingType:   pkg.pricing?.sharingType ?? "Quad",
    visa:          pkg.inclusions?.visa ?? false,
    flights:       pkg.inclusions?.flights ?? false,
    hotel:         pkg.inclusions?.hotelAccommodation ?? false,
    transfers:     pkg.inclusions?.airportTransfers ?? false,
    transport:     pkg.inclusions?.groundTransport ?? false,
    ziyarat:       pkg.inclusions?.ziyaratTours ?? false,
    meals:         pkg.inclusions?.meals ?? false,
    directFlights: pkg.directFlights ?? false,
    isActive:      pkg.isActive ?? true,
    isFeatured:    pkg.isFeatured ?? false,
    makkahHotel:   pkg.makkahHotel?._id || pkg.makkahHotel || null,
    madinahHotel:  pkg.madinahHotel?._id || pkg.madinahHotel || null,
    heroImage:     pkg.heroImage?._id || pkg.heroImage || null,
  };
}

// ── Helper: Convert form shape back to API payload ──────────────────────
function toApiPayload(form) {
  return {
    title: form.title,
    description: form.description,
    tier: form.tier,
    makkahNights: form.makkahNights,
    madinahNights: form.madinahNights,
    makkahHotel: form.makkahHotel,
    madinahHotel: form.madinahHotel,
    heroImage: form.heroImage,
    pricing: {
      amount: form.price,
      currency: form.currency,
      sharingType: form.sharingType,
    },
    inclusions: {
      visa: form.visa,
      flights: form.flights,
      hotelAccommodation: form.hotel,
      airportTransfers: form.transfers,
      groundTransport: form.transport,
      ziyaratTours: form.ziyarat,
      meals: form.meals,
    },
    directFlights: form.directFlights,
    isActive: form.isActive,
    isFeatured: form.isFeatured,
  };
}

export default function UmrahPackages() {
  const [packages,    setPackages]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [search,      setSearch]      = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total,       setTotal]       = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg,  setEditingPkg]  = useState(null);
  const [saving,      setSaving]      = useState(false);

  // ── Fetch ────────────────────────────────────────────────────────────────────
  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllPackages({
        journeyType: "Umrah",
        isActive:    "all",
        page:        currentPage,
        limit:       ITEMS_PER_PAGE,
        ...(search ? { search } : {}),
      });
      setPackages(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to load packages.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search]);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  // Reset to page 1 on search change
  useEffect(() => { setCurrentPage(1); }, [search]);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this package?")) return;
    try {
      await deletePackage(id);
      // Refetch to update list
      fetchPackages();
    } catch (err) {
      alert(err.response?.data?.message ?? "Delete failed.");
    }
  };

  const handleOpenEdit = (pkg) => {
    setEditingPkg(toFormShape(pkg));
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (formData) => {
    setSaving(true);
    try {
      const payload = toApiPayload(formData);
      await updatePackage(formData.id, payload);
      setIsModalOpen(false);
      setEditingPkg(null);
      fetchPackages();
    } catch (err) {
      alert(err.response?.data?.message ?? "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[16px] font-bold text-gray-900 tracking-tight">Umrah Packages</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search packages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-7 pr-3 py-1.5 text-[10px] border border-gray-200 rounded-lg bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:border-gray-300 w-48"
              />
            </div>
            <button className="flex items-center gap-1.5 bg-[#c9a84c] hover:bg-[#b8963e] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
              <Plus className="w-3 h-3" strokeWidth={2.5} />
              Add New Package
            </button>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">

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
            {loading ? (
              <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs">Loading packages…</span>
              </div>
            ) : packages.length > 0 ? (
              packages.map((pkg) => {
                // Handle case where package might be soft-deleted
                const isActive = pkg.isActive !== false;
                return (
                  <div
                    key={pkg._id}
                    className={`grid grid-cols-[2fr_1fr_0.8fr_0.9fr_1.1fr] items-center px-4 py-2.5 transition-colors ${
                      isActive ? "hover:bg-gray-50/50" : "opacity-50 bg-gray-50"
                    }`}
                  >
                    {/* Name */}
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <PackageThumb src={pkg.heroImage?.url} />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-gray-900 leading-tight truncate">
                          {pkg.title}
                          {!isActive && (
                            <span className="ml-2 text-[8px] font-normal text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                              Inactive
                            </span>
                          )}
                        </p>
                        <p className="text-[9px] text-gray-400 leading-tight truncate">
                          {pkg.makkahNights || 0}N Makkah + {pkg.madinahNights || 0}N Madinah
                        </p>
                      </div>
                    </div>

                    {/* Tier badge */}
                    <div>
                      <span
                        className={`inline-block text-[8px] font-bold px-2 py-0.5 rounded tracking-wide uppercase ${
                          pkg.tier === "luxury"
                            ? "bg-purple-500 text-white"
                            : pkg.tier === "value"
                            ? "bg-blue-500 text-white"
                            : pkg.tier === "ramadan"
                            ? "bg-amber-500 text-white"
                            : pkg.tier === "view"
                            ? "bg-indigo-500 text-white"
                            : "bg-[#10b981] text-white"
                        }`}
                      >
                        {pkg.tier || "budget"}
                      </span>
                    </div>

                    {/* Price */}
                    <span className="text-[11px] font-semibold text-gray-800">
                      {pkg.pricing?.currency === "GBP" ? "£" : "Rs "}
                      {pkg.pricing?.amount?.toLocaleString()}
                    </span>

                    {/* Duration */}
                    <span className="text-[10px] text-gray-600">
                      {(pkg.makkahNights ?? 0) + (pkg.madinahNights ?? 0)} Days
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(pkg)}
                        className="flex items-center gap-1 bg-[#c9a84c] hover:bg-[#b8963e] text-white text-[8.5px] font-bold px-2 py-1 rounded transition-colors"
                      >
                        <Pencil className="w-2.5 h-2.5" strokeWidth={2.5} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(pkg._id)}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-[8.5px] font-bold px-2 py-1 rounded transition-colors"
                      >
                        <Trash2 className="w-2.5 h-2.5" strokeWidth={2.5} />
                        {isActive ? "Delete" : "Restore"}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 text-sm text-gray-400">No packages found.</div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span className="text-[9.5px] text-gray-400">
              Showing {packages.length} of {total} packages
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:border-gray-300 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-3 h-3" strokeWidth={2} />
              </button>

              {Array.from({ length: Math.min(totalPages || 1, 5) }, (_, i) => i + 1).map((page) => (
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
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages || totalPages === 0}
                className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:border-gray-300 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-3 h-3" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditPackageModal
          pkg={editingPkg}
          saving={saving}
          onClose={() => { setIsModalOpen(false); setEditingPkg(null); }}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}