// src/api/authApi.js
import { API_BASE } from "./config";

// ===================== Token Management =====================
export const saveTokens = (access, refresh, remember = false) => {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("token", access);
  if (refresh) storage.setItem("refreshToken", refresh);

  window.dispatchEvent(new Event("storage"));
};

export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refreshToken");

  // 🔥 Notify other components that logout happened
  window.dispatchEvent(new Event("storage"));
};

// ===================== Register User =====================
export const registerUser = async (userData) => {
  const payload = { ...userData };

  // Backward compatibility for roll_number → student_id
  if (payload.role === "student" && payload.roll_number) {
    payload.student_id = payload.roll_number;
    delete payload.roll_number;
  }

  const res = await fetch(`${API_BASE}/users/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");
  return data;
};

// ===================== Login User =====================
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
};

// ===================== Get Logged-in User =====================
export const getMe = async (token) => {
  if (!token) throw new Error("No token provided");

  const res = await fetch(`${API_BASE}/users/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to fetch profile");
  return data;
};
