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
                w-8 h-8 rounded-full transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                hover:scale-110 active:scale-95 transform-gpu
                shadow-lg hover:shadow-xl border border-blue-300 dark:border-purple-600
                ${currentThemeId === 'dark'
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600'
                    : 'bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-300 hover:to-blue-400'
                }
            `}
            aria-label={
                currentThemeId === 'light' ? 'Switch to dark mode' :
                'Switch to light mode'
            }
        >
            {currentThemeId === 'light' ? (
                <Sun className="w-2 h-2 text-yellow-100 drop-shadow-lg" />
            ) : (
                <Moon className="w-2 h-2 text-indigo-900 drop-shadow-lg" />
            )}
        </button>
    );
};

export default DarkModeToggle;
