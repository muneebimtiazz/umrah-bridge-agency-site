import cloudinary from "../../config/cloudinary.config.js";
import Image from "./image.model.js";

//
// SINGLE UPLOAD
//
export const uploadSingle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "mern/single",
      format: "avif",
      quality: "auto",
      fetch_format: "auto",
    });

    const image = await Image.create({
      url: result.secure_url,
      public_id: result.public_id,
    });

    return res.status(200).json({
      message: "Uploaded successfully",
      image,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Upload failed",
      error: err.message,
    });
  }
};

//
// MULTIPLE UPLOAD (FAST PARALLEL)
//
export const uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = req.files.map((file) =>
      cloudinary.v2.uploader.upload(file.path, {
        folder: "mern/multiple",
        format: "avif",
        quality: "auto",
        fetch_format: "auto",
      })
    );

    const results = await Promise.all(uploadPromises);

    const images = await Image.insertMany(
      results.map((r) => ({
        url: r.secure_url,
        public_id: r.public_id,
      }))
    );

    return res.status(200).json({
      message: "Multiple upload successful",
      images,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Multiple upload failed",
      error: err.message,
    });
  }
};

//
// DELETE IMAGE (CLEAN CLOUD + DB)
//
export const deleteImage = async (req, res) => {
  try {
    const { public_id, id } = req.body;

    if (!public_id) {
      return res.status(400).json({ message: "public_id required" });
    }

    await cloudinary.v2.uploader.destroy(public_id);

    if (id) {
      await Image.findByIdAndDelete(id);
    }

    return res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Delete failed",
      error: err.message,
    });
  }
};