import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const NewsContext = createContext();

export const useNews = () => {
  if(!NewsContext.Provider) {
    throw("useNews can only be used within NextContext Provider.")
  }

    return useContext(NewsContext);
}

export const NewsProvider = ({ children }) => {
    const [selectedNews, setSelectedNews] = useState(null);

    return (
        <NewsContext.Provider value={{ selectedNews, setSelectedNews }}>
            {children}
        </NewsContext.Provider>
    );
}
NewsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};