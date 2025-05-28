import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Sitemap = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem', color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <Helmet>
        <title>サイトマップ - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトのHTML版サイトマップです。全ページへのリンク一覧を掲載しています。" />
      </Helmet>
      <h1 style={{ color: '#6ea7b2', borderBottom: '2px solid #6ea7b2', paddingBottom: '0.5rem', marginBottom: '2rem' }}>サイトマップ</h1>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>メインページ</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li><Link to="/">トップページ</Link></li>
      </ul>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>サイト情報</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li><Link to="/about">このサイトについて</Link></li>
        <li><Link to="/contact">お問い合わせ</Link></li>
      </ul>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>法的文書</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li><Link to="/privacy-policy">プライバシーポリシー</Link></li>
        <li><Link to="/affiliate-disclosure">広告について</Link></li>
        <li><Link to="/disclaimer">免責事項</Link></li>
        <li><Link to="/cookies">Cookieの使用について</Link></li>
        <li><Link to="/spec-commercial">特定商取引法に基づく表記</Link></li>
      </ul>

      <Link to="/" className="back-link" style={{ display: 'inline-block', marginTop: '2rem', color: '#6ea7b2', textDecoration: 'none' }}>← トップページに戻る</Link>
    </div>
  );
};

export default Sitemap; 