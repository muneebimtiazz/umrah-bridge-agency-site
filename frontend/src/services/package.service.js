import api from "../config/axios";

// GET /packages
export const getAllPackages = (params = {}) =>
  api.get("/packages", { params });

// GET /packages/:id
export const getPackageById = (id) =>
  api.get(`/packages/${id}`);

// POST /packages
export const createPackage = (data) =>
  api.post("/packages", data);

// PATCH /packages/:id
export const updatePackage = (id, data) =>
  api.patch(`/packages/${id}`, data);

// DELETE /packages/:id  (soft delete)
export const deletePackage = (id) =>
  api.delete(`/packages/${id}`);

