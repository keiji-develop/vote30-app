import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Disclaimer = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>免責事項 - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトの免責事項ページです。情報の正確性、外部リンク、著作権などについてご説明しています。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">免責事項</h1>

      <section className="mb-6">
        <p>当サイトは、個人による非営利運営の情報提供サイトです。可能な限り正確かつ最新の情報を掲載するよう努めておりますが、以下の点についてご理解のうえご利用ください。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. 情報の正確性について</h2>
        <p>掲載内容には十分注意を払っておりますが、情報の正確性・信頼性・適時性を保証するものではありません。万が一誤情報や表現の不備がある場合は、お手数ですがご指摘いただけますと幸いです。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. サイト利用による損害等</h2>
        <p>当サイトの情報を利用・参考にされたことにより生じた損害・損失について、当サイト運営者は一切の責任を負いかねます。</p>
        <p>情報の利用は、すべてご自身の判断と責任においてお願いいたします。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. 外部リンクについて</h2>
        <p>当サイトには外部サイトへのリンクが含まれることがあります。リンク先で提供される情報やサービス等に関して、当サイトは一切の責任を負いません。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. コンテンツの著作権</h2>
        <p>当サイトに掲載されている文章、画像、その他のコンテンツの著作権は、当サイトまたは正当な権利を有する第三者に帰属します。無断での複製、転載、改変等は禁止いたします。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. 免責事項の変更について</h2>
        <p>本免責事項の内容は、法令変更やサービス内容の変更に応じて、予告なく改定される場合があります。その場合は、本ページにて最新の内容を掲示いたします。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">関連リンク</h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><Link to="/privacy-policy" className="underline text-[#6ea7b2]">プライバシーポリシー</Link></li>
          <li><Link to="/contact" className="underline text-[#6ea7b2]">お問い合わせ</Link></li>
        </ul>
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

export default Disclaimer; 