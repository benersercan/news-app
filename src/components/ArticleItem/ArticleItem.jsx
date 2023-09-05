import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useNews } from '../../context/NewsContext';
import plusIcon from '../../assets/plus-icon.svg';
import removeIcon from '../../assets/icon-remove.svg';
const DEFAULT_IMAGE = '../../../public/not-found.png';
import { useReadingList } from '@hooks/useReadingList';
import { extractTime } from '@util/helper';

const mapArticleModel = (article) => {
  return {
    title: article.title || "Title Not Available",
    description: article.description || "Description Not Available",
    content: article.content || "Content Not Available",
    urlToImage: article.urlToImage || DEFAULT_IMAGE,
  };
}

const ArticleItem = ({ article, lastArticleRef, isLastItem, isReadingList }) => {
  const navigate = useNavigate();
  const { setSelectedNews } = useNews();
  const { addToReadingList, removeFromReadingList, isInReadingList } = useReadingList();

  const handleSelectNews = (e, article) => {
    if (e.target.tagName.toLowerCase() !== 'button') {
      setSelectedNews(article);
      navigate('/detail');
    }
  }
  
  const model = mapArticleModel(article);

  return (
    <div onClick={(e) => handleSelectNews(e, article)} className='article-item' key={article.url} ref={isLastItem ? lastArticleRef : null}>
      <img className='article-image' src={model.urlToImage} alt={model.title} />
      <h2>{model.title}</h2>
      {
        isReadingList ? 
        <p>{model.content}</p> : <p>{model.description}</p>
      }
      <div className='article-item__bottom'>
        {
          isInReadingList(article.url)
          ? <button onClick={(e) => { e.stopPropagation(); removeFromReadingList(article.url); }}>
              <img className='reading-list-icon' src={removeIcon} alt="icon" />Remove my read list
            </button>
          : <button onClick={(e) => { e.stopPropagation(); addToReadingList(article); }}>
              <img className='reading-list-icon' src={plusIcon} alt="icon" />Add my read list
            </button>
        }
        <span className='time'>
          {extractTime(article.publishedAt)}
        </span>
      </div>
    </div>
  );
}

ArticleItem.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urlToImage: PropTypes.string,
    url: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
  }).isRequired,
  lastArticleRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  isLastItem: PropTypes.bool.isRequired,
  isReadingList: PropTypes.bool
};

export default ArticleItem;


// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import { useNews } from '../../context/NewsContext';
// import plusIcon from '../../assets/plus-icon.svg';
// import removeIcon from '../../assets/icon-remove.svg';
// const DEFAULT_IMAGE = '../../../public/not-found.png';
// import { localStorageKeys } from '@util/constants/localStorage';


// const mapArticleModel = (article) => {
//   return {
//     title: article.title || "Title Not Available",
//     description: article.description || "Description Not Available",
//     content: article.content || "Content Not Available",
//     urlToImage: article.urlToImage || DEFAULT_IMAGE,
//   };
// }

// const ArticleItem = ({ article, lastArticleRef,isLastItem, isReadingList }) => {
//   const navigate = useNavigate();
//   const { setSelectedNews } = useNews();
//   const [readingList, setReadingList] = useState(() => {
//     const savedList = localStorage.getItem(localStorageKeys.readingList);
//     return savedList ? JSON.parse(savedList) : [];
//   });

//   const handleSelectNews = (e, article) => {
//     if (e.target.tagName.toLowerCase() !== 'button') {
//         setSelectedNews(article);
//         navigate('/detail');
//     }
// }

//   const handleAddToReadingList = (article) => { // TODO Add this method for util or CustomHook
//     const newList = [...readingList, article];
//     setReadingList(newList);
//     localStorage.setItem(localStorageKeys.readingList, JSON.stringify(newList));
//   };

//   const handleRemoveFromReadingList = (articleUrl) => { // TODO Add this method for util or CustomHook
//     const newList = readingList.filter(item => item.url !== articleUrl);
//     setReadingList(newList);
//     localStorage.setItem(localStorageKeys.readingList, JSON.stringify(newList));
//   };

//   const extractTime = (dateString) => { // TODO Add this method for util or CustomHook
//     const date = new Date(dateString);
//     const hours = String(date.getUTCHours()).padStart(2, '0');
//     const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//     const seconds = String(date.getUTCSeconds()).padStart(2, '0');
//     return `${hours}:${minutes}:${seconds}`;
//   }
  
//   const model = mapArticleModel(article);

//   return (
//     <div onClick={(e) => handleSelectNews(e, article)} className='article-item' key={article.url} ref={isLastItem ? lastArticleRef : null}>
//       <img className='article-image' src={model.urlToImage} alt={model.title} />
//       <h2>{model.title}</h2>
//       {
//         isReadingList ? 
//         <p>{model.content}</p> : <p>{model.description}</p>
//       }
//       <div className='article-item__bottom'>
//         {
//           readingList.some(item => item.url === article.url)
//           ? <button onClick={() => handleRemoveFromReadingList(article.url)}>
//               <img className='reading-list-icon' src={removeIcon} alt="icon" />Remove my read list
//             </button>
//           : <button onClick={() => handleAddToReadingList(article)}>
//               <img className='reading-list-icon' src={plusIcon} alt="icon" />Add my read list
//             </button>
//         }
//         <span className='time'>
//           {extractTime(article.publishedAt)}
//         </span>
//       </div>
//     </div>
//   );
// }

// ArticleItem.propTypes = {
//   article: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     urlToImage: PropTypes.string,
//     url: PropTypes.string.isRequired,
//     publishedAt: PropTypes.string.isRequired,
//   }).isRequired,
//   lastArticleRef: PropTypes.oneOfType([
//     PropTypes.func, 
//     PropTypes.shape({ current: PropTypes.instanceOf(Element) })
//   ]),
//   isLastItem: PropTypes.bool.isRequired,
//   isReadingList: PropTypes.bool
// };

// export default ArticleItem;
