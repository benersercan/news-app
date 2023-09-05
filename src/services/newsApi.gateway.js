import { newsApi } from './http';

class NewsApiGateway {

  static async getSources(language = 'en') {
    try {
      const response = await newsApi.get(`/sources?language=${language}`);
      return Promise.resolve(response.data.sources);
    } catch (error) {
      console.error("An error occurred while fetching sources:", error);
      return Promise.reject(error);
    }
  }

  static async fetchNews(searchTerm) {
    try {
        const response = await newsApi.get(`/everything?q=${encodeURIComponent(searchTerm)}&page=1&pageSize=10`);
        return Promise.resolve(response.data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        return Promise.reject(error);
    }
  }

  static async loadMoreArticles(searchTerm, page) {
    try {
        const response = await newsApi.get(`/everything?q=${encodeURIComponent(searchTerm)}&page=${page}&pageSize=10`);
        return Promise.resolve(response.data.articles);
    } catch (error) {
        console.error("Error loading more articles:", error);
        return Promise.reject(error);
    }
  }

  static async getTopHeadlines() {
    try {
        const response = await newsApi.get('/top-headlines?country=us');
        return Promise.resolve(response.data.articles);
    } catch (error) {
        console.error("Error fetching top headlines:", error);
        return Promise.reject(error);
    }
  }

}

export default NewsApiGateway;
