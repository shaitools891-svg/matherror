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

// Light, Dark, and Glass theme definitions
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
  },
  glass: {
    id: 'glass',
    name: 'Smooth Glass Theme',
    primary: '#60a5fa',       // Blue-400
    secondary: '#94a3b8',     // Slate-400
    accent: '#34d399',        // Emerald-400
    text: '#1f2937',          // Gray-800
    textSecondary: '#6b7280', // Gray-500
    background: 'rgba(255,255,255,0.25)',   // More opaque for visibility
    backgroundSecondary: 'rgba(248,250,252,0.2)', // Semi-transparent gray-50
    border: 'rgba(229,231,235,0.4)',        // More visible border
    cardBg: 'rgba(255,255,255,0.25)',       // More opaque cards
    cardBorder: 'rgba(229,231,235,0.4)',    // More visible card borders
    mode: 'glass'
  }
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to light
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('themeId');
      if (saved && themes[saved]) {
        return saved;
      }
      // Check system preference for dark mode
      const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDarkPreferred ? 'dark' : 'light';
    }
    return 'light';
  });

  // For backward compatibility - get the current theme object
  const currentTheme = themes[currentThemeId];
  const isDarkMode = currentThemeId === 'dark';

  // Update document class, CSS variables, and localStorage when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;

      // Update CSS classes
      root.classList.remove('dark', 'glass');
      if (currentThemeId === 'dark') {
        root.classList.add('dark');
      } else if (currentThemeId === 'glass') {
        root.classList.add('glass');
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
      localStorage.setItem('themeId', currentThemeId);
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

      // For backward compatibility with existing code
      localStorage.setItem('mathErrorTheme', currentTheme.id);
    }
  }, [currentThemeId, currentTheme, isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        // Only auto-switch if user hasn't manually set a preference
        const savedTheme = localStorage.getItem('themeId');
        if (savedTheme === null) {
          setCurrentThemeId(e.matches ? 'dark' : 'light');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // For backward compatibility with existing code
  const changeTheme = (themeId) => {
    if (themes[themeId]) {
      setCurrentThemeId(themeId);
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
    const themeOrder = ['light', 'dark', 'glass'];
    const currentIndex = themeOrder.indexOf(currentThemeId);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setCurrentThemeId(themeOrder[nextIndex]);
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
