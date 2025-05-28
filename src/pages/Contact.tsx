import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem', color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <Helmet>
        <title>お問い合わせ - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトのお問い合わせページです。ご質問、ご意見、ご要望などをお気軽にお送りください。" />
      </Helmet>
      <h1 style={{ color: '#6ea7b2', borderBottom: '2px solid #6ea7b2', paddingBottom: '0.5rem', marginBottom: '2rem' }}>お問い合わせ</h1>

      <p>当サイトに関するご質問、ご意見、ご要望などがございましたら、以下のフォームよりお気軽にお問い合わせください。</p>

      <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: 8, marginTop: '2rem' }}>
        <iframe src="https://forms.gle/xxxxxxxxxxxxx" title="お問い合わせフォーム" style={{ width: '100%', height: 800, border: 'none' }} />
      </div>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>お問い合わせの前に</h2>
      <p>以下の点についてご確認ください：</p>
      <ul>
        <li>よくある質問は<Link to="/faq">FAQページ</Link>をご覧ください。</li>
        <li>プライバシーポリシーは<Link to="/privacy-policy">こちら</Link>をご覧ください。</li>
        <li>免責事項は<Link to="/disclaimer">こちら</Link>をご覧ください。</li>
      </ul>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>お問い合わせの種類</h2>
      <p>以下のような内容についてお問い合わせいただけます：</p>
      <ul>
        <li>サイトの内容に関する質問</li>
        <li>情報の誤りや不備の報告</li>
        <li>改善提案</li>
        <li>その他のご意見・ご要望</li>
      </ul>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>回答について</h2>
      <p>お問い合わせいただいた内容について、できる限り早急に回答させていただきます。ただし、内容によっては回答に時間を要する場合や、お答えできない場合もございますので、ご了承ください。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>個人情報の取り扱い</h2>
      <p>お問い合わせいただいた個人情報は、当サイトの<Link to="/privacy-policy">プライバシーポリシー</Link>に基づいて適切に管理いたします。</p>

      <Link to="/" className="back-link" style={{ display: 'inline-block', marginTop: '2rem', color: '#6ea7b2', textDecoration: 'none' }}>← トップページに戻る</Link>
    </div>
  );
};

export default Contact; 