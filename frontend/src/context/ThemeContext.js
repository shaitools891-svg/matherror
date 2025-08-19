import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockData } from '../data/mock';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Light and Dark theme definitions
const themes = {
  light: {
    id: 'light',
    name: 'Light Theme',
    primary: '#3b82f6',      // Blue
    secondary: '#64748b',     // Slate
    accent: '#10b981',        // Emerald
    text: '#1f2937',          // Gray-800
    textSecondary: '#6b7280', // Gray-500
    background: '#ffffff',    // White
    backgroundSecondary: '#f8fafc', // Gray-50
    border: '#e5e7eb',        // Gray-200
    cardBg: '#ffffff',        // White
    cardBorder: '#e5e7eb',    // Gray-200
    mode: 'light'
  },
  dark: {
    id: 'dark',
    name: 'Dark Theme',
    primary: '#60a5fa',       // Blue-400
    secondary: '#94a3b8',     // Slate-400
    accent: '#34d399',        // Emerald-400
    text: '#f9fafb',          // Gray-50
    textSecondary: '#d1d5db', // Gray-300
    background: '#111827',    // Gray-900
    backgroundSecondary: '#1f2937', // Gray-800
    border: '#374151',        // Gray-700
    cardBg: '#1f2937',        // Gray-800
    cardBorder: '#374151',    // Gray-700
    mode: 'dark'
  }
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // For backward compatibility - get the current theme object
  const currentTheme = isDarkMode ? themes.dark : themes.light;

  // Update document class, CSS variables, and localStorage when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      
      // Update CSS classes
      if (isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      // Update CSS variables for backward compatibility
      root.style.setProperty('--theme-primary', currentTheme.primary);
      root.style.setProperty('--theme-secondary', currentTheme.secondary);
      root.style.setProperty('--theme-accent', currentTheme.accent);
      root.style.setProperty('--theme-background', currentTheme.background);
      root.style.setProperty('--theme-text', currentTheme.text);
      root.style.setProperty('--theme-card-bg', currentTheme.cardBg);
      root.style.setProperty('--theme-card-border', currentTheme.cardBorder);
      
      // Save to localStorage
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      
      // For backward compatibility with existing code
      localStorage.setItem('mathErrorTheme', currentTheme.id);
    }
  }, [isDarkMode, currentTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        // Only auto-switch if user hasn't manually set a preference
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === null) {
          setIsDarkMode(e.matches);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // For backward compatibility with existing code
  const changeTheme = (themeId) => {
    if (themeId === 'light' || themeId === 'dark') {
      setIsDarkMode(themeId === 'dark');
    } else {
      // Handle custom themes from mockData if needed
      const customTheme = mockData.colorThemes.find(t => t.id === themeId);
      if (customTheme) {
        // Apply custom theme CSS variables
        const root = document.documentElement;
        root.style.setProperty('--theme-primary', customTheme.primary);
        root.style.setProperty('--theme-secondary', customTheme.secondary);
        root.style.setProperty('--theme-accent', customTheme.accent);
        root.style.setProperty('--theme-background', customTheme.background);
        root.style.setProperty('--theme-text', customTheme.text);
        root.style.setProperty('--theme-card-bg', customTheme.cardBg);
        root.style.setProperty('--theme-card-border', customTheme.cardBorder);
        
        localStorage.setItem('mathErrorTheme', themeId);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    // New API
    isDarkMode,
    toggleTheme,
    currentTheme,
    themes,
    
    // For backward compatibility with existing components
    changeTheme,
    themes: mockData.colorThemes // Include custom themes from mockData
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
