import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

// Define theme colors
export const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  primary: '#8b5cf6',
  secondary: '#f3f4f6',
  card: '#f9fafb',
  border: '#e5e7eb',
};

export const darkTheme = {
  background: '#121212',
  text: '#ffffff',
  primary: '#8b5cf6',
  secondary: 'rgba(255,255,255,0.05)',
  card: '#1e1e1e',
  border: '#2e2e2e',
};

// Create the context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [theme, setTheme] = useState(darkTheme);

  // Fetch user's theme preference when the app starts
  useEffect(() => {
    const fetchThemePreference = async () => {
      try {
        // For now, use the /me endpoint since profile endpoint requires authentication
        const response = await axios.get(`${API_URL}/me`);
        if (response.data && response.data.theme_preference) {
          const userPrefersDark = response.data.theme_preference === 'dark';
          setIsDarkTheme(userPrefersDark);
          setTheme(userPrefersDark ? darkTheme : lightTheme);
        }
      } catch (error) {
        console.error('Error fetching theme preference:', error);
        // Default to dark theme if there's an error
        setIsDarkTheme(true);
        setTheme(darkTheme);
      }
    };

    fetchThemePreference();
  }, []);

  // Function to toggle theme
  const toggleTheme = async () => {
    const newIsDarkTheme = !isDarkTheme;
    setIsDarkTheme(newIsDarkTheme);
    setTheme(newIsDarkTheme ? darkTheme : lightTheme);

    try {
      // Update theme preference on the server
      await axios.put(`${API_URL}/profile/theme`, {
        theme_preference: newIsDarkTheme ? 'dark' : 'light',
      });
    } catch (error) {
      console.error('Error updating theme preference:', error);
      // If there's an error, revert the theme
      setIsDarkTheme(!newIsDarkTheme);
      setTheme(!newIsDarkTheme ? darkTheme : lightTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};