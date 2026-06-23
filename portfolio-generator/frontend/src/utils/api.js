import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Portfolio API calls
export const portfolioAPI = {
  create: (data) => api.post("/portfolio", data),
  getByUsername: (username) => api.get(`/portfolio/${username}`),
  update: (username, data) => api.put(`/portfolio/${username}`, data),
  delete: (username) => api.delete(`/portfolio/${username}`),
  checkUsername: (username) => api.get(`/portfolio/check/${username}`),
  getAll: (page = 1, limit = 12) => api.get(`/portfolio?page=${page}&limit=${limit}`),
};

export default api;
