import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Disclaimer = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem', color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <Helmet>
        <title>免責事項 - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトの免責事項ページです。情報の正確性、外部リンク、著作権などについてご説明しています。" />
      </Helmet>
      <h1 style={{ color: '#6ea7b2', borderBottom: '2px solid #6ea7b2', paddingBottom: '0.5rem', marginBottom: '2rem' }}>免責事項</h1>

      <p>当サイトは、個人による非営利運営の情報提供サイトです。可能な限り正確かつ最新の情報を掲載するよう努めておりますが、以下の点についてご理解のうえご利用ください。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>1. 情報の正確性について</h2>
      <p>掲載内容には十分注意を払っておりますが、情報の正確性・信頼性・適時性を保証するものではありません。万が一誤情報や表現の不備がある場合は、お手数ですがご指摘いただけますと幸いです。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>2. サイト利用による損害等</h2>
      <p>当サイトの情報を利用・参考にされたことにより生じた損害・損失について、当サイト運営者は一切の責任を負いかねます。</p>
      <p>情報の利用は、すべてご自身の判断と責任においてお願いいたします。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>3. 外部リンクについて</h2>
      <p>当サイトには外部サイトへのリンクが含まれることがあります。リンク先で提供される情報やサービス等に関して、当サイトは一切の責任を負いません。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>4. コンテンツの著作権</h2>
      <p>当サイトに掲載されている文章、画像、その他のコンテンツの著作権は、当サイトまたは正当な権利を有する第三者に帰属します。</p>
      <p>無断での複製、転載、改変等は禁止いたします。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>5. 免責事項の変更について</h2>
      <p>本免責事項の内容は、法令変更やサービス内容の変更に応じて、予告なく改定される場合があります。</p>
      <p>その場合は、本ページにて最新の内容を掲示いたします。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>関連リンク</h2>
      <ul>
        <li><Link to="/privacy-policy">プライバシーポリシー</Link></li>
        <li><Link to="/contact">お問い合わせ</Link></li>
      </ul>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>制定日</h2>
      <p>2025年5月28日<br />運営者: KEIJI（個人による非営利運営）</p>

      <Link to="/" className="back-link" style={{ display: 'inline-block', marginTop: '2rem', color: '#6ea7b2', textDecoration: 'none' }}>← トップページに戻る</Link>
    </div>
  );
};

export default Disclaimer; 