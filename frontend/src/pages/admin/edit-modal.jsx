import React, { useState, useEffect } from "react";
import { 
  X, 
  Loader2, 
  Tag, 
  DollarSign, 
  LayoutGrid, 
  Moon,
  ListChecks,
  Star
} from "lucide-react";

const CATEGORIES = [
  { id: "budget", label: "Budget" },
  { id: "value", label: "Value" },
  { id: "luxury", label: "Luxury" },
  { id: "ramadan", label: "Ramadan" },
  { id: "view", label: "View" },
  { id: "december", label: "December" },
];

const INCLUSION_KEYS = [
  { key: "visa", label: "Umrah Visa" },
  { key: "flights", label: "Return Flights" },
  { key: "hotelAccommodation", label: "Hotel Accommodation" },
  { key: "airportTransfers", label: "Airport Transfers" },
  { key: "groundTransport", label: "Ground Transport" },
  { key: "ziyaratTours", label: "Ziyarat Tours" },
  { key: "meals", label: "Full-Board Meals" },
];

export default function EditPackageModal({ pkg, saving = false, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "budget",
    amount: "",
    makkahNights: 0,
    madinahNights: 0,
    isFeatured: false,
    checkoutPoints: "",
    inclusions: {
      visa: false,
      flights: false,
      hotelAccommodation: false,
      airportTransfers: false,
      groundTransport: false,
      ziyaratTours: false,
      meals: false,
    },
  });

  useEffect(() => {
    if (pkg) {
      setFormData({
        id: pkg._id || pkg.id || "",
        title: pkg.title || pkg.name || "",
        category: pkg.tier || pkg.category || "budget",
        amount: pkg.pricing?.amount ?? pkg.price ?? pkg.amount ?? "",
        makkahNights: pkg.makkahNights || 0,
        madinahNights: pkg.madinahNights || 0,
        isFeatured: pkg.isFeatured || false,
        checkoutPoints: pkg.checkoutPoints || pkg.description || pkg.subtitle || "",
        inclusions: {
          visa: pkg.inclusions?.visa || false,
          flights: pkg.inclusions?.flights || false,
          hotelAccommodation: pkg.inclusions?.hotelAccommodation || false,
          airportTransfers: pkg.inclusions?.airportTransfers || false,
          groundTransport: pkg.inclusions?.groundTransport || false,
          ziyaratTours: pkg.inclusions?.ziyaratTours || false,
          meals: pkg.inclusions?.meals || false,
        },
      });
    }
  }, [pkg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInclusionToggle = (key) => {
    setFormData((prev) => ({
      ...prev,
      inclusions: {
        ...prev.inclusions,
        [key]: !prev.inclusions[key],
      },
    }));
  };

  const handleToggleFeatured = () => {
    setFormData((prev) => ({ ...prev, isFeatured: !prev.isFeatured }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !saving) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 transition-all"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Edit Package</h2>
            <p className="text-xs text-gray-500 mt-0.5">Modify package details, pricing, and inclusions.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <X size={18} />
          </button>
        </div>

        {/* ─── Form Body (Scrollable) ─── */}
        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
          <form id="edit-package-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Primary Info & Featured Toggle */}
            <div className="flex flex-col md:flex-row gap-5 items-start">
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Package Title
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400 pointer-events-none">
                    <Tag size={16} />
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={saving}
                    required
                    className="w-full text-sm pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] bg-white transition-all disabled:bg-gray-50 disabled:opacity-70"
                  />
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="md:mt-6">
                <label
                  className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.isFeatured
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Star size={16} className={formData.isFeatured ? "text-yellow-500" : "text-gray-400"} fill={formData.isFeatured ? "currentColor" : "none"} />
                    <span className={`text-sm font-bold ${formData.isFeatured ? "text-yellow-800" : "text-gray-700"}`}>
                      Featured
                    </span>
                  </div>
                  <div
                    onClick={handleToggleFeatured}
                    className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                      formData.isFeatured ? "bg-yellow-400 justify-end" : "bg-gray-300 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </label>
              </div>
            </div>

            {/* Config: Category, Price, Nights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Category
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400 pointer-events-none">
                    <LayoutGrid size={14} />
                  </div>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={saving}
                    className="w-full text-sm pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] bg-white appearance-none cursor-pointer transition-all disabled:bg-gray-50 disabled:opacity-70"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Amount (Price)
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400 pointer-events-none">
                    <DollarSign size={14} />
                  </div>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    disabled={saving}
                    required
                    min={0}
                    className="w-full text-sm pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] bg-white transition-all disabled:bg-gray-50 disabled:opacity-70"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Makkah Nights
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400 pointer-events-none">
                    <Moon size={14} />
                  </div>
                  <input
                    type="number"
                    name="makkahNights"
                    value={formData.makkahNights}
                    onChange={handleChange}
                    disabled={saving}
                    min={0}
                    className="w-full text-sm pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] bg-white transition-all disabled:bg-gray-50 disabled:opacity-70"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Madinah Nights
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400 pointer-events-none">
                    <Moon size={14} />
                  </div>
                  <input
                    type="number"
                    name="madinahNights"
                    value={formData.madinahNights}
                    onChange={handleChange}
                    disabled={saving}
                    min={0}
                    className="w-full text-sm pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] bg-white transition-all disabled:bg-gray-50 disabled:opacity-70"
                  />
                </div>
              </div>
            </div>

            {/* Checkout Points */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                Checkout Points
              </label>
              <div className="relative flex items-start">
                <div className="absolute left-3 top-3 text-gray-400 pointer-events-none">
                  <ListChecks size={16} />
                </div>
                <textarea
                  name="checkoutPoints"
                  value={formData.checkoutPoints}
                  onChange={handleChange}
                  disabled={saving}
                  rows={2}
                  placeholder="Enter key checkout features, separated by commas..."
                  className="w-full text-sm pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] bg-white transition-all disabled:bg-gray-50 disabled:opacity-70 resize-none"
                />
              </div>
            </div>

            {/* Inclusions Group */}
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Package Inclusions
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {INCLUSION_KEYS.map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded-lg border border-transparent hover:border-gray-200 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.inclusions[key]}
                      onChange={() => handleInclusionToggle(key)}
                      disabled={saving}
                      className="w-4 h-4 text-[#c9a84c] rounded border-gray-300 focus:ring-[#c9a84c] disabled:opacity-50"
                    />
                    <span className="font-medium select-none text-[13px]">{label}</span>
                  </label>
                ))}
              </div>
            </div>

          </form>
        </div>

        {/* ─── Footer Actions ─── */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3 rounded-b-2xl shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-package-form"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#c9a84c] rounded-xl hover:bg-[#b8963e] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}