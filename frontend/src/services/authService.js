import api from './api';

const authService = {
  // Sign up a new user
  signup: async (userData) => {
    try {
      // console.log(userData)
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Signup failed';
    }
  },

  // Log in a user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Login failed';
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.post('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Failed to fetch profile';
    }
  }
};

export default authService;