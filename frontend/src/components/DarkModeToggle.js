import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
    const { currentThemeId, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative inline-flex items-center justify-center
                w-16 h-8 rounded-full transition-all duration-500 ease-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                hover:scale-110 active:scale-95 transform-gpu
                shadow-lg hover:shadow-xl
                ${currentThemeId === 'dark'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
                    : 'bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-200 hover:to-gray-300'
                }
            `}
            aria-label={
                currentThemeId === 'light' ? 'Switch to dark mode' :
                'Switch to light mode'
            }
        >
            {/* Toggle circle */}
            <span
                className={`
                    inline-block w-7 h-7 rounded-full shadow-md
                    transform transition-all duration-500 ease-out
                    ${currentThemeId === 'dark'
                        ? 'translate-x-6 bg-gradient-to-br from-yellow-300 to-yellow-400'
                        : 'translate-x-0 bg-gradient-to-br from-orange-400 to-orange-500'
                    }
                    flex items-center justify-center ring-2 ring-white/20
                `}
            >
                {/* Icon inside toggle with fade transition */}
                <div
                    className={`absolute transition-opacity duration-300 ease-out ${
                        currentThemeId === 'light' ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Sun className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                </div>
                <div
                    className={`absolute transition-opacity duration-300 ease-out ${
                        currentThemeId === 'dark' ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Moon className="w-3.5 h-3.5 text-blue-700 drop-shadow-sm" />
                </div>
            </span>
        </button>
    );
};

export default DarkModeToggle;
