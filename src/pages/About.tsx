import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem', color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <Helmet>
        <title>このサイトについて - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトについての詳細情報です。サイトの目的、特徴、運営者プロフィールなどをご紹介しています。" />
      </Helmet>
      <h1 style={{ color: '#6ea7b2', borderBottom: '2px solid #6ea7b2', paddingBottom: '0.5rem', marginBottom: '2rem' }}>このサイトについて</h1>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>サイトの目的</h2>
      <p>VOTE30選挙対策支援サイトは、30代の有権者を中心に、選挙に関する情報を分かりやすく提供し、より多くの方々が政治に参加できるよう支援することを目的としています。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>主な特徴</h2>
      <ul>
        <li>選挙に関する基本的な情報の提供</li>
        <li>投票方法や手続きの解説</li>
        <li>選挙に関する最新ニュースの紹介</li>
        <li>選挙に関するQ&A</li>
      </ul>

      <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: 8, marginTop: '2rem' }}>
        <h2 style={{ color: '#6ea7b2', marginTop: 0, marginBottom: '1rem' }}>運営者プロフィール</h2>
        <p>
          名前：KEIJI<br />
          経歴：選挙に関する情報提供活動を10年以上継続<br />
          資格：行政書士（選挙関連業務経験あり）<br />
          趣味：政治・経済の研究、読書
        </p>
      </div>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>サイトの特徴</h2>
      <h3 style={{ color: '#6ea7b2', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. 信頼性の高い情報</h3>
      <p>選挙管理委員会や政府の公式情報を基に、正確な情報を提供しています。</p>
      <h3 style={{ color: '#6ea7b2', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. 分かりやすい解説</h3>
      <p>専門用語を避け、誰にでも理解しやすい表現を心がけています。</p>
      <h3 style={{ color: '#6ea7b2', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. 最新情報の提供</h3>
      <p>選挙に関する最新の情報を随時更新しています。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>お問い合わせ</h2>
      <p>サイトに関するご質問やご意見は、<Link to="/contact">お問い合わせフォーム</Link>よりお気軽にお問い合わせください。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>関連リンク</h2>
      <ul>
        <li><Link to="/privacy-policy">プライバシーポリシー</Link></li>
        <li><Link to="/disclaimer">免責事項</Link></li>
        <li><Link to="/contact">お問い合わせ</Link></li>
      </ul>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>制定日</h2>
      <p>2025年5月28日<br />運営者: KEIJI（個人による非営利運営）</p>

      <Link to="/" className="back-link" style={{ display: 'inline-block', marginTop: '2rem', color: '#6ea7b2', textDecoration: 'none' }}>← トップページに戻る</Link>
    </div>
  );
};

export default About; 