import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    star: {
      type: String,
      enum: ["3 Star", "4 Star", "5 Star"],
      default: "5 Star",
    },

    distance: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);