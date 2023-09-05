import PropTypes from 'prop-types';
import Header from '@components/Header/Header';
import './Layout.scss';

function Layout({children}) {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-content">
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;
