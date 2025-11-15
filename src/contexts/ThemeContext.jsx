'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => {
      if (isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };
    
    // Update theme immediately
    updateTheme();
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const setTheme = (value) => {
    setIsDarkMode(value);
  };

  const setLightMode = () => {
    setIsDarkMode(false);
  };

  const setDarkMode = () => {
    setIsDarkMode(true);
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleDarkMode,
      setLightMode,
      setDarkMode,
      setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};