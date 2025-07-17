import axios from 'axios';

// Create an axios instance
const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL_ASSETS ||
    'https://assets.deadlock-api.com/v2/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach token if available
apiClient.interceptors.request.use(
  (config) => {
    // Example: Attach token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor: Handle responses and errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API call failed:', error);
    // Handle specific error cases
    if (error.response.status === 401) {
      // Unauthorized
    } else if (error.response.status === 404) {
      // Not found
    }
    return Promise.reject(error);
  }
);

export default apiClient;
