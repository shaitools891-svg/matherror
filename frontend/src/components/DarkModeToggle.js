import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative inline-flex items-center justify-center
                w-12 h-6 rounded-full transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                hover:scale-105 active:scale-95
                ${isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-500' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }
            `}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {/* Toggle circle */}
            <span
                className={`
                    inline-block w-5 h-5 rounded-full shadow-lg
                    transform transition-all duration-300 ease-in-out
                    ${isDarkMode 
                        ? 'translate-x-3 bg-white' 
                        : 'translate-x-0 bg-white'
                    }
                    flex items-center justify-center
                `}
            >
                {/* Icon inside toggle */}
                {isDarkMode ? (
                    <Moon className="w-3 h-3 text-blue-600" />
                ) : (
                    <Sun className="w-3 h-3 text-yellow-500" />
                )}
            </span>
        </button>
    );
};

export default DarkModeToggle;
