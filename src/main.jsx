// import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import './scss/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  // TODO StrictMode must be deleted or config with .env
  // <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  // </React.StrictMode>
);
