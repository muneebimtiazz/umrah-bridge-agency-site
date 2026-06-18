// src/services/auth.service.js
//
// All auth-related API calls live here.
// auth-context.jsx imports and calls these — nothing else should call the API directly.

import api from "../config/axios";

// ───────────────────────────────────────────
// POST /auth/login
// Returns: { message, user: { id, firstName, lastName, email, role } }
// Sets HttpOnly AccessToken + RefreshToken cookies on the response.
// ───────────────────────────────────────────
export const loginRequest = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { message, user }
};

// ───────────────────────────────────────────
// POST /auth/logout
// Clears both auth cookies server-side.
// ───────────────────────────────────────────
export const logoutRequest = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

// ───────────────────────────────────────────
// GET /auth/me  (requires valid AccessToken cookie)
// Returns: { user: { _id, firstName, lastName, email, role, ... } }
// Used by Login (skip-form check) and ProtectedRoute (session guard).
// ───────────────────────────────────────────
export const getMeRequest = async () => {
  const res = await api.get("/auth/me");
  return res.data; // { user }
};

// ───────────────────────────────────────────
// POST /auth/refresh  (requires valid RefreshToken cookie)
// Rotates the AccessToken cookie.
// Called automatically by the axios interceptor — not needed here directly,
// but exported in case you want to call it manually in the future.
// ───────────────────────────────────────────
export const refreshRequest = async () => {
  const res = await api.post("/auth/refresh");
  return res.data;
};