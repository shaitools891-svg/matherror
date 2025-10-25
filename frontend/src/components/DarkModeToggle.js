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
                    ? 'bg-indigo-600 hover:bg-indigo-500'
                    : 'bg-blue-400 hover:bg-blue-300'
                }
            `}
            aria-label={
                currentThemeId === 'light' ? 'Switch to dark mode' :
                'Switch to light mode'
            }
        >
            {currentThemeId === 'light' ? (
                <Sun className="w-4 h-4 text-yellow-100 drop-shadow-lg" />
            ) : (
                <Moon className="w-4 h-4 text-indigo-900 drop-shadow-lg" />
            )}
        </button>
    );
};

export default DarkModeToggle;
