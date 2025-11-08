import axios from 'axios';

// Configure axios defaults
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add CSRF token to requests
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

// API service functions
export const api = {
    // Authentication
    login: (credentials) => axios.post('/login', credentials),
    register: (userData) => axios.post('/register', userData),
    logout: () => axios.post('/logout'),
    getUser: () => axios.get('/api/user'),

    // Dashboard data
    getDashboardData: () => axios.get('/api/dashboard'),

    // Admin functions
    getUsers: (params) => axios.get('/api/admin/users', { params }),
    getUserDetails: (id) => axios.get(`/api/admin/users/${id}`),
    updateUser: (id, data) => axios.put(`/api/admin/users/${id}`, data),
    deleteUser: (id) => axios.delete(`/api/admin/users/${id}`),

    // Settings
    getSettings: () => axios.get('/api/settings'),
    updateSettings: (data) => axios.put('/api/settings', data),

    // System settings (admin only)
    getSystemSettings: () => axios.get('/api/system/settings'),
    updateSystemSettings: (data) => axios.put('/api/system/settings', data),

    // User settings
    getUserSettings: () => axios.get('/api/user/settings'),
    updateUserSettings: (data) => axios.put('/api/user/settings', data),

    // Activity logging
    logActivity: (data) => axios.post('/api/activity', data),

    // Penalties
    getPenalties: (params) => axios.get('/api/penalties', { params }),
    createPenalty: (data) => axios.post('/api/penalties', data),
    applyIdlePenalty: (data) => axios.post('/api/idle-penalty', data),
};

// Response interceptor for handling common errors
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Unauthorized - redirect to login
            window.location.href = '/login';
        } else if (error.response?.status === 419) {
            // CSRF token mismatch
            alert('Session expired. Please refresh the page.');
        } else if (error.response?.status === 403) {
            // Forbidden
            alert('You do not have permission to perform this action.');
        }

        return Promise.reject(error);
    }
);

export default api;
