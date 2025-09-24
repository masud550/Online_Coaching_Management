import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// Fetch all courses
export const fetchCourses = async () => {
  const res = await axiosInstance.get("/courses/");
  return res.data;
};

// Fetch a single course by ID
export const fetchCourseById = async (id) => {
  const res = await axiosInstance.get(`/courses/${id}/`);
  return res.data;
};

// Enroll in a course
export const enrollCourse = async (courseId, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await axiosInstance.post(`/courses/${courseId}/enroll/`, {}, { headers });
  return res.data;
};
