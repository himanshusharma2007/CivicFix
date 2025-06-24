import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'https://civicfix-hilv.onrender.com/api', // replace with your backend URL
  withCredentials: true, // send HTTP-only cookies
});

// Response Interceptor: Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      // Redirect to login page
      // window.location.href = '/login';
      console.log("error response", error.response);
    }
    return Promise.reject(error);
  }
);

export default api;
