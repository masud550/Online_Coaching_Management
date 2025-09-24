const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

// ================== Media API ==================
export const fetchMediaPersons = async () => {
  const res = await fetch(`${API_BASE}/media-persons/`);
  return res.json();
};

// ================== Gallery API ==================
export const fetchGalleryItems = async () => {
  const res = await fetch(`${API_BASE}/gallery-items/`);
  return res.json();
};
