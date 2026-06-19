import api from "../config/axios";

// POST /images/single  (multipart/form-data, field: "image")
export const uploadSingleImage = (file, entityType = "gallery", entityId = null) => {
  const formData = new FormData();
  formData.append("image", file);
  if (entityType) formData.append("entityType", entityType);
  if (entityId)   formData.append("entityId", entityId);
  return api.post("/images/single", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// POST /images/multiple  (multipart/form-data, field: "images", max 10)
export const uploadMultipleImages = (files, entityType = "gallery", entityId = null) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));
  if (entityType) formData.append("entityType", entityType);
  if (entityId)   formData.append("entityId", entityId);
  return api.post("/images/multiple", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// GET /images
export const getImages = (params = {}) =>
  api.get("/images", { params });

// DELETE /images/delete  body: { publicId, id? }
export const deleteImage = (publicId, id = null) =>
  api.delete("/images/delete", { data: { publicId, id } });