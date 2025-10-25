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
                w-18 h-9 rounded-full transition-all duration-500 ease-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                hover:scale-105 active:scale-95 transform-gpu
                shadow-lg hover:shadow-xl border border-blue-300 dark:border-purple-600
                ${currentThemeId === 'dark'
                    ? 'bg-gradient-to-r from-indigo-700 to-purple-800 hover:from-indigo-600 hover:to-purple-700'
                    : 'bg-gradient-to-r from-blue-200 to-blue-300 hover:from-blue-100 hover:to-blue-200'
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
                    relative inline-block w-8 h-8 rounded-full shadow-md
                    transform transition-all duration-500 ease-out
                    ${currentThemeId === 'dark'
                        ? 'translate-x-8 bg-gradient-to-br from-blue-300 to-blue-500 ring-4 ring-blue-400/50'
                        : 'translate-x-0 bg-gradient-to-br from-yellow-300 to-yellow-500 ring-4 ring-yellow-400/50'
                    }
                    flex items-center justify-center
                `}
            >
                {/* Icon inside toggle with fade transition */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out ${
                        currentThemeId === 'light' ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Sun className="w-4 h-4 text-yellow-100 drop-shadow-lg" />
                </div>
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out ${
                        currentThemeId === 'dark' ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Moon className="w-4 h-4 text-indigo-900 drop-shadow-lg" />
                </div>
            </span>
        </button>
    );
};

export default DarkModeToggle;
