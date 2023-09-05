import { useState, useEffect } from 'react';
import Card from '@components/Card/Card';
import Layout from '@components/Layout';
import Filter from '@components/Filter/Filter';
import { Link } from 'react-router-dom';
import NewsApiGateway from '../../services/newsApi.gateway';
import './NewsSources.scss'

export const NewsSources = () => {
  const [sources, setSources] = useState([]);
  const [filteredSources, setFilteredSources] = useState([]);

  useEffect(() => {
    NewsApiGateway.getSources('en')
      .then((sources) => {
        setSources(sources);
        setFilteredSources(sources);
      })
      .catch((error) => {
        console.error("Error fetching sources:", error);
      });
  }, []);
  

  const filterSourcesByCategory = (selectedCategories) => {
    if (selectedCategories.length === 0) {
      setFilteredSources(sources);
    } else {
      const filtered = sources.filter(source => 
        selectedCategories.map(cat => cat.toLowerCase()).includes(source.category)
      );
      setFilteredSources(filtered);
    }
  }
  
  return (
    <Layout>
      <div className='news-container'>
        <Filter onFilterApply={filterSourcesByCategory} />
        <div className='news-wrapper'>
          {filteredSources?.map((source, index) => (
            <Link className='news-link' to={`/news/${source.category}`} key={source.id}>
              <Card key={index} source={source} />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
