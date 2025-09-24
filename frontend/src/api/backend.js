// src/api/backend.js

import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

export async function fetchBackendMessage() {
  const response = await fetch(`${API_BASE}/`);
  const data = await response.json();
  return data;
}

export const enrollCourse = async (courseId, token) => {
  return await axios.post(
    `${API_BASE}/courses/${courseId}/enroll/`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

