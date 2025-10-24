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
                w-14 h-7 rounded-full transition-all duration-500 ease-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                hover:scale-110 active:scale-95 transform-gpu
                shadow-lg hover:shadow-xl
                ${isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
                    : 'bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-200 hover:to-gray-300'
                }
            `}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {/* Toggle circle */}
            <span
                className={`
                    inline-block w-6 h-6 rounded-full shadow-md
                    transform transition-all duration-500 ease-out
                    ${isDarkMode
                        ? 'translate-x-3.5 bg-gradient-to-br from-yellow-300 to-yellow-400'
                        : '-translate-x-3.5 bg-gradient-to-br from-orange-400 to-orange-500'
                    }
                    flex items-center justify-center ring-2 ring-white/20
                `}
            >
                {/* Icon inside toggle */}
                {isDarkMode ? (
                    <Moon className="w-3.5 h-3.5 text-blue-700 drop-shadow-sm" />
                ) : (
                    <Sun className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                )}
            </span>
        </button>
    );
};

export default DarkModeToggle;
