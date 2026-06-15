import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true, index: true },

    // link system
    entityType: {
      type: String,
      enum: ["hotel", "package", "hero", "gallery"],
      default: "gallery",
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);