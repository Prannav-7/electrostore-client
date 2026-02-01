// src/components/StarRating.js - Flipkart/Amazon style rating display
import React from 'react';

const StarRating = ({ 
  rating = 0, 
  reviewCount = 0, 
  size = 'medium',
  showText = true,
  compact = false 
}) => {
  // Ensure rating is a valid number between 0 and 5
  const validRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const roundedRating = Math.round(validRating * 10) / 10; // Round to 1 decimal
  
  // Size configurations
  const sizeConfig = {
    small: {
      starSize: '12px',
      fontSize: '0.75rem',
      gap: '2px'
    },
    medium: {
      starSize: '14px',
      fontSize: '0.85rem',
      gap: '3px'
    },
    large: {
      starSize: '16px',
      fontSize: '0.9rem',
      gap: '4px'
    }
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  // Generate star display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span 
          key={`full-${i}`}
          style={{ 
            color: '#FFB400', 
            fontSize: config.starSize,
            lineHeight: 1 
          }}
        >
          ★
        </span>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <span 
          key="half"
          style={{ 
            color: '#FFB400', 
            fontSize: config.starSize,
            lineHeight: 1,
            position: 'relative',
            display: 'inline-block'
          }}
        >
          <span style={{ color: '#E0E0E0' }}>★</span>
          <span 
            style={{ 
              position: 'absolute', 
              left: 0, 
              top: 0,
              width: '50%',
              overflow: 'hidden',
              color: '#FFB400'
            }}
          >
            ★
          </span>
        </span>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(validRating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span 
          key={`empty-${i}`}
          style={{ 
            color: '#E0E0E0', 
            fontSize: config.starSize,
            lineHeight: 1 
          }}
        >
          ★
        </span>
      );
    }
    
    return stars;
  };

  // Don't render anything if no rating and no reviews
  if (validRating === 0 && reviewCount === 0) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: config.gap,
      flexWrap: compact ? 'nowrap' : 'wrap'
    }}>
      {/* Stars */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1px'
      }}>
        {renderStars()}
      </div>

      {/* Rating Text and Review Count */}
      {showText && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: config.fontSize,
          color: '#666',
          whiteSpace: 'nowrap'
        }}>
          {validRating > 0 && (
            <span style={{ 
              fontWeight: '500',
              color: '#388E3C'
            }}>
              {roundedRating}
            </span>
          )}
          
          {reviewCount > 0 && (
            <span style={{ 
              color: '#666',
              fontSize: compact ? config.fontSize : '0.8rem'
            }}>
              ({reviewCount.toLocaleString()} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
          
          {validRating === 0 && reviewCount === 0 && (
            <span style={{ 
              color: '#999',
              fontSize: '0.8rem',
              fontStyle: 'italic'
            }}>
              No reviews yet
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Additional component for compact display (like in product lists)
export const CompactRating = ({ rating, reviewCount }) => (
  <StarRating 
    rating={rating}
    reviewCount={reviewCount}
    size="small"
    compact={true}
    showText={true}
  />
);

// Component for detailed display (like in product details)
export const DetailedRating = ({ rating, reviewCount }) => (
  <StarRating 
    rating={rating}
    reviewCount={reviewCount}
    size="large"
    compact={false}
    showText={true}
  />
);

export default StarRating;