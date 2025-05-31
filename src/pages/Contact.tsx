import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>お問い合わせ - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトのお問い合わせページです。ご質問、ご意見、ご要望などをお気軽にお送りください。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">お問い合わせ</h1>

      <section className="mb-6">
        <p>当サイトに関するご質問、ご意見、ご要望などがございましたら、以下のフォームよりお気軽にお問い合わせください。</p>
        <div className="bg-gray-50 rounded p-4 mt-4 mb-4">
          <iframe src="https://forms.gle/xxxxxxxxxxxxx" title="お問い合わせフォーム" className="w-full min-h-[400px] sm:min-h-[600px] border-none rounded" />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">お問い合わせの前に</h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>よくある質問は<Link to="/faq" className="underline text-[#6ea7b2]">FAQページ</Link>をご覧ください。</li>
          <li>プライバシーポリシーは<Link to="/privacy-policy" className="underline text-[#6ea7b2]">こちら</Link>をご覧ください。</li>
          <li>免責事項は<Link to="/disclaimer" className="underline text-[#6ea7b2]">こちら</Link>をご覧ください。</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">お問い合わせの種類</h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>サイトの内容に関する質問</li>
          <li>情報の誤りや不備の報告</li>
          <li>改善提案</li>
          <li>その他のご意見・ご要望</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">回答について</h2>
        <p>お問い合わせいただいた内容について、できる限り早急に回答させていただきます。ただし、内容によっては回答に時間を要する場合や、お答えできない場合もございますので、ご了承ください。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">個人情報の取り扱い</h2>
        <p>お問い合わせいただいた個人情報は、当サイトの<Link to="/privacy-policy" className="underline text-[#6ea7b2]">プライバシーポリシー</Link>に基づいて適切に管理いたします。</p>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default Contact; 