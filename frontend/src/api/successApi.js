const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

export const fetchSuccessStories = async () => {
  const res = await fetch(`${API_BASE.replace(/\/api\/?$/, '')}/api/success/stories/`); 
  if (!res.ok) throw new Error("Failed to fetch success stories");
  return res.json();
};
export const fetchSuccessDetail = async (id) => {
  const res = await fetch(`${API_BASE.replace(/\/api\/?$/, '')}/api/success/stories/${id}/`);
  if (!res.ok) throw new Error("Failed to fetch success story detail");
  return res.json();
};