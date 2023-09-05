import { useState } from 'react';
import { localStorageKeys } from '@util/constants/localStorage';

export const useReadingList = () => {
  const [readingList, setReadingList] = useState(() => {
    const savedList = localStorage.getItem(localStorageKeys.readingList);
    return savedList ? JSON.parse(savedList) : [];
  });

  const addToReadingList = (article) => {
    const newList = [...readingList, article];
    setReadingList(newList);
    localStorage.setItem(localStorageKeys.readingList, JSON.stringify(newList));
  };

  const removeFromReadingList = (articleUrl) => {
    const newList = readingList.filter(item => item.url !== articleUrl);
    setReadingList(newList);
    localStorage.setItem(localStorageKeys.readingList, JSON.stringify(newList));
  };
  

  const isInReadingList = (articleUrl) => {
    return readingList.some(item => item.url === articleUrl);
  }

  return { readingList, addToReadingList, removeFromReadingList, isInReadingList };
}
