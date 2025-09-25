// centralized API base for production & localhost
export const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";
export const MEDIA_BASE = process.env.REACT_APP_API_BASE_URL?.replace('/api','') || "http://127.0.0.1:8000";
