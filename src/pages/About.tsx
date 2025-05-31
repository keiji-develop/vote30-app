import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>このサイトについて - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトについての詳細情報です。サイトの目的、特徴、運営者プロフィールなどをご紹介しています。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">このサイトについて</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">サイトの目的</h2>
        <p>VOTE30選挙対策支援サイトは、30代の有権者を中心に、選挙に関する情報を分かりやすく提供し、より多くの方々が政治に参加できるよう支援することを目的としています。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">主な特徴</h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>選挙に関する基本的な情報の提供</li>
          <li>投票方法や手続きの解説</li>
          <li>選挙に関する最新ニュースの紹介</li>
          <li>選挙に関するQ&A</li>
        </ul>
      </section>

      <section className="mb-6 bg-gray-50 rounded p-4">
        <h2 className="text-xl font-semibold mb-2">運営者プロフィール</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
          <dt className="font-bold">名前</dt><dd>KEIJI</dd>
          <dt className="font-bold">経歴</dt><dd>選挙に関する情報提供活動を10年以上継続</dd>
          <dt className="font-bold">資格</dt><dd>行政書士（選挙関連業務経験あり）</dd>
          <dt className="font-bold">趣味</dt><dd>政治・経済の研究、読書</dd>
        </dl>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">サイトの特徴</h2>
        <div className="space-y-2">
          <div>
            <h3 className="text-lg font-bold">1. 信頼性の高い情報</h3>
            <p>選挙管理委員会や政府の公式情報を基に、正確な情報を提供しています。</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">2. 分かりやすい解説</h3>
            <p>専門用語を避け、誰にでも理解しやすい表現を心がけています。</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">3. 最新情報の提供</h3>
            <p>選挙に関する最新の情報を随時更新しています。</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">お問い合わせ</h2>
        <p>サイトに関するご質問やご意見は、<Link to="/contact" className="underline text-[#6ea7b2]">お問い合わせフォーム</Link>よりお気軽にお問い合わせください。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">関連リンク</h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><Link to="/privacy-policy" className="underline text-[#6ea7b2]">プライバシーポリシー</Link></li>
          <li><Link to="/disclaimer" className="underline text-[#6ea7b2]">免責事項</Link></li>
          <li><Link to="/contact" className="underline text-[#6ea7b2]">お問い合わせ</Link></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">制定日</h2>
        <p>2025年5月28日<br />運営者: KEIJI（個人による非営利運営）</p>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default About; 