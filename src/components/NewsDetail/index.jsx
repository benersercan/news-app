import { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@components/Layout'
import plusIcon from '../../assets/plus-icon.svg';
import removeIcon from '../../assets/icon-remove.svg';
import './NewsDetail.scss'
const notFoundImage = '../../../public/not-found.png';
import { localStorageKeys } from '@util/constants/localStorage';
import { extractTime } from '@util/helper';

export const NewsDetail = () => {
  const navigate = useNavigate();
  const { selectedNews } = useNews();
  const [readingList, setReadingList] = useState(() => {
    const savedList = localStorage.getItem(localStorageKeys.readingList);
    return savedList ? JSON.parse(savedList) : [];
  });

  const goBack = () => {
    navigate(-1);
  }

  const handleAddToReadingList = (article) => { // TODO Add this method for util or customHook
    const newList = [...readingList, article];
    setReadingList(newList);
    localStorage.setItem(localStorageKeys.readingList, JSON.stringify(newList));
    
  };

  const handleRemoveFromReadingList = (articleUrl) => { // TODO Add this method for util or customHook
    const newList = readingList.filter(item => item.url !== articleUrl);
    setReadingList(newList);
    localStorage.setItem(localStorageKeys.readingList, JSON.stringify(newList));
  };

  const redirectToHomePage = () => {
    navigate('/');
  }

  if (!selectedNews) {
    return (
      <div>
        <p>You have to select a news from the list.</p>
        <button onClick={redirectToHomePage}>Return to Home Page and Browse News!</button>
      </div>
    );
  }

  return (
    <Layout>
      <div className='article-detail'>
        <h2>{selectedNews.title}</h2>
        <img className='article-image' src={selectedNews.urlToImage || notFoundImage} alt={selectedNews.title}  />
        <p>{selectedNews.content}</p>
        <div className='article-detail__bottom'>
          {
            readingList.some(item => item.url === selectedNews.url)
            ? <button onClick={() => handleRemoveFromReadingList(selectedNews.url)}>
                <img className='reading-list-icon' src={removeIcon} alt="icon" />Remove my read list
              </button>
            : <button onClick={() => handleAddToReadingList(selectedNews)}>
                <img className='reading-list-icon' src={plusIcon} alt="icon" />Add my read list
              </button>
          }
          <span className='time'>
            {extractTime(selectedNews.publishedAt)}
          </span>
        </div>

        <button className='redirect-buttons' onClick={goBack}>
          {'< Go To Back'}
        </button>

        <a target='_blank' className='redirect-buttons' href={selectedNews.url} rel="noreferrer">
          Read Full Article
        </a>
      </div>
    </Layout>
  );
}


