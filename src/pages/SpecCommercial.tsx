import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SpecCommercial = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem', color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <Helmet>
        <title>特定商取引法に基づく表記 - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトの特定商取引法に基づく表記です。運営者情報、サービス内容、料金体系などを詳しくご説明しています。" />
      </Helmet>
      <h1 style={{ color: '#6ea7b2', borderBottom: '2px solid #6ea7b2', paddingBottom: '0.5rem', marginBottom: '2rem' }}>特定商取引法に基づく表記</h1>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>1. 運営者情報</h2>
      <p>
        運営者名：KEIJI<br />
        所在地：非公開<br />
        連絡先：<a href="https://forms.gle/xxxxxxxxxxxxx" target="_blank" rel="noopener noreferrer">お問い合わせフォーム</a>
      </p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>2. サービス内容</h2>
      <p>選挙対策支援情報の提供</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>3. 料金</h2>
      <p>当サイトの情報提供は無料です。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>4. 支払方法</h2>
      <p>該当なし（無料サービス）</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>5. 商品の引渡し時期</h2>
      <p>該当なし（無料サービス）</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>6. 返品・キャンセルについて</h2>
      <p>該当なし（無料サービス）</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>7. 返品・交換について</h2>
      <p>該当なし（無料サービス）</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>8. プライバシーポリシー</h2>
      <p>当サイトのプライバシーポリシーは<Link to="/privacy-policy">こちら</Link>をご覧ください。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>9. 免責事項</h2>
      <p>当サイトの免責事項は<Link to="/disclaimer">こちら</Link>をご覧ください。</p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>10. お問い合わせ</h2>
      <p>ご不明な点がございましたら、以下のフォームよりお問い合わせください。</p>
      <p><Link to="/contact">→ お問い合わせフォームはこちら</Link></p>

      <h2 style={{ color: '#6ea7b2', marginTop: '2rem', marginBottom: '1rem' }}>制定日</h2>
      <p>2025年5月28日<br />運営者: KEIJI（個人による非営利運営）</p>

      <Link to="/" className="back-link" style={{ display: 'inline-block', marginTop: '2rem', color: '#6ea7b2', textDecoration: 'none' }}>← トップページに戻る</Link>
    </div>
  );
};

export default SpecCommercial; 