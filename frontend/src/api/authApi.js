// src/api/authApi.js
export const saveTokens = (access, refresh, remember = false) => {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("token", access);
  if (refresh) storage.setItem("refreshToken", refresh);
};

export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refreshToken");
};

const API_BASE = process.env.REACT_APP_API_BASE_URL;

// Register
export const registerUser = async (userData) => {
  const payload = { ...userData };
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
  if (!res.ok)
    throw new Error(
      data.error ? JSON.stringify(data.error) : "Registration failed"
    );
  return data;
};

// Login
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

// Get profile
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
