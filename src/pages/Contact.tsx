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
        <p>このサイト見てくれてありがとうございます！</p>
        <p>「ここ間違ってるよ」とか「この情報もあるよ」とか「サイトのここがイマイチ」とか、なんでも教えてください。一人で作ってるので見落としとかめちゃくちゃあると思います。</p>
      </section>

      {/* お問い合わせフォーム */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">📧 とりあえずここから連絡ください</h2>
        <div className="bg-gray-50 rounded p-4 mb-4">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSc0eNUBnr2IjyyDuXQS4_z9vKy5NZvdpl8sJ6XLZskp_PE4BQ/viewform?embedded=true" 
            title="お問い合わせフォーム" 
            className="w-full min-h-[750px] sm:min-h-[800px] border-none rounded"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
          >
            読み込んでいます…
          </iframe>
        </div>
        <div className="bg-blue-50 rounded p-3 border-l-4 border-blue-500">
          <p className="text-blue-800 text-sm">
            <strong>⏰ 返事のタイミング：</strong>だいたい1週間以内には返します。内容によってはもうちょっとかかるかも。
          </p>
        </div>
      </section>

      {/* お問い合わせの種類 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">📝 こんなこと教えてもらえると助かります</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2 text-red-600">🔧 間違いとか追加情報とか</h3>
            <p className="mb-2">「ここ違うよ」「この情報抜けてる」みたいなやつ</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-700">
              <li>曲名の間違いとか誤字</li>
              <li>セトリの曲順が違う</li>
              <li>アンコールの情報とか特別なことやった時の話</li>
              <li>開催日とか会場の情報で足りないやつ</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2 text-blue-600">🎬 映像とかの情報</h3>
            <p className="mb-2">載ってない映像作品とかの話</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-700">
              <li>DVD/Blu-rayで何が収録されてるか</li>
              <li>テレビでやったやつとか配信の話</li>
              <li>FC限定で出た映像の情報</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2 text-green-600">💡 サイトをもっと良くするアイデア</h3>
            <p className="mb-2">「こうしたらもっと使いやすくない？」みたいなやつ</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-700">
              <li>検索がもっと使いやすくなるアイデア</li>
              <li>情報の見せ方の提案</li>
              <li>「こんな機能あったらいいのに」</li>
              <li>「ここが使いづらい」の報告</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-600">💬 その他なんでも</h3>
            <p>上に当てはまらないことでも何でもどうぞ。愚痴でも大丈夫です。</p>
          </div>
        </div>
      </section>

      {/* 個人情報の取り扱い */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">🔐 個人情報とかの話</h2>
        <div className="bg-purple-50 rounded p-4 border-l-4 border-purple-500">
          <p className="text-purple-700">送ってもらった個人情報は、<Link to="/legal" className="underline text-purple-600 hover:text-purple-800">プライバシーポリシー</Link>に書いてあるとおりちゃんと管理します。お問い合わせの返事以外には使いません。当たり前ですが。</p>
        </div>
      </section>

      {/* 追加セクション：情報提供のお願い */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-orange-600">🙏 特にお願いしたいこと</h2>
        <div className="bg-orange-50 rounded p-4 border-l-4 border-orange-500">
          <div className="space-y-3">
            <div>
              <h4 className="font-bold text-orange-800">参戦した時の記憶とか</h4>
              <p className="text-sm text-orange-700">「このライブでこんなことあった」とか「この曲の時お客さんがこうだった」みたいな現場の空気感。公式情報だけじゃ分からないリアルな話、めちゃくちゃ貴重です。</p>
            </div>
            <div>
              <h4 className="font-bold text-orange-800">レアな情報</h4>
              <p className="text-sm text-orange-700">FC会報に載ってたけどネットには出てない情報とか、パンフレットの詳細とか。持ってない人のために教えてもらえると嬉しいです。</p>
            </div>
            <div>
              <h4 className="font-bold text-orange-800">古いライブの記録</h4>
              <p className="text-sm text-orange-700">特に初期のライブとか、情報が少ないやつ。当時参戦した人の記憶とか、チケットの半券とかパンフとか持ってる人いたら神です。</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ風のセクション */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-600">❓ よくある質問っぽいやつ</h2>
        <div className="space-y-3">
          <div className="bg-indigo-50 rounded p-4">
            <h4 className="font-bold text-indigo-800 mb-2">Q. 匿名で連絡したい</h4>
            <p className="text-sm text-indigo-700">A. フォームで「返事いらない」を選んでもらえれば、メアドとか入れなくて大丈夫です。</p>
          </div>
          <div className="bg-indigo-50 rounded p-4">
            <h4 className="font-bold text-indigo-800 mb-2">Q. 確実じゃない情報でも送っていい？</h4>
            <p className="text-sm text-indigo-700">A. 全然大丈夫です。「多分こうだった気がする」でも教えてください。こっちで確認します。</p>
          </div>
          <div className="bg-indigo-50 rounded p-4">
            <h4 className="font-bold text-indigo-800 mb-2">Q. 長文になっちゃうけど大丈夫？</h4>
            <p className="text-sm text-indigo-700">A. むしろ詳しい方が助かります。熱い語りも大歓迎。</p>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline hover:text-[#5a8a94]">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default Contact; 