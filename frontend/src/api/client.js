import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/v1',
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle 401 (Unauthorized) - maybe refresh token or logout
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Optional: Handle token refresh here if needed, or just redirect to login
      // For now, we'll just reject
    }
    return Promise.reject(error);
  }
);

export default apiClient;
