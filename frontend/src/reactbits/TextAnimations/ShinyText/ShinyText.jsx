import React from 'react';
import './ShinyText.css';

const ShinyText = ({ children, color = '#fff', intensity = 1 }) => {
  return (
    <span className="shiny-text" style={{ '--shine-color': color, '--intensity': intensity }}>
      {children}
    </span>
  );
};

export default ShinyText;
