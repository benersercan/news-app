import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from '@components/Layout';
import './ReadingList.scss';
import { FaFrown } from 'react-icons/fa';
import { localStorageKeys } from '@util/constants/localStorage';

const Article = ({ article, onRemove }) => (
  <div className='saved-article'>
    <img className='saved-article__image' src={article.urlToImage} alt={article.title} />
    <h2>{article.title}</h2>
    <p>{article.description}</p>
    <div className='saved-article__bottom'>
      <button className='redirect-buttons' onClick={onRemove}>Remove from Reading List</button>
      <a className='redirect-buttons' target='_blank' href={article.url} rel="noreferrer">Read Full Article</a>
    </div>
  </div>
);

export const ReadingList = () => {
  const [readingList, setReadingList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedList = localStorage.getItem(localStorageKeys.readingList);
    if (savedList) {
      setReadingList(JSON.parse(savedList));
    }
  }, []);

  const removeFromReadingList = (articleUrl) => {
    const newList = readingList.filter(item => item.url !== articleUrl);
    setReadingList(newList);
    localStorage.setItem(localStorageKeys.readingList, JSON.stringify(newList));
  };

  const redirectToHomePage = () => {
    navigate('/');
  }

  if (readingList.length === 0) {
    return (
      <div className='empty-state'>
        <FaFrown/>
        <p>Okuma listenizde hiç haber yok.</p>
        <button onClick={redirectToHomePage}>Ana Sayfaya Dön ve Haberlere Göz At!</button>
      </div>
    );
  }

  return (
    <Layout>
      <div className='reading-list-header'>
        <h2>Reading List </h2>
      </div>
      <div className='reading-list-container'>
        {readingList.map((news, index) => (
          <Article 
            key={index} 
            article={news}
            onRemove={() => removeFromReadingList(news.url)}
          />
        ))}
      </div>
    </Layout>
  );
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urlToImage: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};