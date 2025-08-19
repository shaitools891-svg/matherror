import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { Home, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { isDarkMode, currentTheme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="text-center max-w-md mx-4">
        <AlertCircle 
          size={64} 
          className={`mx-auto mb-6 ${
            isDarkMode ? 'text-red-400' : 'text-red-500'
          }`} 
        />
        <h1 className={`text-6xl font-bold mb-4 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>404</h1>
        <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>Page Not Found</h2>
        <p className={`mb-8 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button
            className="group px-6 py-3 rounded-full font-semibold transition-all duration-300"
            style={{ 
              backgroundColor: currentTheme.primary,
              color: 'white'
            }}
          >
            <Home className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
