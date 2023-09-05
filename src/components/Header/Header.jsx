import { Link } from 'react-router-dom';
import './Header.scss';
import BtcLogo from '../../assets/logo.svg'
import { useTheme } from '../../context/ThemeContext';
import { FaMoon, FaSun, FaRegBookmark,FaHome } from 'react-icons/fa';

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="header">
      <div className="logo-wrapper">
        <Link to="/">
          <img className="logo" alt="logo" src={BtcLogo} />
        </Link>
      </div>
      <nav className="navigation">
        <Link to="/">
          <FaHome/>Home
        </Link>
        <Link to="/reading-list">
          <FaRegBookmark/>Reading List
        </Link>
        <button onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon color="#f1c40f" /> : <FaSun color="#f39c12" />}
      </button>
      </nav>
    </header>
  );
}

export default Header;
