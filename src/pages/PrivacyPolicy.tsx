import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>プライバシーポリシー - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトのプライバシーポリシーページです。個人情報の取り扱いやGoogle Analytics、アフィリエイトプログラムについてご説明しています。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">プライバシーポリシー</h1>

      <section className="mb-6">
        <p>当サイト（https://takanori-support.com/）では、個人情報の保護と利用者の安心に配慮し、以下の方針に基づいて運営を行っています。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. 個人情報の収集と利用について</h2>
        <p>当サイトでは、以下の目的のために、お名前・メールアドレス等の個人情報を取得する場合があります。</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>お問い合わせへの対応</li>
          <li>サイトの利用状況の把握・改善（アクセス解析）</li>
        </ul>
        <p>取得した個人情報は、上記の目的以外には利用せず、適切に管理いたします。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. アクセス解析ツールについて（Google Analytics）</h2>
        <p>当サイトは、Google社のアクセス解析ツール「Google Analytics」を使用しています。このツールは、トラフィックデータの収集のためにCookieを使用します。収集される情報は匿名であり、個人を特定するものではありません。</p>
        <p>Cookieの使用はブラウザ設定で無効にすることが可能です。詳細は<a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer" className="underline text-[#6ea7b2]">Googleのポリシー</a>をご参照ください。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. アフィリエイトプログラムについて</h2>
        <p>当サイトでは、第三者配信のアフィリエイトプログラムを利用しています。対象の広告リンクを経由して商品やサービスの申込み・購入が行われた場合、当サイトに報酬が発生することがあります。</p>
        <p>なお、リンク先の商品やサービスについては、各販売元にてご確認ください。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. 免責事項</h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>当サイトに掲載する情報は、正確性・安全性を確保するよう努めていますが、その内容を保証するものではありません。</li>
          <li>当サイトに含まれるリンクやバナーなどから他のサイトに移動された場合、移動先サイトで提供される情報・サービス等について、当サイトは一切の責任を負いません。</li>
          <li>万が一、当サイトの内容に誤りや不適切な表現等がございましたら、お手数ですがお問い合わせフォームよりご連絡ください。確認の上、必要に応じて迅速に対応いたします。</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. プライバシーポリシーの変更について</h2>
        <p>本ポリシーの内容は、法令変更やサービス内容の変更に応じて、予告なく改定される場合があります。その場合は、本ページにて最新の内容を掲示いたします。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. お問い合わせ</h2>
        <p>当サイトに関するお問い合わせ・ご意見・ご指摘は、以下のフォームよりお願いいたします。内容に応じて、誠実に対応いたします。</p>
        <p><a href="https://forms.gle/xxxxxxxxxxxxx" target="_blank" rel="noopener noreferrer" className="underline text-[#6ea7b2]">→ お問い合わせフォームはこちら</a></p>
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

export default PrivacyPolicy; 