import Layout from '@components/Layout'
import './NotFound.scss'

export const NotFound = () => {
  return (
    <Layout>
      <div className='not-found-404'>
        <h2>404</h2>
        <p>Sayfa bulunamadı!</p>
      </div>
    </Layout>
  );
};
