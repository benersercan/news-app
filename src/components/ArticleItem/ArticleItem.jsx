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
