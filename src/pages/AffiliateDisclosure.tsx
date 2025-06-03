import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AffiliateDisclosure = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>広告について - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトの広告についての説明ページです。Google AdSenseやAmazonアソシエイトプログラムの利用状況、広告収入の使途などを詳しくご説明しています。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">広告について</h1>

      <section className="mb-6">
        <p>当サイトでは、第三者配信の広告サービス（Google AdSense）を利用しています。このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報 『Cookie』(氏名、住所、メール アドレス、電話番号は含まれません) を使用することがあります。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. 広告の表示について</h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Google AdSense</li>
          <li>Amazonアソシエイトプログラム</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. 広告収入について</h2>
        <p>当サイトは、広告収入によって運営されています。広告収入は、サイトの維持・改善、コンテンツの充実化に使用されます。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. 広告の選択について</h2>
        <p>当サイトに掲載される広告は、広告配信事業者によって自動的に選択されています。広告の内容は、当サイトの運営者が直接管理・制御するものではありません。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. プライバシーポリシーとの関係</h2>
        <p>広告配信事業者が使用するCookieやその他の技術に関する詳細は、当サイトの<Link to="/privacy-policy" className="underline text-[#6ea7b2]">プライバシーポリシー</Link>をご覧ください。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. 広告の無効化について</h2>
        <p>ユーザーは、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline text-[#6ea7b2]">Google の広告設定ページ</a>で、パーソナライズされた広告を無効にすることができます。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. お問い合わせ</h2>
        <p>広告に関するお問い合わせは、<Link to="/contact" className="underline text-[#6ea7b2]">お問い合わせフォーム</Link>よりお願いいたします。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">制定日</h2>
        <p>2025年○月○日<br />運営者: VOTE30-Support（個人による非営利運営）</p>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default AffiliateDisclosure; 