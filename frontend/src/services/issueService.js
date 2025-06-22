import api from './api';

const issueService = {
  // Create a new issue
  createIssue: async (issueData) => {
    try {
      const formData = new FormData();
      Object.keys(issueData).forEach(key => {
        if (key === 'image' && issueData[key]) {
          formData.append('image', issueData[key]);
        } else {
          formData.append(key, issueData[key]);
        }
      });
      const response = await api.post('/issues', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Failed to create issue';
    }
  },

  // Get all issues
  getAllIssues: async () => {
    try {
      const response = await api.get('/issues');
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Failed to fetch issues';
    }
  },

  // Get issues created by the logged-in user
  getMyIssues: async () => {
    try {
      const response = await api.get('/issues/mine');
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Failed to fetch user issues';
    }
  },

  // Get high severity issues
  getHighSeverityIssues: async () => {
    try {
      const response = await api.get('/issues/high');
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Failed to fetch high severity issues';
    }
  },

  // Get issue by ID
  getIssueById: async (id) => {
    try {
      const response = await api.get(`/issues/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Failed to fetch issue';
    }
  },

  // Upvote an issue
  upvoteIssue: async (id) => {
    try {
      const response = await api.patch(`/issues/${id}/upvote`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Failed to upvote issue';
    }
  },

  // Add a comment to an issue
  addComment: async (id, commentData) => {
    try {
      const response = await api.post(`/issues/${id}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Failed to add comment';
    }
  },

  // Update issue status (admin only)
  updateIssueStatus: async (id, statusData) => {
    try {
      const response = await api.patch(`/issues/${id}/status`, statusData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Failed to update issue status';
    }
  },

  // Get resolved issues (admin only)
  getResolvedIssues: async () => {
    try {
      const response = await api.get('/issues/success');
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Failed to fetch resolved issues';
    }
  }
};

export default issueService;