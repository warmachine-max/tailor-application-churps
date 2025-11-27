// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // Fetch logged-in user from backend
  // -------------------------------
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/user", {
        withCredentials: true,
      });

      const payload = res.data?.user ?? res.data ?? null;
      console.log("Fetched user:", payload);

      if (payload) {
        const normalized = {
          _id: payload._id || payload.id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
          cart: payload.cart || [],   // 🔥 important: include cart
        };

        setUser(normalized);
        return normalized;
      } else {
        setUser(null);
        return null;
      }
    } catch (err) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // For login/signup to trigger re-fetch
  const refetchUser = async () => {
    setLoading(true);
    const u = await fetchUser();
    setLoading(false);
    return u;
  };

  // -------------------------------
  // refreshUser → used after Add to Cart
  // -------------------------------
  const refreshUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/user", {
        withCredentials: true,
      });

      const payload = res.data?.user ?? res.data ?? null;

      if (payload) {
        setUser({
          _id: payload._id || payload.id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
          cart: payload.cart || [],   // 🔥 refresh cart here
        });
      }
    } catch (err) {
      console.log("Failed to refresh user:", err);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        refetchUser,
        refreshUser,   // 🔥 exporting refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
