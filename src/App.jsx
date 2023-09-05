import { useEffect,useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NewsSources } from '@components/NewsSources';
import { NewsList } from '@components/NewsList';
import { NewsDetail } from '@components/NewsDetail';
import { ReadingList } from '@components/ReadingList';
import { NotFound } from '@components/NotFound';
import { CustomModal } from '@components/CustomModal/CustomModal';
import { useTheme } from './context/ThemeContext';
import { NewsProvider } from './context/NewsContext';

function App() {
  const { theme } = useTheme();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  CustomModal.showError = (message) => {
    setModalMessage(message);
    setShowModal(true);
  }

  return (
    <NewsProvider>
      <Router>
          <Routes>
            <Route path="/" element={<NewsSources />} />
            <Route path="/news/:searchTerm" element={<NewsList />} />
            <Route path="/detail" element={<NewsDetail />} />
            <Route path="/reading-list" element={<ReadingList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CustomModal
            show={showModal}
            onClose={() => setShowModal(false)}
            title="Error"
          >
            {modalMessage}
        </CustomModal>
      </Router>
    </NewsProvider>
  );
}

export default App;
