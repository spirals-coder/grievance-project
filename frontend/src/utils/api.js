import axios from 'axios';

// ✅ IMPORTANT: include /api in baseURL
const API = axios.create({
  baseURL: 'https://grievance-project-1-axzk.onrender.com/api',
});

// 🔐 Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('gms_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================= AUTH =================

// ✅ Register
export const registerStudent = (data) => API.post('/register', data);

// ✅ Login
export const loginStudent = (data) => API.post('/login', data);


// ================= GRIEVANCES =================

// ✅ Submit grievance
export const submitGrievance = (data) => API.post('/grievances', data);

// ✅ Get all grievances
export const getAllGrievances = () => API.get('/grievances');

// ✅ Get by ID
export const getGrievanceById = (id) => API.get(`/grievances/${id}`);

// ✅ Update
export const updateGrievance = (id, data) =>
  API.put(`/grievances/${id}`, data);

// ✅ Delete
export const deleteGrievance = (id) =>
  API.delete(`/grievances/${id}`);

// ✅ Search
export const searchGrievances = (title) =>
  API.get(`/grievances/search?title=${title}`);

export default API;