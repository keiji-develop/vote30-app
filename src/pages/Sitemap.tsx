import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Sitemap = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>サイトマップ - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトの全ページリンク集です。どこに何があるか分からなくなった時にどうぞ。" />
      </Helmet>
      <h1 className="text-heading-1 mb-6 border-b-2 border-[#6ea7b2] pb-2">サイトマップ</h1>
      
      <section className="mb-6">
        <p>「あのページどこだっけ？」って時にどうぞ。</p>
        <p>このサイトにあるページを全部まとめました。</p>
      </section>

      <div className="space-y-8">
        <section className="bg-blue-50 rounded p-4">
          <h2 className="text-heading-2 mb-3 text-blue-600">🏠 メインページ</h2>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><Link to="/" className="text-[#6ea7b2] hover:underline">トップページ</Link> - 候補公演一覧と投票サポート</li>
          </ul>
        </section>

        <section className="bg-green-50 rounded p-4">
          <h2 className="text-heading-2 mb-3 text-green-600">ℹ️ サイト情報</h2>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><Link to="/about" className="text-[#6ea7b2] hover:underline">このサイトについて</Link> - 作った理由とか使い方とか</li>
            <li><Link to="/contact" className="text-[#6ea7b2] hover:underline">お問い合わせ</Link> - 間違いとか追加情報とかあったら</li>
            <li><Link to="/sitemap" className="text-[#6ea7b2] hover:underline">サイトマップ</Link> - 今見てるこのページです</li>
          </ul>
        </section>

        <section className="bg-purple-50 rounded p-4">
          <h2 className="text-heading-2 mb-3 text-purple-600">📜 法的文書とか</h2>
          <p className="text-body-small text-gray-600 mb-3">読まなくても大丈夫だと思うけど、一応置いてます。</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><Link to="/legal" className="text-[#6ea7b2] hover:underline">プライバシーポリシー等</Link> - 個人情報とか広告とかの話</li>
          </ul>
        </section>
      </div>

      <section className="mt-8 bg-gray-50 rounded p-4">
        <h2 className="text-heading-2 mb-3 text-gray-600">🔍 探してるページが見つからない時</h2>
        <p className="text-body-small text-gray-700 mb-2">上にないページを探してる場合は：</p>
        <ul className="list-disc list-inside ml-4 space-y-1 text-body-small text-gray-700">
          <li>URLが間違ってる可能性があります</li>
          <li>ページが移動してるかもしれません</li>
          <li><Link to="/contact" className="text-[#6ea7b2] hover:underline">お問い合わせフォーム</Link>から教えてください</li>
        </ul>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline hover:text-[#5a8a94]">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default Sitemap; 