import React from "react";
import { Link } from "react-router-dom";
import {
  Hotel,
  Plane,
  UtensilsCrossed,
  MessageCircle,
  Star,
} from "lucide-react";

const amenityIcons = {
  "5-Star": <Hotel className="w-3.5 h-3.5" />,
  "3-Star": <Hotel className="w-3.5 h-3.5" />,
  Economy: <Plane className="w-3.5 h-3.5" />,
  Direct: <Plane className="w-3.5 h-3.5" />,
  Catering: <UtensilsCrossed className="w-3.5 h-3.5" />,
};

export function PackageCard({
  id,
  _id,
  title,
  heroImage,
  makkahNights = 0,
  madinahNights = 0,
  makkahHotel,
  madinahHotel,
  tier,
  pricing,
  inclusions,
  directFlights,
  isFeatured, // Extracted directly from top-level props
}) {
  // Accept either "id" or the raw Mongo "_id" field
  const packageId = id || _id;

  const totalDays = makkahNights + madinahNights;

  const price = pricing?.amount || 0;
  const currencySymbol =
    pricing?.currency === "GBP"
      ? "£"
      : pricing?.currency === "EUR"
      ? "€"
      : "$";

  // Safely extract the image URL from the populated Cloudinary object
  const imageUrl = heroImage?.url || "https://placehold.co/600x400/1a1a0e/ffffff?text=No+Image";

  // Safely extract the hotel name from the populated Hotel objects
  const stays = [
    makkahNights
      ? { city: "Makkah", hotel: makkahHotel?.name || "Hotel TBD" }
      : null,
    madinahNights
      ? { city: "Madinah", hotel: madinahHotel?.name || "Hotel TBD" }
      : null,
  ].filter(Boolean);

  // amenities derived from dataset
  const amenities = [];
  if (tier === "luxury") amenities.push("5-Star");
  else amenities.push("3-Star");

  if (directFlights) amenities.push("Direct");
  else if (inclusions?.flights) amenities.push("Economy");

  if (inclusions?.meals) amenities.push("Catering");

  return (
    <div className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-200 h-full relative">

      {/* FEATURED STAR */}
      {isFeatured && (
        <div className="absolute top-0 right-4 w-8 h-10.5 z-20 bg-[#C9A84C] rounded-b-md flex items-center justify-center shadow-md">
          <Star className="w-4 h-4 text-white fill-white" />
        </div>
      )}

      {/* IMAGE */}
      <div className="relative h-50 overflow-hidden bg-gray-900">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-white text-[17px] font-bold line-clamp-2 leading-tight">{title}</h3>

          <div className="flex gap-2 mt-2 flex-wrap">
            {amenities.map((a) => (
              <div
                key={a}
                className="text-white bg-white/20 p-1.5 rounded"
                title={a} // Added title tooltip for better UX
              >
                {amenityIcons[a]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BODY - STAYS */}
      <div className="p-4 flex-1">
        <ul className="space-y-2.5">
          {stays.map((stay, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-[12px] text-gray-600"
            >
              <span className="w-1.5 h-1.5 rounded bg-[#C9A84C]" />
              <span className="font-bold text-gray-900 min-w-17.5">
                {stay.city}:
              </span>
              <span className="truncate" title={stay.hotel}>{stay.hotel}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* FOOTER */}
      <div className="p-4 bg-gray-50 flex justify-between items-end">
        <div>
          <div className="text-[10px] font-bold bg-[#C9A84C]/20 text-[#8a722f] px-2 py-0.5 w-fit rounded">
            {totalDays} Days
          </div>

          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-[10px] text-gray-500">From</span>
            <span className="text-[20px] font-black text-gray-900">
              {currencySymbol}
              {price.toLocaleString()}
            </span>
            <span className="text-[10px] text-gray-500">PP</span>
          </div>
        </div>

        {/* Routes to the package detail page (GET /packages/:id) */}
        <Link
          to={packageId ? `/umrah/${packageId}` : "#"}
          className="bg-[#C9A84C] text-[#051A14] text-[11px] font-bold px-4 py-2 rounded hover:bg-[#b8963e] transition-colors"
        >
          View Deal
        </Link>
      </div>

      {/* WHATSAPP */}
<div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300">
  <div className="overflow-hidden">
    <a
      href="https://wa.me/447445274723"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full mt-3 bg-[#25D366] text-white font-bold text-[11px] py-2.5 flex items-center justify-center gap-2 hover:bg-[#1ebd5a] transition-colors"
    >
      <MessageCircle className="w-4 h-4" />
      WhatsApp Expert
    </a>
  </div>
</div>
    </div>
  );
}