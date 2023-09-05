import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  if(!ThemeContext.Provider) {
    throw("useTheme can only be used within ThemeContext Provider.")
  }
  return useContext(ThemeContext);
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
