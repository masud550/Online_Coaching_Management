import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

export const fetchExperts = async () => {
  const response = await axios.get(`${API_BASE}/experts/`);
  return response.data;
};

export const fetchExpertDetail = async (id) => {
  const response = await axios.get(`${API_BASE}/experts/${id}/`);
  return response.data;
};
