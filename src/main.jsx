import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import './scss/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
