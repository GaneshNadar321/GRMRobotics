import axios from 'axios';

// Use environment variable or fallback to localhost for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // Try to get token from Zustand store first, then fallback to localStorage
    let token = null;
    try {
      const authStore = JSON.parse(localStorage.getItem('auth-storage') || '{}');
      token = authStore.state?.accessToken || localStorage.getItem('accessToken');
    } catch {
      token = localStorage.getItem('accessToken');
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (typeof window !== 'undefined') {
          // Try to get refresh token from Zustand store first
          let refreshToken = null;
          try {
            const authStore = JSON.parse(localStorage.getItem('auth-storage') || '{}');
            refreshToken = authStore.state?.refreshToken || localStorage.getItem('refreshToken');
          } catch {
            refreshToken = localStorage.getItem('refreshToken');
          }

          if (refreshToken) {
            const response = await axios.post(`${API_URL}/auth/refresh`, {
              refreshToken,
            });

            const { accessToken } = response.data;
            
            // Update both localStorage and Zustand store
            localStorage.setItem('accessToken', accessToken);
            try {
              const authStore = JSON.parse(localStorage.getItem('auth-storage') || '{}');
              if (authStore.state) {
                authStore.state.accessToken = accessToken;
                localStorage.setItem('auth-storage', JSON.stringify(authStore));
              }
            } catch {
              // Fallback to just localStorage
            }

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          // Clear all auth data
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('auth-storage');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
