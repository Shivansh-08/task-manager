import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Configure axios with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (email, username, password) => api.post('/auth/signup', { email, username, password }),
};

// Task services
export const taskService = {
  getTasks: () => api.get('/tasks'),
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  updateStatus: (id, status) => api.put(`/tasks/${id}/status`, { status }),
  assignTask: (id, assigneeEmail) => api.put(`/tasks/${id}/assign`, { assigneeEmail }),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

// Category services
export const categoryService = {
  getCategories: () => api.get('/categories'),
  createCategory: (name) => api.post('/categories', { name }),
};

// Notification services
export const notificationService = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
};

export default api;