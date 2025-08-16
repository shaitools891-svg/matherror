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

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(mockData.colorThemes[0]);

  const changeTheme = (themeId) => {
    const theme = mockData.colorThemes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('mathErrorTheme', themeId);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('mathErrorTheme');
    if (savedTheme) {
      const theme = mockData.colorThemes.find(t => t.id === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme colors to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.primary);
    root.style.setProperty('--theme-secondary', currentTheme.secondary);
    root.style.setProperty('--theme-accent', currentTheme.accent);
    root.style.setProperty('--theme-background', currentTheme.background);
    root.style.setProperty('--theme-text', currentTheme.text);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes: mockData.colorThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};