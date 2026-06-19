import { useState, useEffect, useCallback } from "react";
import { Search, Plus, ChevronLeft, ChevronRight, Pencil, Trash2, Loader2, Package } from "lucide-react";
import { NavLink } from "react-router-dom";
import EditPackageModal from "./edit-modal";
import { getAllPackages, deletePackage, updatePackage } from "../../services/package.service";

const ITEMS_PER_PAGE = 10;

function PackageThumb({ src }) {
  return (
    <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 shrink-0 overflow-hidden shadow-sm">
      {src ? (
        <img src={src} alt="Package thumbnail" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-[10px] text-gray-400 font-medium">No Img</span>
        </div>
      )}
    </div>
  );
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
  const [deletingId,  setDeletingId]  = useState(null); // Tracks which package is being deleted

  // ── Fetch ────────────────────────────────────────────────────────────────────
  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllPackages({
        journeyType: "Umrah", // Explicitly fetch Umrah
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
    if (!window.confirm("Are you sure you want to permanently delete this package and its images?")) return;
    
    setDeletingId(id); // Start loader on the specific button
    try {
      await deletePackage(id);
      fetchPackages();
    } catch (err) {
      alert(err.response?.data?.message ?? "Delete failed.");
    } finally {
      setDeletingId(null); // Stop loader
    }
  };

  const handleOpenEdit = (pkg) => {
    setEditingPkg(pkg); // Pass raw DB object directly to modal
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (formData) => {
    setSaving(true);
    try {
      await updatePackage(formData.id, {
        title: formData.title,
        description: formData.checkoutPoints,
        tier: formData.category,
        pricing: { amount: Number(formData.amount) },
        makkahNights: Number(formData.makkahNights),
        madinahNights: Number(formData.madinahNights),
        isFeatured: formData.isFeatured,
        inclusions: formData.inclusions
      });
      
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Umrah Packages</h1>
            <p className="text-xs text-gray-500 mt-0.5">Manage and organize your Umrah offerings.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search packages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] w-56 shadow-sm transition-all"
              />
            </div>
            <NavLink
              to="/admin"
              className="flex items-center gap-1.5 bg-[#c9a84c] hover:bg-[#b8963e] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Add New Package
            </NavLink>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-xs font-medium text-red-600 flex items-center gap-2 shadow-sm">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-[2fr_1fr_0.8fr_0.9fr_1.1fr] px-5 py-4 border-b border-gray-100 bg-gray-50/50">
            {["Package Name", "Category", "Price", "Duration", "Actions"].map((col) => (
              <span key={col} className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                {col}
              </span>
            ))}
          </div>

          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin text-[#c9a84c]" />
                <span className="text-sm font-medium">Loading packages…</span>
              </div>
            ) : packages.length > 0 ? (
              packages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="grid grid-cols-[2fr_1fr_0.8fr_0.9fr_1.1fr] items-center px-5 py-3.5 hover:bg-gray-50/80 transition-colors"
                >
                  {/* Name */}
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <PackageThumb src={pkg.heroImage?.url} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 leading-snug truncate">
                        {pkg.title}
                        {pkg.isFeatured && <span className="ml-2 text-[9px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-bold">★ FEATURED</span>}
                      </p>
                      <p className="text-[11px] text-gray-500 leading-snug truncate mt-0.5">
                        {pkg.makkahNights || 0}N Makkah + {pkg.madinahNights || 0}N Madinah
                      </p>
                    </div>
                  </div>

                  {/* Tier badge */}
                  <div>
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${
                      pkg.tier === 'luxury' ? 'bg-purple-100 text-purple-700' :
                      pkg.tier === 'ramadan' ? 'bg-amber-100 text-amber-700' :
                      pkg.tier === 'value' ? 'bg-blue-100 text-blue-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {pkg.tier}
                    </span>
                  </div>

                  {/* Price */}
                  <span className="text-sm font-bold text-gray-800">
                    {pkg.pricing?.currency === "GBP" ? "£" : "Rs "}
                    {pkg.pricing?.amount?.toLocaleString() || 0}
                  </span>

                  {/* Duration */}
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md inline-block w-fit">
                    {(pkg.makkahNights ?? 0) + (pkg.madinahNights ?? 0)} Days
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(pkg)}
                      disabled={deletingId === pkg._id}
                      className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Pencil className="w-3 h-3" strokeWidth={2.5} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      disabled={deletingId === pkg._id}
                      className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deletingId === pkg._id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" strokeWidth={2.5} />
                      )}
                      {deletingId === pkg._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">No packages found</h3>
                <p className="text-xs text-gray-500 mt-1">Get started by creating a new Umrah package.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs font-medium text-gray-500">
              Showing {packages.length} of {total} packages
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:border-gray-300 hover:text-gray-900 disabled:opacity-40 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2} />
              </button>

              {Array.from({ length: Math.min(totalPages || 1, 5) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all shadow-sm ${
                    currentPage === page
                      ? "bg-[#c9a84c] text-white border border-[#c9a84c]"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages || totalPages === 0}
                className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:border-gray-300 hover:text-gray-900 disabled:opacity-40 transition-colors shadow-sm"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

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