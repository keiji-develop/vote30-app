import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Sitemap = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>サイトマップ - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトのサイトマップです。各ページへのリンクを掲載しています。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">サイトマップ</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">メインページ</h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><Link to="/" className="text-[#6ea7b2] hover:underline">トップページ</Link></li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">サイト情報</h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><Link to="/about" className="text-[#6ea7b2] hover:underline">このサイトについて</Link></li>
            <li><Link to="/sitemap" className="text-[#6ea7b2] hover:underline">サイトマップ</Link></li>
            <li><Link to="/legal" className="text-[#6ea7b2] hover:underline">プライバシーポリシー</Link></li>
            <li><Link to="/contact" className="text-[#6ea7b2] hover:underline">お問い合わせ</Link></li>
          </ul>
        </section>
      </div>
      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default Sitemap; 