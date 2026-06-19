import api from "../config/axios";

// GET /hotels
export const getAllHotels = (params = {}) =>
  api.get("/hotels", { params });

// GET /hotels/:id
export const getHotelById = (id) =>
  api.get(`/hotels/${id}`);

// POST /hotels
export const createHotel = (data) =>
  api.post("/hotels", data);

// PATCH /hotels/:id
export const updateHotel = (id, data) =>
  api.patch(`/hotels/${id}`, data);

// DELETE /hotels/:id  (soft delete — sets isActive: false)
export const deleteHotel = (id) =>
  api.delete(`/hotels/${id}`);