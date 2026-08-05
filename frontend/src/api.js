import axios from 'axios'

// Set VITE_API_URL in a .env file for production (e.g. VITE_API_URL=https://your-backend.onrender.com)
// Falls back to localhost for local development.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 15000,
})

// Automatically attach the login token (if present) to every outgoing request.
// Protected endpoints (like /predictions/save) need this; public ones just ignore the header.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cp_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
