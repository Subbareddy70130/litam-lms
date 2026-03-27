import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add JWT Token automatically for non-auth requests
api.interceptors.request.use((config) => {
    const publicPaths = ['/auth/login/', '/auth/register/student/', '/auth/register/faculty/'];
    if (publicPaths.some(path => config.url.includes(path))) {
        return config;
    }

    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// General Public API
export const getFaculty = () => api.get('/faculty/');
export const getCourses = () => api.get('/courses/');
export const getNotices = () => api.get('/notices/');
export const getGallery = () => api.get('/gallery/');
export const getStudentResources = () => api.get('/students/');

// Auth Endpoints
export const loginUser = (data) => api.post('auth/login/', data);
export const registerStudent = (data) => api.post('auth/register/student/', data);
export const registerFaculty = (data) => api.post('auth/register/faculty/', data);

// Dashboards
export const getStudentDashboard = () => api.get('students/dashboard/');
export const getFacultyDashboard = () => api.get('faculty/dashboard/');
// Admin Endpoints
export const getAdminDashboard = () => api.get('auth/admin-dashboard/');
export const uploadResults = (formData) => api.post('courses/upload-results/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export default api;
