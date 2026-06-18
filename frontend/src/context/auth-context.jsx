// src/context/auth-context.jsx
import { createContext, useContext, useState } from "react";
import api from "../config/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // ===== CHECK CURRENT SESSION =====
  // NOT called automatically on mount — only called explicitly by:
  //   • Login.jsx  (on mount, to redirect already-authenticated admins)
  //   • ProtectedRoute.jsx  (on mount, to verify a session before showing admin pages)
  // This keeps every public page completely free of auth network calls.
  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
      return res.data.user;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  // ===== LOGIN =====
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
    setAuthChecked(true);
    return res.data;
  };

  // ===== LOGOUT =====
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
      setAuthChecked(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        authChecked,
        checkAuth,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);