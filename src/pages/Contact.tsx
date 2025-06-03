import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>お問い合わせ - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトのお問い合わせページです。ライブ情報の修正や追加情報、サイトへのご意見などをお気軽にお送りください。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">お問い合わせ</h1>

      <section className="mb-6">
        <p>VOTE30選挙対策支援サイトをご利用いただき、ありがとうございます。</p>
        <p>ライブ情報の修正・追加、サイトの改善提案、その他ご質問・ご意見などがございましたら、以下のフォームよりお気軽にお問い合わせください。</p>
      </section>

      {/* お問い合わせフォーム */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">📧 お問い合わせフォーム</h2>
        <div className="bg-gray-50 rounded p-4 mb-4">
          <iframe src="https://forms.gle/xxxxxxxxxxxxx" title="お問い合わせフォーム" className="w-full min-h-[400px] sm:min-h-[600px] border-none rounded" />
        </div>
        <div className="bg-blue-50 rounded p-3 border-l-4 border-blue-500">
          <p className="text-blue-800 text-sm">
            <strong>⏰ 回答時間：</strong>通常1週間以内に回答いたします。内容によってはお時間をいただく場合があります。
          </p>
        </div>
      </section>

      {/* お問い合わせの種類 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">📝 皆さんからの情報提供をお待ちしています</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2 text-red-600">🔧 ライブ情報の修正・追加</h3>
            <p className="mb-2">セットリストや公演詳細の誤りや不足情報</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-700">
              <li>曲名の誤字・脱字</li>
              <li>セットリストの曲順間違い</li>
              <li>アンコールや特別演出の追加情報</li>
              <li>開催日程・会場情報の追加要望</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2 text-blue-600">🎬 映像・音源情報の追加</h3>
            <p className="mb-2">未掲載の映像作品の情報</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-700">
              <li>DVD/Blu-ray作品の収録情報</li>
              <li>TV放送・配信情報</li>
              <li>FC限定映像の情報</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2 text-green-600">💡 サイト機能の改善提案</h3>
            <p className="mb-2">使いやすさ向上のアイデア</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-700">
              <li>検索機能の改善</li>
              <li>表示方法の提案</li>
              <li>新機能のアイデア</li>
              <li>操作性の改善案</li>
            </ul>
          </div>
          

          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-600">💬 その他</h3>
            <p>上記以外のご意見・ご要望・ご質問</p>
          </div>
        </div>
      </section>

      {/* 個人情報の取り扱い */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">🔐 個人情報の取り扱い</h2>
        <div className="bg-purple-50 rounded p-4 border-l-4 border-purple-500">
          <p className="text-purple-700">お問い合わせいただいた個人情報は、当サイトの<Link to="/legal" className="underline text-purple-600 hover:text-purple-800">プライバシーポリシー</Link>に基づいて適切に管理いたします。お問い合わせへの回答以外の目的で使用することはありません。</p>
        </div>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline hover:text-[#5a8a94]">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default Contact; 