// // src/api.js
// import axios from "axios";

// const api = axios.create({
//   // ** IMPORTANT: Ensure this matches your backend server URL and port **
//   baseURL: "http://localhost:5000/api", 
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor to attach JWT token for protected routes
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       // Assuming your backend expects 'Bearer <token>'
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Example API functions
// export const fetchClubs = async (filters = {}) => {
//   const params = new URLSearchParams(filters).toString();
//   const res = await api.get(`/clubs?${params}`);
//   return res.data;
// };
// //

// export const joinClub = async (clubId, idToken) => {
//   const res = await apiClient.post(`/clubs/${clubId}/join`, {}, { headers: { Authorization: `Bearer ${idToken}` } });
//   return res.data;
// };

// export default api;



// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",  // Correct backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------
// Club Fetch API
// ----------------------
export const fetchClubs = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await api.get(`/clubs?${params}`);
  return res.data;
};

// ----------------------
// Join Club API
// ----------------------
export const joinClub = async (clubId) => {
  const res = await api.post(`/clubs/${clubId}/join`);
  return res.data;
};

export default api;
