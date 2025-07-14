import React from 'react';
import { WalmartAssets } from '../assets/WalmartAssets';

const WalmartLogo = ({ size = 'medium', showText = true, className = '' }) => {
  const sizeStyles = {
    small: { maxWidth: '80px', fontSize: '1rem' },
    medium: { maxWidth: '150px', fontSize: '1.5rem' },
    large: { maxWidth: '250px', fontSize: '2rem' }
  };

  const currentSize = sizeStyles[size] || sizeStyles.medium;

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    if (e.target.nextSibling) {
      e.target.nextSibling.style.display = 'block';
    }
  };

  return (
    <div className={`walmart-logo-wrapper ${className}`} style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src={WalmartAssets.logos.walmart}
        alt="Walmart Logo" 
        className="walmart-logo-img"
        style={{
          ...currentSize,
          height: 'auto',
          marginRight: showText ? '15px' : '0'
        }}
        onError={handleImageError}
      />
      <div 
        className="walmart-text-fallback" 
        style={{
          display: 'none',
          fontSize: currentSize.fontSize,
          fontWeight: 'bold',
          color: '#ffc220',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          marginRight: showText ? '15px' : '0'
        }}
      >
        {WalmartAssets.logos.walmartText}
      </div>
      {showText && (
        <div style={{ color: 'inherit' }}>
          <div style={{ fontSize: currentSize.fontSize, fontWeight: 'bold', lineHeight: '1.2' }}>
            Sustainable Supply Chain
          </div>
          <div style={{ fontSize: `calc(${currentSize.fontSize} * 0.7)`, opacity: '0.9' }}>
            Blockchain Technology
          </div>
        </div>
      )}
    </div>
  );
};

export default WalmartLogo;
