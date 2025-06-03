import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>このサイトについて - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトについて。T.M.Revolutionの過去30回のライブツアーの詳細情報を提供し、あなたの投票をサポートします。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">このサイトについて</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">サイトの目的</h2>
        <p>VOTE30選挙対策支援サイトは、T.M.Revolutionの過去30回のライブツアーに関する詳細情報を提供し、あなたの投票の判断材料をサポートすることを目的としています。各ツアーのセットリスト、公演情報、映像・音源情報など、投票に必要な情報を網羅的にお届けします。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">掲載内容</h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>T.M.Revolution の30回のライブツアー詳細情報</li>
          <li>各ツアーの完全セットリスト</li>
          <li>公演開催地域・日程・会場情報</li>
          <li>収録されている映像・音源作品情報</li>
          <li>同じアレンジで演奏されたライブ情報</li>
          <li>ツアーの特徴や見どころ</li>
        </ul>
      </section>

      <section className="mb-6 bg-gray-50 rounded p-4">
        <h2 className="text-xl font-semibold mb-2">サイトの特徴</h2>
        <div className="space-y-2">
          <div>
            <h3 className="text-lg font-bold">1. 充実したセットリスト情報</h3>
            <p>アンコールや特別演出も含めた、詳細なセットリスト情報を掲載しています。</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">2. 映像・音源作品との連携</h3>
            <p>各ツアーがどの映像作品に収録されているかを明確に表示し、視聴方法もご案内します。</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">3. 投票支援機能</h3>
            <p>豊富な情報をもとに、あなたの好みに合った投票を行えるよう設計されています。</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">対象期間</h2>
        <p>1996年の「LIVE REVOLUTION '96 -monopolize-」から2024年の最新ツアーまで、T.M.Revolution の約30年間にわたるライブツアーの歴史を網羅しています。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">データについて</h2>
        <p>掲載されている情報は、公式発表資料、映像作品、ファンクラブ情報等を基に可能な限り正確な情報を心がけて編集しています。万が一、誤りや不備がございましたら、お気軽に<Link to="/contact" className="underline text-[#6ea7b2]">お問い合わせ</Link>ください。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">運営について</h2>
        <p>本サイトは個人によるファンサイトとして運営されており、株式会社ソニー・ミュージックエンタテインメントおよび関連企業とは一切関係ありません。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">関連リンク</h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><Link to="/legal" className="underline text-[#6ea7b2]">プライバシーポリシー・免責事項</Link></li>
          <li><Link to="/contact" className="underline text-[#6ea7b2]">お問い合わせ</Link></li>
          <li><Link to="/sitemap" className="underline text-[#6ea7b2]">サイトマップ</Link></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">最終更新日</h2>
        <p>2025年1月28日<br />運営者: VOTE30-Support（個人による非営利運営）</p>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default About; 