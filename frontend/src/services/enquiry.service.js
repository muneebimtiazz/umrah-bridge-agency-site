import api from "../config/axios";

// POST /inquiries
export const createInquiry = (data) =>
  api.post("/inquiries", data);

// GET /inquiries
export const getAllInquiries = (params = {}) =>
  api.get("/inquiries", { params });

// GET /inquiries/:id
export const getInquiryById = (id) =>
  api.get(`/inquiries/${id}`);

// PATCH /inquiries/:id/status
export const updateInquiryStatus = (id, status, adminNotes) =>
  api.patch(`/inquiries/${id}/status`, { status, adminNotes });

// DELETE /inquiries/:id
export const deleteInquiry = (id) =>
  api.delete(`/inquiries/${id}`);