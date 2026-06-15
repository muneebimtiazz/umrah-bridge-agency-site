import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    /* ───── BASIC INFO ───── */
    title: { type: String, required: true },
    description: { type: String, required: true },

    journeyType: {
      type: String,
      enum: ["Umrah", "Hajj"],
      default: "Umrah",
    },

    tier: {
      type: String,
      enum: ["budget", "value", "luxury", "ramadan"],
      default: "budget",
    },

    /* ───── DURATION ───── */
    makkahNights: { type: Number, default: 4 },
    madinahNights: { type: Number, default: 3 },

    /* ───── HOTELS (linked entities) ───── */
    makkahHotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    madinahHotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    /* ───── INCLUSIONS (from your checkboxes) ───── */
    inclusions: {
      visa: { type: Boolean, default: true },
      flights: { type: Boolean, default: true },
      hotelAccommodation: { type: Boolean, default: true },
      airportTransfers: { type: Boolean, default: true },
      groundTransport: { type: Boolean, default: false },
      ziyaratTours: { type: Boolean, default: false },
      meals: { type: Boolean, default: false },
      featured: { type: Boolean, default: false },
    },

    /* ───── PRICING ───── */
    pricing: {
      amount: { type: Number, required: true },

      currency: {
        type: String,
        enum: ["GBP", "PKR"],
        default: "GBP",
      },

      sharingType: {
        type: String,
        enum: ["Single", "Double", "Triple", "Quad"],
        default: "Triple",
      },
    },

    /* ───── FLIGHTS ───── */
    directFlights: {
      type: Boolean,
      default: false,
    },

    /* ───── HERO IMAGE ───── */
    heroImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },

    /* ───── STATUS ───── */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Package", packageSchema);