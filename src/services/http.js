import axios from 'axios';
import {CustomModal} from '@components/CustomModal/CustomModal';

const newsApi = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO remove this interceptor. the key has Vercel.
// newsApi.interceptors.request.use(config => {
//   config.headers['Authorization'] = `Bearer ${import.meta.env.VITE_PUBLIC_NEWS_KEY}`;
//   return config;
// });

newsApi.interceptors.response.use(
  response => response,
  error => {
    let errorMessage = 'Something went wrong.';
    if (error?.response?.status === 429) {
      errorMessage = 'You have exceeded the endpoint usage limit.';
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    CustomModal.showError(errorMessage);

    return Promise.reject(error);
  }
);

export {
  newsApi,
};
