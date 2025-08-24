import React from 'react';
import './GradientText.css';

const GradientText = ({ 
  children, 
  colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'], 
  angle = 90,
  animate = false,
  speed = 5 
}) => {
  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${colors.join(', ')})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    animation: animate ? `gradientShift ${speed}s ease infinite` : 'none'
  };

  return (
    <span className="gradient-text" style={gradientStyle}>
      {children}
    </span>
  );
};

export default GradientText;
