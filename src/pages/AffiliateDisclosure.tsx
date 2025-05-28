import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AffiliateDisclosure = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem', color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <Helmet>
        <title>広告について - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトの広告についての説明ページです。Google AdSenseやAmazonアソシエイトプログラムの利用状況、広告収入の使途などを詳しくご説明しています。" />
      </Helmet>
      <h1 style={{ color: '#6ea7b2', borderBottom: '2px solid #6ea7b2', paddingBottom: '0.5rem', marginBottom: '2rem' }}>広告について</h1>

      <p>当サイトでは、第三者配信の広告サービス（Google AdSense）を利用しています。このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報 『Cookie』(氏名、住所、メール アドレス、電話番号は含まれません) を使用することがあります。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>1. 広告の表示について</h2>
      <p>当サイトでは、以下の広告サービスを利用しています：</p>
      <ul>
        <li>Google AdSense</li>
        <li>Amazonアソシエイトプログラム</li>
      </ul>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>2. 広告収入について</h2>
      <p>当サイトは、広告収入によって運営されています。広告収入は、サイトの維持・改善、コンテンツの充実化に使用されます。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>3. 広告の選択について</h2>
      <p>当サイトに掲載される広告は、広告配信事業者によって自動的に選択されています。広告の内容は、当サイトの運営者が直接管理・制御するものではありません。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>4. プライバシーポリシーとの関係</h2>
      <p>広告配信事業者が使用するCookieやその他の技術に関する詳細は、当サイトの<Link to="/privacy-policy">プライバシーポリシー</Link>をご覧ください。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>5. 広告の無効化について</h2>
      <p>ユーザーは、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google の広告設定ページ</a>で、パーソナライズされた広告を無効にすることができます。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>6. お問い合わせ</h2>
      <p>広告に関するお問い合わせは、以下のフォームよりお願いいたします。</p>
      <p><Link to="/contact">→ お問い合わせフォームはこちら</Link></p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>制定日</h2>
      <p>2025年5月28日<br />運営者: KEIJI（個人による非営利運営）</p>

      <Link to="/" className="back-link" style={{ display: 'inline-block', marginTop: '2rem', color: '#6ea7b2', textDecoration: 'none' }}>← トップページに戻る</Link>
    </div>
  );
};

export default AffiliateDisclosure; 