// src/api.js
import axios from 'axios';

// Determine the base URL based on environment
const getBaseURL = () => {
  // Check if we're in production (on Vercel or other hosting)
  // Use window.location.hostname to detect if running on deployed domain
  const isProduction = process.env.NODE_ENV === 'production' || 
                       window.location.hostname !== 'localhost';
  
  if (isProduction) {
    // Use the Render server URL for production
    return process.env.REACT_APP_API_URL || 'https://electro-store-server-8n0d.onrender.com/api';
  }
  // Use localhost for development
  return 'http://localhost:5000/api';
};

// Get the server URL for images (without /api)
export const getServerURL = () => {
  // Use window.location.hostname to detect if running on deployed domain
  const isProduction = process.env.NODE_ENV === 'production' || 
                       window.location.hostname !== 'localhost';
  
  if (isProduction) {
    return process.env.REACT_APP_SERVER_URL || 'https://electro-store-server-8n0d.onrender.com';
  }
  return 'http://localhost:5000';
};

// Helper function to get full image URL (updated for production)
export const getImageURL = (imagePath) => {
  if (!imagePath) return '/images/default-product.jpg';
  // If already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // In production, images are served from Vercel's public folder
  // In development, images are served from the local server
  const isProduction = process.env.NODE_ENV === 'production' || 
                       window.location.hostname !== 'localhost';
  
  if (isProduction) {
    // Serve images from Vercel's public folder (they're static assets)
    return imagePath;
  }
  
  // In development, serve from local server
  return `${getServerURL()}${imagePath}`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000, // 30 second timeout for Render cold starts
  retry: 2, // Reduced retry attempts for faster fallback
  retryDelay: 2000, // 2 second retry delay
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('API Request Interceptor: Retrieved token:', token ? `${token.substring(0, 20)}...` : 'null');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Request Interceptor: Added Authorization header');
    }
    console.log('API Request: ' + config.method?.toUpperCase() + ' ' + config.url);
    return config;
  },
  (error) => {
    console.log('API Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Retry logic for failed requests
const retryRequest = async (error) => {
  const config = error.config;
  
  // Don't retry if we've already retried enough times
  if (!config || !config.retry || config.__retryCount >= config.retry) {
    return Promise.reject(error);
  }
  
  // Initialize retry count if not exists
  config.__retryCount = config.__retryCount || 0;
  config.__retryCount += 1;
  
  console.log(`API Retry attempt ${config.__retryCount} for ${config.method?.toUpperCase()} ${config.url}`);
  
  // Wait before retrying
  await new Promise(resolve => setTimeout(resolve, config.retryDelay * config.__retryCount));
  
  // Create new axios instance to avoid interceptor loops
  return axios(config);
};

// Add response interceptor to handle auth errors and retries
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.method?.toUpperCase(), response.config.url);
    return response;
  },
  async (error) => {
    console.log('API Response Error:', error.response?.status, error.config?.method?.toUpperCase(), error.config?.url);
    console.log('API Response Error Details:', error.response?.data);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.log('API: 401 error detected');
      
      // Check if it's a token-related error
      const errorMessage = error.response?.data?.message || '';
      if (errorMessage.includes('Token is not valid') || errorMessage.includes('No token')) {
        console.log('API: Invalid token detected, clearing token');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Don't reload page, let the auth context handle this
        console.log('API: Token cleared, authentication context will handle the state update');
      } else {
        console.log('API: 401 error but may not be token-related:', errorMessage);
      }
    }
    
    // Handle service unavailable errors with retry
    if (error.response?.status === 503 || error.code === 'ECONNABORTED' || !error.response) {
      console.log('API: Service unavailable or timeout, attempting retry...');
      try {
        return await retryRequest(error);
      } catch (retryError) {
        console.log('API: All retry attempts failed');
        return Promise.reject(retryError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
