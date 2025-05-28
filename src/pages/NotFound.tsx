import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem', textAlign: 'center', color: '#333' }}>
      <Helmet>
        <title>404 - ページが見つかりません | VOTE30選挙対策支援サイト</title>
        <meta name="description" content="お探しのページは見つかりませんでした。VOTE30選挙対策支援サイトのトップページにお戻りください。" />
      </Helmet>
      <h1 style={{ fontSize: '3rem', color: '#6ea7b2', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>お探しのページは見つかりませんでした。</p>
      <Link to="/" style={{ color: '#6ea7b2', textDecoration: 'none', fontWeight: 'bold' }}>トップページに戻る</Link>
    </div>
  );
};

export default NotFound; 