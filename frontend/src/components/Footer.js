import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { currentTheme } = useTheme();

  return (
    <footer className="bg-gray-900 dark:bg-black py-8 mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white dark:text-gray-100 transition-colors duration-300">
          <span style={{
            fontFamily: "'LCDSolid', monospace",
            fontWeight: 'normal',
            letterSpacing: '2px'
          }}>
            Math ERROR
          </span> Official Website
        </p>
        <p className="mt-2 text-gray-300 dark:text-gray-400 transition-colors duration-300">
          © 2025 Math ERROR. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
