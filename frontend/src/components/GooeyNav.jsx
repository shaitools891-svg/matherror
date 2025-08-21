// Create this file: src/components/GooeyNav.jsx
import React, { useState, useEffect } from 'react';

const GooeyNav = ({ items, onItemClick, activeSection = 'Home' }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [active, setActive] = useState(activeSection);

  useEffect(() => {
    setActive(activeSection);
  }, [activeSection]);

  const handleItemClick = (item) => {
    setActive(item.label);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const getItemIndex = (itemLabel) => items.findIndex(item => item.label === itemLabel);
  const activeIndex = getItemIndex(hoveredItem?.label || active);
  const itemWidth = 100; // Width for each nav item

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .gooey-nav {
            filter: url(#gooey);
          }
          
          .gooey-blob {
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
        `
      }} />
      
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="gooey"
            />
          </filter>
        </defs>
      </svg>

      <nav className="gooey-nav relative inline-flex items-center bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Gooey blob background */}
        <div
          className="gooey-blob absolute top-1 bottom-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out shadow-md"
          style={{
            left: `${4 + activeIndex * itemWidth}px`,
            width: `${itemWidth - 8}px`,
            transform: hoveredItem ? 'scale(1.05)' : 'scale(1)',
            opacity: activeIndex >= 0 ? 1 : 0,
          }}
        />
        
        {/* Navigation items */}
        {items.map((item, index) => (
          <button
            key={item.label}
            className={`
              relative z-10 px-6 py-2 text-sm font-medium rounded-full
              transition-all duration-300 ease-out
              animate-fade-in
              ${active === item.label || hoveredItem?.label === item.label
                ? 'text-white font-semibold' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }
            `}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              minWidth: `${itemWidth}px`
            }}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
};

export default GooeyNav;
