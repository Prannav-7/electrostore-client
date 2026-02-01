// src/config/constants.js
// Centralized configuration for API URLs and other constants

// Determine the base URLs based on environment
export const getApiBaseURL = () => {
  // Use window.location.hostname to detect if running on deployed domain
  const isProduction = process.env.NODE_ENV === 'production' || 
                       window.location.hostname !== 'localhost';
  
  if (isProduction) {
    return process.env.REACT_APP_API_URL || 'https://electro-store-server-8n0d.onrender.com/api';
  }
  return 'http://localhost:5000/api';
};

export const getServerBaseURL = () => {
  // Use window.location.hostname to detect if running on deployed domain
  const isProduction = process.env.NODE_ENV === 'production' || 
                       window.location.hostname !== 'localhost';
  
  if (isProduction) {
    return process.env.REACT_APP_SERVER_URL || 'https://electro-store-server-8n0d.onrender.com';
  }
  return 'http://localhost:5000';
};

// Export the URLs for use throughout the app
export const API_BASE_URL = getApiBaseURL();
export const SERVER_BASE_URL = getServerBaseURL();

// Helper function to get full image URL
export const getImageURL = (imagePath) => {
  if (!imagePath) return '/images/default-product.jpg';
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
  return `${SERVER_BASE_URL}${imagePath}`;
};

export default {
  API_BASE_URL,
  SERVER_BASE_URL,
  getImageURL
};