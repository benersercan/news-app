import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Layout from '@components/Layout';
import ArticleItem from '@components/ArticleItem/ArticleItem';
import Modal from '@components/Modal/Modal';
import SwiperSkeleton from '@components/Skeleton/SwiperSkeleton';
import Skeleton from '@components/Skeleton/Skeleton';
import NewsApiGateway from '@services/newsApi.gateway';
import { useReadingList } from '@hooks/useReadingList';
import { extractTime } from '@util/helper';
import './NewsList.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import plusIcon from '../../assets/plus-icon.svg';
import removeIcon from '../../assets/icon-remove.svg';


export const NewsList = () => {
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const { addToReadingList, removeFromReadingList, isInReadingList } = useReadingList();


  /**
   * Merges old articles with new ones, ensuring no duplicates.
   *
   * @param {Array} prevArticles - Previous list of articles.
   * @param {Array} newArticles - New list of articles fetched.
   * @returns {Array} - Combined list of unique articles.
   */
  const addToSet = (prevArticles, newArticles) => {
    const articleSet = new Set(prevArticles.map(article => article.url));
    const uniqueArticles = newArticles.filter(article => !articleSet.has(article.url));
    return [...uniqueArticles, ...prevArticles];
  }

  /**
   * Fetches articles based on the search term.
   */
  const fetchNews = useCallback(() => {
    if (!searchTerm) return;
    setLoading(true);
    NewsApiGateway.fetchNews(searchTerm)
      .then((articles) => {
          setSearchedArticles(prevArticles => addToSet(prevArticles, articles));
          setLoading(false);
          if (articles.length < 10) setHasMore(false);
      })
      .catch(() => setLoading(false));
  }, [searchTerm]);

  /**
   * Infinite Scroll
   */
  const loadMoreArticles = () => {
    if (!searchTerm) return;
    setLoading(true);
    NewsApiGateway.loadMoreArticles(searchTerm, page)
      .then((articles) => {
          setSearchedArticles(prevArticles => [...prevArticles, ...articles]);
          setLoading(false);
          if (articles.length < 10) setHasMore(false);
      })
      .catch(() => setLoading(false));
  };

  /**
   * Auto Refresh Request
   */
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchNews();
      }, 51 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetchNews]);

  useEffect(() => {
    loadMoreArticles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  
  /**
   * User's permission for Auto Refresh Feature
   */
  useEffect(() => {
    const userPreference = sessionStorage.getItem('autoRefresh');
    if (userPreference !== null) {
      setShowModal(false);
      setAutoRefresh(userPreference === 'true');
    }
  }, []);

  useEffect(() => {
    NewsApiGateway.getTopHeadlines()
      .then((articles) => setTopHeadlines(articles))
      .catch(() => {});
}, []);

  const handleModalChoice = (choice) => {
    setShowModal(false);
    if (choice) {
      setAutoRefresh(true);
      sessionStorage.setItem('autoRefresh', 'true');
    } else {
      sessionStorage.setItem('autoRefresh', 'false');
    }
  };

  /**
   * Infinite Scroll Observer
   */
  const observer = useRef();
  const lastArticleRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);


  const goBack = () => {
    navigate(-1);
  }

  return (
    <Layout>
      {showModal ?
        <Modal 
          onConfirm={() => handleModalChoice(true)} 
          onCancel={() => handleModalChoice(false)} 
          /> : null
      }
      <div className='news-list'>
        {loading ? <SwiperSkeleton/> : 
          <Swiper
            modules={[Pagination,Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              1024: {
                slidesPerView: 3,
                spaceBetween: 20
              },
            }}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
          >
            {topHeadlines.slice(0, 6).map((article,index) => (
              <SwiperSlide key={index}>
                <img className='swiper-slide__image' src={article.urlToImage} alt={article.title} />
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <div className='swiper__bottom'>
                  {
                    isInReadingList(article.url)
                    ? <button onClick={() => removeFromReadingList(article.url)}>
                        <img className='reading-list-icon' src={removeIcon} alt="icon" />Remove my read list
                      </button>
                    : <button onClick={() => addToReadingList(article)}>
                        <img className='reading-list-icon' src={plusIcon} alt="icon" />Add my read list
                      </button>
                  }
                  <span className='time'>
                    {extractTime(article.publishedAt)}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        }
        <div className='articles-container'>
          <div className='articles-header'>
            <h2>
              {searchTerm.replace(',','+')}
            </h2>
            <button className='go-back-button' onClick={goBack}>
              {'< Go To News'}
            </button>
          </div>
          <div className="articles-list">
            {loading ? Array(5).fill(<Skeleton />) :
              searchedArticles.map((article, index) => 
                <ArticleItem
                  key={index}
                  index={index}
                  article={article}
                  lastArticleRef={lastArticleRef}
                  isLastItem={index === searchedArticles.length - 1}
                />
              )
            }
            {loading && <div>Loading more articles...</div>}
          </div>
        </div>
      </div>
    </Layout>
  );
}
