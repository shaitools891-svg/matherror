import React, { useState, useEffect, useCallback, useRef } from 'react';
import './ElectricBorder.css';

const ElectricBorder = ({ children, intensity = 1, color = '#00ff88' }) => {
  const [positions, setPositions] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Memoized function to generate random positions
  const generatePositions = useCallback(() => {
    const newPositions = [];
    const count = Math.floor(10 * intensity);
    
    for (let i = 0; i < count; i++) {
      newPositions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        id: i
      });
    }
    
    return newPositions;
  }, [intensity]);

  // Effect to update positions when intensity changes
  useEffect(() => {
    setPositions(generatePositions());
  }, [generatePositions]);

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSize({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size calculation

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="electric-border-container" ref={containerRef}>
      <div className="electric-content">
        {children}
      </div>
      <svg className="electric-border" width={size.width} height={size.height}>
        <rect
          x="2" 
          y="2"
          width={size.width - 4} 
          height={size.height - 4}
          className="electric-rect"
          stroke={color}
        />
        {positions.map((pos) => (
          <circle
            key={pos.id}
            cx={`${pos.x}%`}
            cy={`${pos.y}%`}
            r={pos.size}
            fill={color}
            opacity={pos.opacity}
            className="electric-particle"
          />
        ))}
      </svg>
    </div>
  );
};

export default ElectricBorder;
