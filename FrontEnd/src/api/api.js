// src/api/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const checkTokenExpiration = () => {
  const expiresAt = localStorage.getItem("expiresAt");
  if (!expiresAt) return false;

  const now = new Date();
  const expiryDate = new Date(expiresAt);
  if (now >= expiryDate) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    window.location.href = "/login";
    return true;
  }
  return false;
};

const request = async (endpoint, options = {}, isFormData = false) => {
  if (checkTokenExpiration()) return;

  const token = localStorage.getItem("token");

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(!isFormData && { "Content-Type": "application/json" }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const currentPath = window.location.pathname;

    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");

    if (currentPath !== "/login") {
      window.history.pushState({}, "", "/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }

    return;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = data?.Error || data?.message || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }

  return data;
};

// JSON Requests
const get = (endpoint) => request(endpoint);
const postJson = (endpoint, data) =>
  request(endpoint, { method: "POST", body: JSON.stringify(data) });
const putJson = (endpoint, data) =>
  request(endpoint, { method: "PUT", body: JSON.stringify(data) });
const del = (endpoint) => request(endpoint, { method: "DELETE" });

// FormData Requests
const postForm = (endpoint, data) =>
  request(endpoint, { method: "POST", body: data }, true);
const putForm = (endpoint, data) =>
  request(endpoint, { method: "PUT", body: data }, true);

export const API = {
  // Admin
  loginAdmin: (data) => postJson("/api/Admin/login", data),
  createAdminPost: (data) => postForm("/api/Admin/create", data),
  editAdminPost: (id, data) => putForm(`/api/Admin/edit/${id}`, data),
  deleteAdminPost: (id) => del(`/api/Admin/delete/${id}`),

  // Change Password
  changeAdminPassword: (data) => postJson("/api/Admin/change-password", data),

  // Posts
  getPosts: () => get("/api/Posts"),
  getPostById: (id) => get(`/api/Posts/${id}`),

  // News
  getNews: () => get("/api/News"),
  createNews: (data) => postJson("/api/News/create", data),
  editNews: (id, data) => putJson(`/api/News/edit/${id}`, data),
  deleteNews: (id) => del(`/api/News/delete/${id}`),
};
