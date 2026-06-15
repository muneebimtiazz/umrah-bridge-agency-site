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
  // Star,
  Gem
} from "lucide-react";


const tiers = [
  { id: "budget",  label: "Budget / Essential", icon: LayoutGrid },
  { id: "value",   label: "Value Balanced",      icon: Star },
  { id: "luxury",  label: "Premium Luxury",      icon: Gem },
  { id: "ramadan",  label: "Ramadan",      icon: Tent },
];


// ─── Package Summary Sidebar ─────────────────────────────────────────────────
function PackageSummary() {

  return (
    <div className="bg-[#1a1a0e] rounded-xl overflow-hidden text-white w-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <Star size={14} className="text-yellow-400" fill="#facc15" />
        <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wide">
          Package Summary
        </span>
      </div>

      {/* Preview label */}
      <div className="px-4 pb-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
          Package Preview
        </p>
        <h3 className="text-base font-bold leading-snug mt-0.5">
          Royal Ramadan<br />Umrah Experience
        </h3>
      </div>

      {/* Duration & includes */}
      <div className="px-4 py-3 flex flex-col gap-2.5 mt-1">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-yellow-400/20 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin size={13} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Duration Breakdown</p>
            <p className="text-xs font-semibold leading-snug">
              4 Nights Makkah + 3<br />Nights Madinah
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-yellow-400/20 flex items-center justify-center shrink-0 mt-0.5">
            <Package size={13} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Includes</p>
            <p className="text-xs font-semibold leading-snug">
              Flights + Visa + Transfers<br />+ Hotel
            </p>
          </div>
        </div>
      </div>

      {/* Price block */}
      <div className="mx-3 mb-3 rounded-lg bg-[#2a2a12] px-4 py-3 flex items-end justify-between">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Starting from</p>
          <p className="text-2xl font-bold text-yellow-400">$4,500</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 line-through">per person</p>
          <span className="text-[10px] bg-yellow-400 text-black font-bold px-2 py-0.5 rounded">
            Triple Sharing
          </span>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="border-t border-white/10 px-4 py-3 flex items-start gap-2">
        <Star size={12} className="text-yellow-400 mt-0.5 shrink-0" fill="#facc15" />
        <div>
          <p className="text-[10px] font-bold text-yellow-400 mb-0.5">Pro Tip</p>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            High-quality images of the Makkah hotel lobby increase conversion rates by up to 40%. A photo of each row view of the Madinah skyline is also very much included.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={15} className="text-gray-500" />
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
function Input({ placeholder, className = "" }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`w-full border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white ${className}`}
    />
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
function Select({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select className="appearance-none w-full border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 pr-7">
        {children}
      </select>
      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
function Textarea({ placeholder }) {
  return (
    <textarea
      placeholder={placeholder}
      rows={3}
      className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none bg-white"
    />
  );
}

// ─── NightInput ───────────────────────────────────────────────────────────────
function NightInput({ label, defaultVal }) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-1 mb-2">
        <MapPin size={12} className="text-gray-400" />
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
        <input
          type="number"
          defaultValue={defaultVal}
          className="w-12 text-center text-sm font-semibold text-gray-800 py-2 border-none focus:outline-none bg-white"
        />
        <span className="text-xs text-gray-400 px-2 bg-gray-50 h-full flex items-center py-2 border-l border-gray-200">
          Nights
        </span>
      </div>
    </div>
  );
}

function HotelCard({ title }) {
  const [hotel, setHotel] = useState({
    name: "",
    star: "5 Star",
    distance: "",
    description: "",
    images: [],
  });

  const handleChange = (key, value) => {
    setHotel((prev) => ({ ...prev, [key]: value }));
  };

  // ADD IMAGE
  const handleAddImages = (files) => {
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(2, 9),
    }));

    setHotel((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  // REMOVE IMAGE
  const handleRemoveImage = (id) => {
    setHotel((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  return (
    <div className="flex-1 border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-700">{title}</span>
        <Building2 size={14} className="text-gray-400" />
      </div>

      {/* FORM */}
      <div className="flex flex-col gap-2.5">
        <Input
          placeholder="Hotel Name"
          value={hotel.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <div className="flex gap-2">
          <select
            className="flex-1 rounded px-2 py-1 text-sm border border-gray-200"
            value={hotel.star}
            onChange={(e) => handleChange("star", e.target.value)}
          >
            <option>5 Star</option>
            <option>4 Star</option>
            <option>3 Star</option>
          </select>

          <Input
            placeholder="Distance (e.g. 50)"
            className="flex-1"
            value={hotel.distance}
            onChange={(e) => handleChange("distance", e.target.value)}
          />
        </div>

        <textarea
          className="border rounded p-2 text-sm border-gray-200"
          placeholder="Hotel Description"
          value={hotel.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* UPLOAD */}
      <div
        onClick={() =>
          document.getElementById(`hotel-upload-${title}`).click()
        }
        className="mt-3 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-4 gap-1 bg-gray-50 cursor-pointer"
      >
        <Upload size={16} className="text-gray-400" />
        <span className="text-[10px] text-gray-400">
          Click or Drop Images
        </span>

        <input
          id={`hotel-upload-${title}`}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleAddImages(e.target.files)}
        />
      </div>

      {/* GRID PREVIEW */}
      {hotel.images.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {hotel.images.map((img) => (
            <div
              key={img.id}
              className="relative group border rounded overflow-hidden"
            >
              <img
                src={img.preview}
                className="w-full h-20 object-cover"
                alt=""
              />

              {/* REMOVE BUTTON */}
              <button
                onClick={() => handleRemoveImage(img.id)}
                className="absolute top-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition"
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
  const [selectedTier, setSelectedTier] = useState("budget");
  const [journeyType, setJourneyType] = useState("Umrah");
    const [directFlights, setDirectFlights] = useState(false);  
    const [heroImage, setHeroImage] = useState(null);

const handleFileChange = (file) => {
  if (!file) return;
  setHeroImage(file);
};

const handleDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files?.[0];
  handleFileChange(file);
};

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Page title */}
        <div className="mb-5">
          <h1 className="text-lg font-bold text-gray-900">Package Builder</h1>
          <p className="text-xs text-gray-500 mt-0.5">Architecting a spiritual journey of excellence.</p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-4 flex-1 min-w-0">

            {/* 1. Package Identity */}
            <SectionCard icon={FileText} title="Package Identity">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">
                    Package Title
                  </label>
                  <Input placeholder="e.g. Royal Ramadan Umrah Experience" />
                </div>

                <div>
                  <textarea
                    className="w-full rounded p-2 text-sm text-gray-600 border border-gray-200"
                    rows={4}
                    placeholder="Enter description..."
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 block mb-2">
                    Journey Type
                  </label>

                  <div className="flex gap-2">
                    {["Umrah", "Hajj"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setJourneyType(type)}
                        className={`px-5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                          journeyType === type
                            ? "bg-[#1a1a0e] text-white border-[#1a1a0e]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 2. Journey Breakdown */}
            <SectionCard icon={MapPin} title="Journey Breakdown">
              <div className="flex gap-4">
                <NightInput label="Makkah Stay" defaultVal={4} />
                <NightInput label="Madinah Stay" defaultVal={3} />
              </div>
            </SectionCard>

            {/* 3. Hotels */}
            <div className="flex flex-col sm:flex-row gap-4">
              <HotelCard title="Makkah Hotel" />
              <HotelCard title="Madinah Hotel" />
            </div>

        <SectionCard icon={Package} title="Package Inclusions">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Umrah Visa",
              "Return Flights",
              "Hotel Accommodation",
              "Airport Transfers",
              "Ground Transport",
              "Ziyarat Tours",
              "Full-Board Meals",
              "Featured",
            ].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />
                {item}
              </label>
            ))}
          </div>
        </SectionCard>

            {/* 5. Pricing & Flights */}
            <SectionCard icon={DollarSign} title="Pricing & Flights">
              <div className="flex flex-wrap items-end gap-3">
                {/* Base Price */}
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Base Price (pp)</label>
                  <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                    <input
                      type="text"
                      defaultValue="4500"
                      className="w-16 px-2 py-2 text-xs text-gray-800 focus:outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Currency */}
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Currency</label>
                  <Select className="w-20">
                    <option>GBP</option>
                    <option>PKR</option>
                  </Select>
                </div>

                {/* Sharing Type */}
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Sharing Type</label>
                  <Select className="w-28">
                    <option>Single</option>
                    <option>Double</option>
                    <option>Triple</option>
                    <option>Quad</option>
                  </Select>
                </div>

                {/* Direct Flights toggle */}
<div>
  <label className="text-xs text-gray-600 block mb-1">
    Direct Flights
  </label>

  <div
    onClick={() => setDirectFlights(!directFlights)}
    className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${
      directFlights ? "bg-blue-500 justify-end" : "bg-gray-300 justify-start"
    }`}
  >
    <div className="w-4 h-4 bg-white rounded-full shadow" />
  </div>
</div>
              </div>
            </SectionCard>

{/* 6. Visual Gallery */}
<SectionCard icon={ImageIcon} title="Visual Gallery">
  <p className="text-xs text-gray-500 mb-2">MAIN HERO IMAGE</p>

  <div
    onClick={() => document.getElementById("hero-upload").click()}
    onDragOver={(e) => e.preventDefault()}
    onDrop={handleDrop}
    className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-8 gap-2 cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
  >
    <Upload size={20} className="text-gray-400" />
    <span className="text-xs text-gray-400">
      {heroImage ? heroImage.name : "Drag & Drop or Click to Upload"}
    </span>

    <input
      id="hero-upload"
      type="file"
      className="hidden"
      accept="image/*"
      onChange={(e) => handleFileChange(e.target.files?.[0])}
    />
  </div>
</SectionCard>

          </div>

          {/* ── Right column — Sidebar ── */}
         <div className="lg:w-[320px] xl:w-90 shrink-0 w-full">
            <div className="sticky top-6">
              <PackageSummary />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}