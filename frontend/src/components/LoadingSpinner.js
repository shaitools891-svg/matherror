import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LoadingSpinner = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`w-12 h-12 border-4 ${
        isDarkMode ? 'border-gray-700' : 'border-gray-300'
      } border-t-blue-500 rounded-full animate-spin transition-colors duration-300`}></div>
      <p className={`text-lg font-medium transition-colors duration-300 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>Loading Matherror...</p>
    </div>
  );
};

export default LoadingSpinner;
