// src/api/homeApi.js
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

export const fetchHeadlines = async () => {
  const res = await fetch(`${API_BASE}/home/headlines/`);
  return res.json();
};

export const fetchBanners = async () => {
  const res = await fetch(`${API_BASE}/home/banners/`);
  return res.json();
};

export const fetchMarketplaces = async () => {
  const res = await fetch(`${API_BASE}/home/marketplaces/`);
  return res.json();
};

export const fetchClients = async () => {
  const res = await fetch(`${API_BASE}/home/clients/`);
  return res.json();
};
