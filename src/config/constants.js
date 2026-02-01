// src/config/constants.js
// Centralized configuration for API URLs and other constants

// Determine the base URLs based on environment
export const getApiBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 'https://electro-store-server-8n0d.onrender.com/api';
  }
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
};

export const getServerBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_SERVER_URL || 'https://electro-store-server-8n0d.onrender.com';
  }
  return process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
};

// Export the URLs for use throughout the app
export const API_BASE_URL = getApiBaseURL();
export const SERVER_BASE_URL = getServerBaseURL();

// Helper function to get full image URL
export const getImageURL = (imagePath) => {
  if (!imagePath) return '/images/default-product.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `${SERVER_BASE_URL}${imagePath}`;
};

const constants = {
  API_BASE_URL,
  SERVER_BASE_URL,
  getImageURL
};

export default constants;