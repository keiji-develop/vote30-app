import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Sitemap = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>サイトマップ - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトの全ページリンク集です。どこに何があるか分からなくなった時にどうぞ。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">サイトマップ</h1>
      
      <section className="mb-6">
        <p>「あのページどこだっけ？」って時にどうぞ。</p>
        <p>このサイトにあるページを全部まとめました。</p>
      </section>

      <div className="space-y-6">
        <section className="bg-blue-50 rounded p-4">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">🏠 メインページ</h2>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><Link to="/" className="text-[#6ea7b2] hover:underline">トップページ</Link> - ライブツアー一覧とか投票用紙プレビューとか</li>
          </ul>
        </section>

        <section className="bg-green-50 rounded p-4">
          <h2 className="text-xl font-semibold mb-3 text-green-600">ℹ️ サイト情報</h2>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><Link to="/about" className="text-[#6ea7b2] hover:underline">このサイトについて</Link> - 作った人の話とかサイトの説明とか</li>
            <li><Link to="/contact" className="text-[#6ea7b2] hover:underline">お問い合わせ</Link> - 間違いとか追加情報とか教えてください</li>
            <li><Link to="/sitemap" className="text-[#6ea7b2] hover:underline">サイトマップ</Link> - 今見てるこのページです</li>
          </ul>
        </section>

        <section className="bg-purple-50 rounded p-4">
          <h2 className="text-xl font-semibold mb-3 text-purple-600">📜 法的文書とか</h2>
          <p className="text-sm text-gray-600 mb-3">読まなくても大丈夫だと思うけど、一応置いてます。</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><Link to="/legal" className="text-[#6ea7b2] hover:underline">プライバシーポリシー</Link> - 個人情報とかクッキーとかの話</li>
          </ul>
        </section>
      </div>

      <section className="mt-8 bg-gray-50 rounded p-4">
        <h2 className="text-xl font-semibold mb-3 text-gray-600">🔍 探してるページが見つからない時</h2>
        <p className="text-sm text-gray-700 mb-2">上にないページを探してる場合は：</p>
        <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-700">
          <li>URLを間違えてるかも → もう一度確認してみてください</li>
          <li>ページが移動してるかも → <Link to="/contact" className="text-[#6ea7b2] hover:underline">お問い合わせ</Link>から教えてください</li>
          <li>そもそもないページかも → <Link to="/" className="text-[#6ea7b2] hover:underline">トップページ</Link>から探してみてください</li>
        </ul>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline hover:text-[#5a8a94]">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default Sitemap; 