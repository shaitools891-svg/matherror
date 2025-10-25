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
                shadow-lg hover:shadow-xl border border-gray-300 dark:border-gray-600
                ${currentThemeId === 'dark'
                    ? 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700'
                    : 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-100 hover:to-gray-200'
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
                        ? 'translate-x-8 bg-gradient-to-br from-yellow-300 to-yellow-400'
                        : 'translate-x-0 bg-gradient-to-br from-orange-400 to-orange-500'
                    }
                    flex items-center justify-center ring-2 ring-white/30
                `}
            >
                {/* Icon inside toggle with fade transition */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out ${
                        currentThemeId === 'light' ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Sun className="w-4 h-4 text-white drop-shadow-md" />
                </div>
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out ${
                        currentThemeId === 'dark' ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Moon className="w-4 h-4 text-slate-800 drop-shadow-md" />
                </div>
            </span>
        </button>
    );
};

export default DarkModeToggle;
