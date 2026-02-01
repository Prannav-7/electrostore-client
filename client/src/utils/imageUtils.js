// Image utility functions

/**
 * Get the full image URL for a product
 * @param {string} imageUrl - The relative image URL from the database
 * @returns {string} - The full image URL
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return '/images/default-product.svg';
  }
  
  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // In production (Vercel), images are static assets served from public folder
  // In development, we need localhost:5000
  const isProduction = process.env.NODE_ENV === 'production' || 
                       window.location.hostname !== 'localhost';
  
  if (isProduction) {
    // Return path as-is for Vercel to serve from public folder
    return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  }
  
  // Development: serve from local server
  return imageUrl.startsWith('/') 
    ? `http://localhost:5000${imageUrl}` 
    : `http://localhost:5000/${imageUrl}`;
};

/**
 * Get the default image URL for error fallback
 * @returns {string} - The default image URL
 */
export const getDefaultImageUrl = () => {
  return '/images/default-product.svg';
};

export default {
  getImageUrl,
  getDefaultImageUrl
};
