import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>このサイトについて - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトについて。T.M.Revolutionの過去30回のライブツアーの詳細情報を提供し、あなたの投票をサポートします。運営方針、データの信頼性、収益化について透明性を持ってご説明します。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">このサイトについて</h1>

      {/* サイトの想い */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-red-600">🎵 なぜこのサイトを作ったか</h2>
        <div className="bg-red-50 rounded p-4 border-l-4 border-red-500">
          <p className="font-medium mb-3">VOTE30のアナウンス見た瞬間、「えっ待って無理」って思いませんでした？</p>
          <p>30回から選べって言われても、どれも愛しすぎて選べるわけないじゃないですか...。で、いざ調べようとしたら情報がバラバラで、「あのライブのセトリどこに書いてあるんだっけ」とか「DVDになってたっけ？」とか、もう大混乱。</p>
          <p className="mt-2">これは同じ状況の人絶対いるでしょって思って作りました。別に立派な動機とかじゃないです。単純に「こういうのあったら便利じゃん？」っていう。</p>
        </div>
      </section>

      {/* サイトの特徴 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">✨ 何ができるサイトなのか</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2">投票で迷ってる人向けの情報整理</h3>
            <p>セトリ見ても「で、どれがいいの？」ってなりますよね。なので「投票するなら知りたいのこれでしょ」っていう情報をまとめました。どのライブにどんな特色があるのか、パッと見て分かるようにしてあります。完璧ではないけど。</p>
          </div>
          <div className="bg-blue-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2">1996年から2024年まで全部調べました</h3>
            <p>公式のライブツアー30回分、セトリ付きで全部載せてます。めちゃくちゃ大変でした。途中で「なんでこんなことしてるんだろう」って思ったこともありましたが、やりきりました。たぶん他にこんなことしてる人いない。</p>
          </div>
          <div className="bg-blue-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2">投票用紙のプレビュー</h3>
            <p>座席番号入れると投票用紙がどうなるか見れます。当日「あれ、これどう書くんだっけ」ってならないように。地味に便利だと思います。</p>
          </div>
        </div>
      </section>

      {/* 運営者について */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-green-600">👨‍💻 サイト作ってる人のこと</h2>
        <div className="bg-green-50 rounded p-4 border-l-4 border-green-500">
          <h3 className="text-lg font-bold mb-2">ただのT.M.R中毒者です</h3>
          <div className="space-y-2">
            <p>・<strong>ファン歴</strong>：20年ちょっと。最初に行ったライブで人生変わりました</p>
            <p>・<strong>ライブ回数</strong>：数えたくないけど多分50回は超えてる（家計圧迫）</p>
            <p>・<strong>データ収集癖</strong>：気づいたら10年以上、パンフとか雑誌とかため込んでた</p>
            <p>・<strong>本業</strong>：Web関係の仕事してるので、サイト作るのは慣れてます</p>
          </div>
          <p className="mt-3 text-sm text-gray-600">要するに、T.M.R好きすぎて色々やってたら、なんかサイト作れるようになってた人です。</p>
        </div>
      </section>

      {/* データについて */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-purple-600">📚 情報はどこから持ってきてるか</h2>
        <div className="space-y-3">
          <div className="bg-purple-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2">基本は公式情報です</h3>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
              <li>公式サイトの情報</li>
              <li>DVD・Blu-rayの収録内容（持ってるやつは全部確認）</li>
              <li>ファンクラブの会報とか</li>
              <li>信頼できるファンの人からの情報</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded p-4">
            <h3 className="text-lg font-bold mb-2">間違いがあったらごめんなさい</h3>
            <p className="text-sm">できるだけちゃんと調べてますが、間違いもあると思います。複数のソースで確認して、それでも分からない時は「不明」って書いてます。適当なこと書くのは良くないので。間違い見つけたら教えてください。</p>
          </div>
        </div>
      </section>

      {/* サイト運営について */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-orange-600">💸 お金の話（大事なので）</h2>
        <div className="bg-orange-50 rounded p-4 border-l-4 border-orange-500">
          <h3 className="text-lg font-bold mb-2">正直に言います</h3>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-bold">サーバー代とかかかるんです</h4>
              <p>このサイト動かすのにお金かかります。サーバー代とかドメイン代とか。月々だとそんなでもないけど、年間だとそれなりに。なので広告とかアフィリエイトで費用をまかなってます。</p>
            </div>
            <div>
              <h4 className="font-bold">でも変なことはしません</h4>
              <p>お金のために<strong>変な商品勧めたり、関係ない広告バンバン出したりはしません</strong>。ファンサイトとしてちゃんとしていたいので。あくまで運営費をまかなう程度です。</p>
            </div>
            <div>
              <h4 className="font-bold">サイトの内容に口出しされません</h4>
              <p>広告出してもらってるからって、サイトの内容を変えろとか言われることはないです。そういうのは断ってます。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 利用者について */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-600">🎯 こんな人に使ってほしい</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 rounded p-4">
            <h3 className="font-bold mb-2">VOTE30で迷ってる人</h3>
            <p className="text-sm">とりあえずここ見とけば情報は揃います</p>
          </div>
          <div className="bg-indigo-50 rounded p-4">
            <h3 className="font-bold mb-2">T.M.Rファン</h3>
            <p className="text-sm">「あのライブどんなだったっけ」の答えがあります</p>
          </div>
          <div className="bg-indigo-50 rounded p-4">
            <h3 className="font-bold mb-2">セトリ調べたい人</h3>
            <p className="text-sm">「あの曲いつやったっけ」問題を解決</p>
          </div>
          <div className="bg-indigo-50 rounded p-4">
            <h3 className="font-bold mb-2">DVD選びに迷う人</h3>
            <p className="text-sm">どれ買えばいいか分からない時に</p>
          </div>
        </div>
      </section>

      {/* みんなで作っていこう */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-600">🤝 一人じゃ限界があるので</h2>
        <div className="bg-gray-50 rounded p-4">
          <h3 className="text-lg font-bold mb-2">間違いとか追加情報とかあったら教えて</h3>
          <p className="text-sm">一人で全部調べるのは無理でした。明らかに間違ってるとこあったり、「この情報もあるよ」ってのがあったら、<Link to="/contact" className="underline text-[#6ea7b2] hover:text-[#5a8a94]">お問い合わせフォーム</Link>から教えてください。</p>
          <p className="mt-2 text-sm">ファンの皆で作っていけたらいいなと思ってます。完璧なサイトにはならないかもしれないけど、それなりに使えるものにはしたい。</p>
        </div>
      </section>

      {/* 大事なお知らせ */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-600">⚠️ 一応言っておくと</h2>
        <div className="bg-gray-50 rounded p-4">
          <p className="text-sm mb-2"><strong>個人サイトです</strong>：ただの個人がやってるファンサイトです。ソニーミュージックとかとは関係ないです。</p>
          <p className="text-sm"><strong>細かい規約とか</strong>：プライバシーポリシーとかは<Link to="/legal" className="underline text-[#6ea7b2] hover:text-[#5a8a94]">こっち</Link>に書いてあります。読まなくても大丈夫だと思うけど。</p>
        </div>
      </section>

      {/* 関連リンク */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">🔗 他のページとか</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded border p-4">
            <h3 className="font-bold mb-2">サイト関連</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/legal" className="underline text-[#6ea7b2] hover:text-[#5a8a94]">プライバシーポリシー</Link></li>
              <li><Link to="/contact" className="underline text-[#6ea7b2] hover:text-[#5a8a94]">お問い合わせ</Link></li>
              <li><Link to="/sitemap" className="underline text-[#6ea7b2] hover:text-[#5a8a94]">サイトマップ</Link></li>
            </ul>
          </div>
          <div className="bg-white rounded border p-4">
            <h3 className="font-bold mb-2">更新とか</h3>
            <p className="text-sm text-gray-600">
              作った日：2025年○月○日<br />
              最後に更新：2025年○月○日<br />
              作った人：VOTE30-Support
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline hover:text-[#5a8a94]">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default About; 