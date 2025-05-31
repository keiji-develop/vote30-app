import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SpecCommercial = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>特定商取引法に基づく表記 - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトの特定商取引法に基づく表記です。運営者情報、広告収入の使途、プライバシーポリシーとの連携を明確にご説明しています。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">特定商取引法に基づく表記</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">運営者情報</h2>
        <p>当サイトは、選挙対策支援を目的とした情報提供サイトです。商品販売は行っておりませんが、広告収入（Google AdSense、Amazonアソシエイト）を利用しています。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">広告収入の使途</h2>
        <p>広告収入は、サイトの運営・維持費用に充てられています。詳細は<Link to="/affiliate-disclosure" className="underline text-[#6ea7b2]">広告について</Link>をご確認ください。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">プライバシーポリシーとの連携</h2>
        <p>当サイトでは、ユーザーのプライバシーを尊重し、<Link to="/privacy-policy" className="underline text-[#6ea7b2]">プライバシーポリシー</Link>に基づいて情報を管理しています。広告配信に関連するデータ収集については、<Link to="/cookies" className="underline text-[#6ea7b2]">Cookieの使用について</Link>もご参照ください。</p>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default SpecCommercial; 