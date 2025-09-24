import axios from "axios";
import { getToken } from "./authApi";
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

export const fetchCourses = async () => {
  const res = await axios.get(`${API_BASE}/courses/`);
  return res.data;
};

export const fetchCourseById = async (id) => {
  const res = await axios.get(`${API_BASE}/courses/${id}/`);
  return res.data;
};

export const enrollCourse = async (courseId) => {
  const token = getToken();
  return await axios.post(`${API_BASE}/courses/${courseId}/enroll/`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);
};
