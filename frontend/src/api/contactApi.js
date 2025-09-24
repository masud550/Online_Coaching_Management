// src/api/contactApi.js
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

export const sendContactMessage = async (formData) => {
  const response = await fetch(`${API_BASE}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error('Message sending failed');
  return await response.json();
};
