import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // replace with your backend URL
  withCredentials: true, // send HTTP-only cookies
});

// Response Interceptor: Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
