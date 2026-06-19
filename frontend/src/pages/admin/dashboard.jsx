import React, { useState } from "react";
import {
  FileText,
  MapPin,
  Building2,
  Package,
  DollarSign,
  ImageIcon,
  Upload,
  ChevronDown,
  Star,
  Tent,
  LayoutGrid,
  Gem,
  Loader2,
  CheckCircle2,
  Eye,
  Snowflake,
} from "lucide-react";

// Updated imports to reflect the new architecture
import { createPackage } from "../../services/package.service";
import { uploadSingleImage, uploadMultipleImages } from "../../services/image.service";

const availableInclusions = [
  "Umrah Visa",
  "Return Flights",
  "Hotel Accommodation",
  "Airport Transfers",
  "Ground Transport",
  "Ziyarat Tours",
  "Full-Board Meals",
  "Featured",
];

// Map human-readable inclusion labels to backend boolean keys
const inclusionKeyMap = {
  "Umrah Visa":           "visa",
  "Return Flights":       "flights",
  "Hotel Accommodation":  "hotelAccommodation",
  "Airport Transfers":    "airportTransfers",
  "Ground Transport":     "groundTransport",
  "Ziyarat Tours":        "ziyaratTours",
  "Full-Board Meals":     "meals",
};

// ─── Package Summary Sidebar ──────────────────────────────────────────────────
function PackageSummary({ data }) {
  const {
    title,
    makkahNights,
    madinahNights,
    basePrice,
    sharingType,
    currency,
    journeyType,
    makkahHotel,
    madinahHotel,
    inclusions,
    directFlights,
  } = data;

  const getCurrencySymbol = (curr) => {
    if (curr === "GBP") return "£";
    if (curr === "PKR") return "Rs ";
    return "$";
  };

  return (
    <div className="bg-[#1a1a0e] rounded-xl overflow-hidden text-white w-full shadow-lg border border-[#2a2a12]">
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Star size={14} className="text-yellow-400" fill="#facc15" />
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wide">
            Package Summary
          </span>
        </div>
        <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-bold tracking-wider uppercase">
          {journeyType}
        </span>
      </div>

      <div className="px-4 pb-2 border-b border-white/5">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Package Preview</p>
        <h3 className="text-base font-bold leading-snug mt-1 min-h-[44px] text-white">
          {title || "Untitled Package Experience"}
        </h3>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center shrink-0">
            <Building2 size={14} className="text-yellow-400" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide flex justify-between">
              <span>Makkah • {makkahNights || 0} Nights</span>
              <span className="text-yellow-400">{makkahHotel.star}</span>
            </p>
            <p className="text-xs font-semibold leading-snug mt-0.5 text-gray-200">
              {makkahHotel.name || "Makkah Hotel Pending..."}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center shrink-0">
            <Building2 size={14} className="text-yellow-400" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide flex justify-between">
              <span>Madinah • {madinahNights || 0} Nights</span>
              <span className="text-yellow-400">{madinahHotel.star}</span>
            </p>
            <p className="text-xs font-semibold leading-snug mt-0.5 text-gray-200">
              {madinahHotel.name || "Madinah Hotel Pending..."}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 pt-1 border-t border-white/5 mt-1">
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center shrink-0">
            <Package size={14} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Included</p>
            <p className="text-[11px] font-medium leading-snug mt-0.5 text-gray-300">
              {directFlights && <span className="text-blue-400 font-bold mr-1">Direct Flights +</span>}
              {inclusions.length > 0
                ? inclusions.slice(0, 3).join(" + ") + (inclusions.length > 3 ? "..." : "")
                : "No inclusions selected"}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-3 mb-3 rounded-lg bg-[#2a2a12] px-4 py-3 flex items-end justify-between border border-yellow-400/20 shadow-inner">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Starting from</p>
          <p className="text-2xl font-bold text-yellow-400">
            {getCurrencySymbol(currency)}{basePrice || "0"}
          </p>
        </div>
        <div className="text-right flex flex-col items-end">
          <p className="text-[10px] text-gray-400 line-through">per person</p>
          <span className="text-[10px] bg-yellow-400 text-black font-extrabold px-2 py-0.5 rounded mt-1 shadow-sm">
            {sharingType} Sharing
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-gray-500" />
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ─── Form Controls ────────────────────────────────────────────────────────────
function Input({ ...props }) {
  return (
    <input
      {...props}
      className={`w-full border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white ${props.className || ""}`}
    />
  );
}

function Select({ children, className = "", ...props }) {
  return (
    <div className={`relative ${className}`}>
      <select
        {...props}
        className="appearance-none w-full border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 pr-7"
      >
        {children}
      </select>
      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

function NightInput({ label, value, onChange }) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-1 mb-2">
        <MapPin size={12} className="text-gray-400" />
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-blue-400">
        <input
          type="number"
          value={value}
          onChange={onChange}
          min={1}
          className="w-12 text-center text-sm font-semibold text-gray-800 py-2 border-none focus:outline-none bg-white"
        />
        <span className="text-xs text-gray-400 px-2 bg-gray-50 h-full flex items-center py-2 border-l border-gray-200">
          Nights
        </span>
      </div>
    </div>
  );
}

// ─── Hotel Card ───────────────────────────────────────────────────────────────
function HotelCard({ title, data, onUpdate }) {
  const handleChange = (key, value) => onUpdate({ ...data, [key]: value });

  const handleAddImages = (files) => {
    if (!files) return;
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(2, 9),
    }));
    onUpdate({ ...data, images: [...data.images, ...newImages] });
  };

  const handleRemoveImage = (id) => {
    onUpdate({ ...data, images: data.images.filter((img) => img.id !== id) });
  };

  return (
    <div className="flex-1 border border-gray-200 rounded-xl p-4 bg-gray-50/30">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-700">{title}</span>
        <Building2 size={14} className="text-gray-400" />
      </div>

      <div className="flex flex-col gap-2.5">
        <Input
          placeholder="Hotel Name"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <div className="flex gap-2">
          <Select
            className="flex-1"
            value={data.star}
            onChange={(e) => handleChange("star", e.target.value)}
          >
            <option>5 Star</option>
            <option>4 Star</option>
            <option>3 Star</option>
          </Select>

          <Input
            placeholder="Distance (e.g. 50m)"
            className="flex-1"
            value={data.distance}
            onChange={(e) => handleChange("distance", e.target.value)}
          />
        </div>

        <textarea
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none bg-white"
          placeholder="Hotel Description"
          rows={2}
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div
        onClick={() => document.getElementById(`hotel-upload-${title}`).click()}
        className="mt-3 border border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-colors rounded-lg flex flex-col items-center justify-center py-4 gap-1 bg-gray-50 cursor-pointer"
      >
        <Upload size={16} className="text-gray-400" />
        <span className="text-[10px] text-gray-500 font-medium">Click to Upload Images</span>
        <input
          id={`hotel-upload-${title}`}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleAddImages(e.target.files)}
        />
      </div>

      {data.images.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {data.images.map((img) => (
            <div key={img.id} className="relative group border border-gray-200 rounded overflow-hidden">
              <img src={img.preview} className="w-full h-16 object-cover" alt="" />
              <button
                onClick={(e) => { e.stopPropagation(); handleRemoveImage(img.id); }}
                className="absolute top-1 right-1 bg-black/70 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [packageData, setPackageData] = useState({
    tier: "budget",
    title: "",
    description: "",
    journeyType: "Umrah",
    makkahNights: 4,
    madinahNights: 3,
    makkahHotel: { name: "", star: "5 Star", distance: "", description: "", images: [] },
    madinahHotel: { name: "", star: "5 Star", distance: "", description: "", images: [] },
    inclusions: ["Umrah Visa", "Return Flights", "Hotel Accommodation"],
    basePrice: 100,
    currency: "GBP",
    sharingType: "Single",
    directFlights: false,
    heroImage: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateData = (key, value) =>
    setPackageData((prev) => ({ ...prev, [key]: value }));

  const handleInclusionToggle = (item) => {
    setPackageData((prev) => ({
      ...prev,
      inclusions: prev.inclusions.includes(item)
        ? prev.inclusions.filter((i) => i !== item)
        : [...prev.inclusions, item],
    }));
  };

  const handleFileChange = (file) => {
    if (!file) return;
    updateData("heroImage", file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files?.[0]);
  };

  const starLabelToNumber = (label) => parseInt(label, 10) || 5;

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // 1. FORMAT INCLUSIONS
      const inclusionsObj = {};
      (packageData.inclusions || []).forEach((label) => {
        const key = inclusionKeyMap[label];
        if (key) inclusionsObj[key] = true;
      });

      // 2. PARALLEL PRE-UPLOADS
      const uploadTasks = [];
      let heroIdx = -1, makkahIdx = -1, madinahIdx = -1;

      // Queue Hero Image
      if (packageData.heroImage instanceof File) {
        heroIdx = uploadTasks.length;
        uploadTasks.push(uploadSingleImage(packageData.heroImage, "package"));
      }

      // Queue Makkah Hotel Images
      const makkahFiles = packageData.makkahHotel.images.map((i) => i.file).filter(Boolean);
      if (makkahFiles.length > 0) {
        makkahIdx = uploadTasks.length;
        uploadTasks.push(uploadMultipleImages(makkahFiles, "hotel"));
      }

      // Queue Madinah Hotel Images
      const madinahFiles = packageData.madinahHotel.images.map((i) => i.file).filter(Boolean);
      if (madinahFiles.length > 0) {
        madinahIdx = uploadTasks.length;
        uploadTasks.push(uploadMultipleImages(madinahFiles, "hotel"));
      }

      // Execute all uploads simultaneously
      const uploadResults = await Promise.all(uploadTasks);

      // Extract newly generated image IDs
      const heroImageId = heroIdx !== -1 ? uploadResults[heroIdx].data.data._id : null;
      const makkahImageIds = makkahIdx !== -1 ? uploadResults[makkahIdx].data.data.map(img => img._id) : [];
      const madinahImageIds = madinahIdx !== -1 ? uploadResults[madinahIdx].data.data.map(img => img._id) : [];

      // 3. CONSTRUCT HOTEL DATA
      const makkahHotelData = packageData.makkahHotel.name
        ? {
            name: packageData.makkahHotel.name,
            starRating: starLabelToNumber(packageData.makkahHotel.star),
            distanceFromHaram: packageData.makkahHotel.distance,
            description: packageData.makkahHotel.description,
            images: makkahImageIds, // Pre-uploaded IDs
          }
        : undefined;

      const madinahHotelData = packageData.madinahHotel.name
        ? {
            name: packageData.madinahHotel.name,
            starRating: starLabelToNumber(packageData.madinahHotel.star),
            distanceFromHaram: packageData.madinahHotel.distance,
            description: packageData.madinahHotel.description,
            images: madinahImageIds, // Pre-uploaded IDs
          }
        : undefined;

      // 4. CONSTRUCT FINAL PACKAGE PAYLOAD
      const payload = {
        title: packageData.title,
        description: packageData.description,
        journeyType: packageData.journeyType,
        tier: packageData.tier,
        makkahNights: Number(packageData.makkahNights),
        madinahNights: Number(packageData.madinahNights),
        makkahHotelData,
        madinahHotelData,
        inclusions: inclusionsObj,
        pricing: {
          amount: Number(packageData.basePrice),
          currency: packageData.currency,
          sharingType: packageData.sharingType,
        },
        directFlights: packageData.directFlights,
        isFeatured: packageData.inclusions.includes("Featured"),
        heroImage: heroImageId, // Pre-uploaded Hero ID
      };

      // 5. CREATE PACKAGE
      await createPackage(payload);

      setSubmitSuccess(true);

      setTimeout(() => {
        setPackageData({
          tier: "budget",
          title: "",
          description: "",
          journeyType: "Umrah",
          makkahNights: 4,
          madinahNights: 3,
          makkahHotel: { name: "", star: "5 Star", distance: "", description: "", images: [] },
          madinahHotel: { name: "", star: "5 Star", distance: "", description: "", images: [] },
          inclusions: ["Umrah Visa", "Return Flights", "Hotel Accommodation"],
          basePrice: 100,
          currency: "GBP",
          sharingType: "Single",
          directFlights: false,
          heroImage: null,
        });
        setSubmitSuccess(false);
      }, 2500);
    } catch (err) {
      setSubmitError(err.response?.data?.message ?? "Failed to create package. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5">
          <h1 className="text-lg font-bold text-gray-900">Package Builder</h1>
          <p className="text-xs text-gray-500 mt-0.5">Architecting a spiritual journey of excellence.</p>
        </div>

        {submitError && (
          <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
            {submitError}
          </div>
        )}
        {submitSuccess && (
          <div className="mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700 flex items-center gap-2">
            <CheckCircle2 size={14} />
            Package created successfully!
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-5 items-start">
          <div className="flex flex-col gap-4 flex-1 min-w-0">

            {/* 1. Package Identity */}
            <SectionCard icon={FileText} title="Package Identity">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Package Title</label>
                  <Input
                    placeholder="e.g. Royal Ramadan Umrah Experience"
                    value={packageData.title}
                    onChange={(e) => updateData("title", e.target.value)}
                  />
                </div>

                <div>
                  <textarea
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none bg-white"
                    rows={4}
                    placeholder="Enter description..."
                    value={packageData.description}
                    onChange={(e) => updateData("description", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 block mb-2">Journey Type</label>
                  <div className="flex gap-2">
                    {["Umrah", "Hajj"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateData("journeyType", type)}
                        className={`px-5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                          packageData.journeyType === type
                            ? "bg-[#1a1a0e] text-white border-[#1a1a0e]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tier selector */}
                <div>
                  <label className="text-xs text-gray-600 block mb-2">Package Tier</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "budget",   label: "Budget",   icon: LayoutGrid },
                      { id: "value",    label: "Value",    icon: Star },
                      { id: "luxury",   label: "Luxury",   icon: Gem },
                      { id: "ramadan",  label: "Ramadan",  icon: Tent },
                      { id: "view",     label: "View",     icon: Eye },
                      { id: "december", label: "December", icon: Snowflake },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => updateData("tier", id)}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                          packageData.tier === id
                            ? "bg-[#1a1a0e] text-white border-[#1a1a0e]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <Icon size={12} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 2. Journey Breakdown */}
            <SectionCard icon={MapPin} title="Journey Breakdown">
              <div className="flex gap-4">
                <NightInput
                  label="Makkah Stay"
                  value={packageData.makkahNights}
                  onChange={(e) => updateData("makkahNights", e.target.value)}
                />
                <NightInput
                  label="Madinah Stay"
                  value={packageData.madinahNights}
                  onChange={(e) => updateData("madinahNights", e.target.value)}
                />
              </div>
            </SectionCard>

            {/* 3. Hotels */}
            <div className="flex flex-col sm:flex-row gap-4">
              <HotelCard
                title="Makkah Hotel"
                data={packageData.makkahHotel}
                onUpdate={(newHotel) => updateData("makkahHotel", newHotel)}
              />
              <HotelCard
                title="Madinah Hotel"
                data={packageData.madinahHotel}
                onUpdate={(newHotel) => updateData("madinahHotel", newHotel)}
              />
            </div>

            {/* 4. Package Inclusions */}
            <SectionCard icon={Package} title="Package Inclusions">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableInclusions.map((item) => {
                  const isFeatured = item === "Featured";
                  const isChecked = packageData.inclusions.includes(item);

                  if (isFeatured) {
                    return (
                      <label
                        key={item}
                        className={`flex items-center justify-between col-span-1 sm:col-span-2 p-3 mt-2 rounded-lg border-2 cursor-pointer transition-all ${
                          isChecked
                            ? "border-yellow-400 bg-yellow-50"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${isChecked ? "bg-yellow-400" : "bg-gray-200"}`}>
                            <Star size={16} className={isChecked ? "text-white" : "text-gray-400"} fill={isChecked ? "white" : "none"} />
                          </div>
                          <div>
                            <span className={`text-sm font-bold ${isChecked ? "text-yellow-800" : "text-gray-700"}`}>
                              Feature this Package
                            </span>
                            <p className="text-[10px] text-gray-500 mt-0.5">
                              Highlight this package prominently on the main homepage
                            </p>
                          </div>
                        </div>
                        
                        {/* Hidden input to maintain form control style */}
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleInclusionToggle(item)}
                          className="hidden"
                        />
                        
                        {/* Custom Switch UI */}
                        <div
                          className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                            isChecked ? "bg-yellow-400 justify-end" : "bg-gray-300 justify-start"
                          }`}
                        >
                          <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                      </label>
                    );
                  }

                  return (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleInclusionToggle(item)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      {item}
                    </label>
                  );
                })}
              </div>
            </SectionCard>

            {/* 5. Pricing & Flights */}
            <SectionCard icon={DollarSign} title="Pricing & Flights">
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Base Price (pp)</label>
                  <div className="flex items-center border border-gray-200 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-blue-400">
                    <input
                      type="number"
                      value={packageData.basePrice}
                      onChange={(e) => updateData("basePrice", e.target.value)}
                      className="w-24 px-2 py-2 text-xs text-gray-800 focus:outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600 block mb-1">Currency</label>
                  <Select
                    className="w-20"
                    value={packageData.currency}
                    onChange={(e) => updateData("currency", e.target.value)}
                  >
                    <option value="GBP">GBP</option>
                    <option value="PKR">PKR</option>
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-gray-600 block mb-1">Sharing Type</label>
                  <Select
                    className="w-28"
                    value={packageData.sharingType}
                    onChange={(e) => updateData("sharingType", e.target.value)}
                  >
                    <option>Single</option>
                    <option>Double</option>
                    <option>Triple</option>
                    <option>Quad</option>
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-gray-600 block mb-1">Direct Flights</label>
                  <div
                    onClick={() => updateData("directFlights", !packageData.directFlights)}
                    className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${
                      packageData.directFlights ? "bg-blue-500 justify-end" : "bg-gray-300 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 6. Visual Gallery */}
            <SectionCard icon={ImageIcon} title="Visual Gallery">
              <p className="text-xs text-gray-500 mb-2 font-medium">MAIN HERO IMAGE</p>

              <div
                onClick={() => document.getElementById("hero-upload").click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-8 gap-2 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors bg-white"
              >
                <div className="p-2 bg-gray-100 rounded-full">
                  <Upload size={20} className="text-gray-500" />
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  {packageData.heroImage
                    ? packageData.heroImage.name
                    : "Drag & Drop or Click to Upload"}
                </span>

                <input
                  id="hero-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                />
              </div>

              {packageData.heroImage && (
                <div className="mt-4 flex justify-center">
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm inline-block group">
                    <img
                      src={URL.createObjectURL(packageData.heroImage)}
                      alt="Hero preview"
                      className="w-48 h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => updateData("heroImage", null)}
                        className="bg-white/20 hover:bg-white/40 text-white font-medium text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </SectionCard>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !packageData.title || !packageData.description}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-[#c9a84c] hover:bg-[#b8963e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? "Creating Package…" : "Create Package"}
            </button>
          </div>

          {/* Right column — Sidebar */}
          <div className="lg:w-[320px] xl:w-[340px] shrink-0 w-full">
            <div className="sticky top-6">
              <PackageSummary data={packageData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}