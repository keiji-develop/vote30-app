import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Cookies = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem', color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <Helmet>
        <title>Cookieの使用について - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトのCookie使用についての説明ページです。Cookieの種類、使用目的、管理方法などを詳しくご説明しています。" />
      </Helmet>
      <h1 style={{ color: '#6ea7b2', borderBottom: '2px solid #6ea7b2', paddingBottom: '0.5rem', marginBottom: '2rem' }}>Cookieの使用について</h1>

      <p>当サイトでは、ユーザーエクスペリエンスの向上とサイトの改善のために、Cookie（クッキー）を使用しています。このページでは、Cookieの使用目的と管理方法について説明します。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>1. Cookieとは</h2>
      <p>Cookieとは、ウェブサイトがユーザーのコンピュータに保存する小さなテキストファイルです。これにより、ウェブサイトはユーザーの設定や行動を記憶し、より良いサービスを提供することができます。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>2. 当サイトで使用するCookieの種類</h2>
      <h3 style={{ color: '#6ea7b2', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2.1 必須Cookie</h3>
      <p>サイトの基本的な機能を提供するために必要なCookieです。これらは無効にすることはできません。</p>
      <ul>
        <li>セッション管理</li>
        <li>セキュリティ機能</li>
      </ul>

      <h3 style={{ color: '#6ea7b2', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2.2 分析Cookie</h3>
      <p>Google Analyticsによって使用され、サイトの利用状況を分析するために使用されます。</p>
      <ul>
        <li>ページビュー数</li>
        <li>訪問者の行動分析</li>
        <li>サイトの改善点の特定</li>
      </ul>

      <h3 style={{ color: '#6ea7b2', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2.3 広告Cookie</h3>
      <p>Google AdSenseによって使用され、ユーザーに関連性の高い広告を表示するために使用されます。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>3. Cookieの管理方法</h2>
      <p>ブラウザの設定を変更することで、Cookieの使用を制限したり、無効にしたりすることができます。ただし、その場合、サイトの一部の機能が正常に動作しない可能性があります。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>4. プライバシーポリシーとの関係</h2>
      <p>Cookieの使用に関する詳細な情報は、当サイトの<Link to="/privacy-policy">プライバシーポリシー</Link>をご覧ください。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>5. お問い合わせ</h2>
      <p>Cookieの使用に関するご質問やご意見は、以下のフォームよりお願いいたします。</p>
      <p><Link to="/contact">→ お問い合わせフォームはこちら</Link></p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>制定日</h2>
      <p>2025年○月○日<br />運営者: VOTE30-Support（個人による非営利運営）</p>

      <Link to="/" className="back-link" style={{ display: 'inline-block', marginTop: '2rem', color: '#6ea7b2', textDecoration: 'none' }}>← トップページに戻る</Link>
    </div>
  );
};

export default Cookies; 