import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>このサイトについて - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="「ただの滋賀ない西ヲタ」が作った、T.M.R. LIVE ELECTION -VOTE 30-の投票対策支援サイト。臨時党大会の体験から生まれました。" />
      </Helmet>
      <h1 className="text-heading-1 mb-6 border-b-2 border-[#6ea7b2] pb-2">このサイトについて</h1>

      {/* サイトの想い */}
      <section className="mb-8">
        <h2 className="text-heading-2 mb-3" style={{ color: 'var(--error)' }}>🎵 なぜこのサイトを作ったか</h2>
        <div className="rounded p-4 border-l-4" style={{ 
          backgroundColor: 'var(--error-light)', 
          borderLeftColor: 'var(--error)' 
        }}>
          <p className="font-medium mb-3">2025年5月13日、東京ガーデンシアターでの「令和7年度 新党革命 臨時党大会」。</p>
          <p className="mb-3">
            本編が終わってターボコールの最中に突如流れる映像。「２０２５年５月１３日をもちまして・・・」って言われた時、「え？もしかして・・・？」って悪い予感で心がざわついたものの、その後にリバイバル公演開催予定のアナウンスに大興奮！だけど同時に、<strong>「えっ待って無理」</strong>って思いませんでした？
          </p>
          <p className="mb-3">
            30候補の中から選べって言われても、どれも参戦したくて仕方ないくらい愛してて、選べるわけないじゃないですか...。西ヲタになる前の公演もあれば、思い入れの強い公演もあるし、どれを選んでも後悔しそうで。
          </p>
          <p className="mb-3">
            そして終演後、投票をしにロビーに出てみたら、<strong>投票がマジで地獄だった</strong>。<br />
            まあ、それは次の項目でお話するとして、やっとの思いで投票した時には、色んな意味でもうぐったり。
          </p>

          <p className="mb-3">
            後日、どの公演にしようかと改めて調べようとしたら情報がバラバラで、「あのライブのセトリどこに書いてあるんだっけ」とか「どんなライブだったっけ？」とか、もう大混乱。これは同じ状況の人絶対いるでしょ？まとめたほうがいいっしょ？って思って作りました。
          </p>
          <p className="font-medium">別に立派な動機とかじゃないです。単純に「こういうのあったら便利じゃん？」っていう。</p>
        </div>
      </section>

      {/* 何ができるサイトなのか */}
      <section className="mb-8">
        <h2 className="text-heading-2 mb-3" style={{ color: 'var(--info)' }}>💡 何ができるサイトなのか</h2>
        <div className="rounded p-4 border-l-4" style={{ 
          backgroundColor: 'var(--info-light)', 
          borderLeftColor: 'var(--info)' 
        }}>
          <p className="mb-4">対象30公演の情報を一覧で見れて、投票の時に迷わずに済むようにしてます。</p>
          
          <div className="mb-4">
            <h3 className="text-heading-3 mb-2" style={{ color: 'var(--error)' }}>🔥 投票の現実を知ってますか？</h3>
            <p className="mb-2 text-body-small">
              終演後の大興奮と大混雑の中、会場を出る前に投票を済ませないといけない。
              限られた場所でしか配布してない目録を探して、手元でなかなか目録を見れない状態で周りの人と融通し合いながら公演を確認。
            </p>
            <p className="mb-2 text-body-small">
              鉛筆で書ける場所（机なんて贅沢なことは言ってられない）を探して、
              冷静さをすべて投げ捨てたばかりの状態で、あの長いツアータイトルを正式名称で書かないといけない。
            </p>
            <p className="mb-3 text-body-small">
              <span className="font-bold">「the end of genesis T.M.R. evolution turbo type D -LIVE ARENA 2000 A.D.-」</span>
              みたいなタイトルでも、間違えずに。
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-heading-3 mb-2">📋 だからこのサイトで事前準備</h3>
            <ul className="list-disc list-inside space-y-1 text-body-small ml-4">
              <li><strong>正式なツアータイトル</strong>（これが一番重要）</li>
              <li><strong>対象番号</strong>（小さなマスに書く番号）</li>
              <li>開催年・セットリスト</li>
              <li>映像化されてるかどうか</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-heading-3 mb-2">🗳️ 投票サポート機能</h3>
            <ul className="list-disc list-inside space-y-1 text-body-small ml-4">
               <li><strong>投票用紙プレビュー</strong>で記入イメージを確認</li>
              <li><strong>番号と公演名を分けて表示</strong>（小さなマス用・大きなマス用）</li>
              <li>会場でも素早くアクセス可能</li>
            </ul>
          </div>

          <div className="border rounded p-3" style={{ 
            backgroundColor: 'var(--warning-light)', 
            borderColor: 'var(--warning-border)' 
          }}>
            <p className="text-body-small" style={{ color: 'var(--neutral-700)' }}>
              <strong>⚠️ 重要な注意事項</strong><br />
              投票は<strong>公演終了後、会場を出る前に必ず</strong>済ませてください。
              配布された投票用紙と投函会場が異なるものは無効になります。
            </p>
          </div>
        </div>

        {/* 追加機能の説明 */}
        <div className="space-y-4 mt-6">
          <div className="rounded p-4" style={{ backgroundColor: 'var(--info-light)' }}>
            <h3 className="text-heading-3 mb-2">投票で迷ってる人向けの情報整理</h3>
            <p>セトリだけ見ても「で、どれがいいの？」ってなりますよね。なので「投票するなら知りたいのこれでしょ」っていう情報をまとめました。どのライブにどんな特色があるのか、パッと見て分かるようにしてあります。完璧ではないけど。</p>
          </div>
          <div className="rounded p-4" style={{ backgroundColor: 'var(--info-light)' }}>
            <h3 className="text-heading-3 mb-2">1996年の-monopolize-から2023年の-VOTE JAPAN-まで全部調べました</h3>
            <p>1～30までの候補公演、セトリ付きで全部載せてます。めちゃくちゃ大変でした。途中で「なんでこんなことしてるんだろう」って思ったこともありましたが、やりきりました。たぶん他にこんなことしてる人いない・・・ことも無かったけど。</p>
          </div>
          <div className="rounded p-4" style={{ backgroundColor: 'var(--info-light)' }}>
            <h3 className="text-heading-3 mb-2">投票用紙のプレビュー</h3>
            <p>候補公演の情報ページから、投票用紙にどう書けばいいか見れます。終演後の興奮と大混雑の中、やたらに長ーーーい名称であっても、ちゃんと枠の中に収められて、誤字脱字も手元で確認できるように。地味に便利だと思います。</p>
          </div>
        </div>
      </section>

      {/* 運営者について */}
      <section className="mb-8">
        <h2 className="text-heading-2 mb-3" style={{ color: 'var(--success)' }}>👨‍💻 サイト作ってる人のこと</h2>
        <div className="rounded p-4 border-l-4" style={{ 
          backgroundColor: 'var(--success-light)', 
          borderLeftColor: 'var(--success)' 
        }}>
          <h3 className="text-heading-3 mb-2">ただの滋賀ない西ヲタです</h3>
          <div className="space-y-2">
            <p>・<strong>ファン歴</strong>：20年ちょっと。vertical infinityツアーに参戦して人生変わりました</p>
            <p>・<strong>ライブ回数</strong>：数えたくないけど多分合計50回は超えてる（白目）</p>
            <p>・<strong>データ収集癖</strong>：気づいたら10年以上、映像とか音源とかため込んでた</p>
            <p>・<strong>本業</strong>：いちおうIT関係の仕事してるので、ちょっとだけならサイト作れます</p>
          </div>
          <p className="mt-3 text-body-small" style={{ color: 'var(--neutral-600)' }}>要するに、T.M.R好きすぎて色々やってたら、なんかサイト作れるようになってた人です。</p>
        </div>
      </section>

      {/* データについて */}
      <section className="mb-8">
        <h2 className="text-heading-2 mb-3" style={{ color: 'var(--primary)' }}>📚 情報はどこから持ってきてるか</h2>
        <div className="space-y-3">
          <div className="rounded p-4" style={{ backgroundColor: 'var(--primary-100)' }}>
            <h3 className="text-heading-3 mb-2">基本は公式情報です</h3>
            <ul className="list-disc list-inside ml-4 space-y-1 text-body-small">
              <li>公式サイトの情報</li>
              <li>令和7年度 新党革命 臨時党大会 会場で配布された目録<br />（新党革命 -VOTE30- 選挙候補公演名等一覧）</li>
              <li>DVD・Blu-rayの収録内容（持ってるやつは全部確認）</li>
              <li>ファンクラブの会報とか</li>
              <li>セットリストはLIVE FANSとか、参戦し始めてからの分は自分の記憶の中とか</li>
              <li>信頼できるファンの人からの情報</li>
            </ul>
          </div>
          <div className="rounded p-4" style={{ backgroundColor: 'var(--primary-100)' }}>
            <h3 className="text-heading-3 mb-2">間違いがあったらごめんなさい</h3>
            <p className="text-body-small">できるだけちゃんと調べてますが、間違いもあると思います。複数のソースで確認して、それでも分からない時は「不明」って書いてます。適当なこと書くのは良くないので。間違い見つけたら教えてください。</p>
          </div>
        </div>
      </section>

      {/* サイト運営について */}
      <section className="mb-8">
        <h2 className="text-heading-2 mb-3" style={{ color: 'var(--warning)' }}>💸 お金の話（大事なので）</h2>
        <div className="rounded p-4 border-l-4" style={{ 
          backgroundColor: 'var(--warning-light)', 
          borderLeftColor: 'var(--warning)' 
        }}>
          <h3 className="text-heading-3 mb-2">正直に言います</h3>
          <div className="space-y-3 text-body-small">
            <div>
              <h4 className="text-heading-4">サーバー代とかかかるんです</h4>
              <p>このサイト動かすのにお金かかります。サーバー代とかドメイン代とか。月々だとそんなでもないけど、年間だとそれなりに。なので広告とかアフィリエイトで費用をまかなってます。</p>
            </div>
            <div>
              <h4 className="text-heading-4">でも変なことはしません</h4>
              <p>お金のために<strong>変な商品勧めたり、関係ない広告バンバン出したりはしません</strong>。ファンサイトとしてちゃんとしていたいので。あくまで運営費をまかなう程度です。</p>
            </div>
            <div>
              <h4 className="text-heading-4">サイトの内容に口出しされません</h4>
              <p>広告出してもらってるからって、サイトの内容を変えろとか言われることはないです。そういうのは断ってます。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 利用者について */}
      <section className="mb-8">
        <h2 className="text-heading-2 mb-3" style={{ color: 'var(--info)' }}>🎯 こんな人に使ってほしい</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded p-4" style={{ backgroundColor: 'var(--info-light)' }}>
            <h3 className="text-heading-3 mb-2">VOTE30の投票先で迷ってる人</h3>
            <p className="text-body-small">とりあえずここ見とけば情報は揃います</p>
          </div>
          <div className="rounded p-4" style={{ backgroundColor: 'var(--info-light)' }}>
            <h3 className="text-heading-3 mb-2">T.M.R.のライブを調べたい人</h3>
            <p className="text-body-small">「あのライブどんなだったっけ」の答えがあります</p>
          </div>
          <div className="rounded p-4" style={{ backgroundColor: 'var(--info-light)' }}>
            <h3 className="text-heading-3 mb-2">セトリ調べたい人</h3>
            <p className="text-body-small">「あの曲いつやったっけ」問題を解決</p>
          </div>
          <div className="rounded p-4" style={{ backgroundColor: 'var(--info-light)' }}>
            <h3 className="text-heading-3 mb-2">DVD/BD選びに迷う人</h3>
            <p className="text-body-small">どれ買えばいいか分からない時に</p>
          </div>
        </div>
      </section>

      {/* みんなで作っていこう */}
      <section className="mb-8">
        <h2 className="text-heading-2 mb-3" style={{ color: 'var(--neutral-600)' }}>🤝 一人じゃ限界があるので</h2>
        <div className="rounded p-4" style={{ backgroundColor: 'var(--neutral-100)' }}>
          <h3 className="text-heading-3 mb-2">間違いとか追加情報とかあったら教えて</h3>
          <p className="text-body-small">一人で全部調べるのは無理でした。明らかに間違ってるとこあったり、「この情報もあるよ」ってのがあったら、<Link to="/contact" className="underline hover:opacity-80" style={{ color: 'var(--primary)' }}>お問い合わせフォーム</Link>から教えてください。</p>
          <p className="mt-2 text-body-small">ファンの皆で作っていけたらいいなと思ってます。完璧なサイトにはならないかもしれないけど、それなりに使えるものにはしたい。</p>
        </div>
      </section>

      {/* 大事なお知らせ */}
      <section className="mb-8">
        <h2 className="text-heading-2 mb-3" style={{ color: 'var(--neutral-600)' }}>⚠️ 一応言っておくと</h2>
        <div className="rounded p-4" style={{ backgroundColor: 'var(--neutral-100)' }}>
          <p className="text-body-small mb-2"><strong>個人サイトです</strong>：ただの個人がやってるファンサイトです。ソニーミュージックとかとは関係ないです。</p>
          <p className="text-body-small"><strong>細かい規約とか</strong>：プライバシーポリシーとかは<Link to="/legal" className="underline hover:opacity-80" style={{ color: 'var(--primary)' }}>こっち</Link>に書いてあります。読まなくても大丈夫だと思うけど。</p>
        </div>
      </section>

      {/* 関連リンク */}
      <section className="mb-8">
        <h2 className="text-heading-2 mb-3">🔗 他のページとか</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded border p-4">
            <h3 className="text-heading-3 mb-2">サイト情報</h3>
            <ul className="space-y-1 text-body-small">
              <li><Link to="/contact" className="text-[#6ea7b2] hover:underline">お問い合わせ</Link></li>
              <li><Link to="/sitemap" className="text-[#6ea7b2] hover:underline">サイトマップ</Link></li>
              <li><Link to="/legal" className="text-[#6ea7b2] hover:underline">プライバシーポリシー等</Link></li>
            </ul>
          </div>
        </div>
        <p className="text-body-small text-gray-600">
          他にも何かあったら<Link to="/contact" className="text-[#6ea7b2] hover:underline">お問い合わせ</Link>から教えてください。
        </p>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline hover:text-[#5a8a94]">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default About; 