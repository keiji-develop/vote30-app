import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const LegalAllInOne = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>プライバシーポリシー - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトのプライバシーポリシー・広告・免責事項・Cookie・特定商取引法に基づく表記をまとめて掲載しています。" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-[#6ea7b2] pb-2">プライバシーポリシー</h1>

      {/* 目次 */}
      <nav className="mb-8">
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><a href="#privacy" className="underline text-[#6ea7b2]">個人情報の取り扱い</a></li>
          <li><a href="#ads" className="underline text-[#6ea7b2]">広告について</a></li>
          <li><a href="#cookies" className="underline text-[#6ea7b2]">Cookieの使用について</a></li>
          <li><a href="#disclaimer" className="underline text-[#6ea7b2]">免責事項</a></li>
          <li><a href="#spec-commercial" className="underline text-[#6ea7b2]">特定商取引法に基づく表記</a></li>
        </ul>
      </nav>

      {/* 個人情報の取り扱い */}
      <section id="privacy" className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">個人情報の取り扱い</h2>
        <p>当サイト（https://keiji-develop.github.io/vote30-app/）では、個人情報の保護と利用者の安心に配慮し、以下の方針に基づいて運営を行っています。</p>
        <h3 className="text-lg font-bold mt-4 mb-1">1. 個人情報の収集と利用について</h3>
        <p>当サイトでは、以下の目的のために、お名前・メールアドレス等の個人情報を取得する場合があります。</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>お問い合わせへの対応</li>
          <li>サイトの利用状況の把握・改善（アクセス解析）</li>
        </ul>
        <p>取得した個人情報は、上記の目的以外には利用せず、適切に管理いたします。</p>
        <h3 className="text-lg font-bold mt-4 mb-1">2. アクセス解析ツールについて（Google Analytics）</h3>
        <p>当サイトは、Google社のアクセス解析ツール「Google Analytics」を使用しています。このツールは、トラフィックデータの収集のためにCookieを使用します。収集される情報は匿名であり、個人を特定するものではありません。</p>
        <p>Cookieの使用はブラウザ設定で無効にすることが可能です。詳細は<a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer" className="underline text-[#6ea7b2]">Googleのポリシー</a>をご参照ください。</p>
        <h3 className="text-lg font-bold mt-4 mb-1">3. アフィリエイトプログラムについて</h3>
        <p>当サイトでは、第三者配信のアフィリエイトプログラムを利用しています。対象の広告リンクを経由して商品やサービスの申込み・購入が行われた場合、当サイトに報酬が発生することがあります。</p>
        <p>なお、リンク先の商品やサービスについては、各販売元にてご確認ください。</p>
      </section>

      {/* 広告について */}
      <section id="ads" className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">広告について</h2>
        <p>当サイトでは、第三者配信の広告サービス（Google AdSense）を利用しています。このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報 『Cookie』(氏名、住所、メール アドレス、電話番号は含まれません) を使用することがあります。</p>
        <h3 className="text-lg font-bold mt-4 mb-1">広告の表示について</h3>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Google AdSense</li>
          <li>Amazonアソシエイトプログラム</li>
        </ul>
        <h3 className="text-lg font-bold mt-4 mb-1">広告収入について</h3>
        <p>当サイトは、広告収入によって運営されています。広告収入は、サイトの維持・改善、コンテンツの充実化に使用されます。</p>
        <h3 className="text-lg font-bold mt-4 mb-1">広告の選択について</h3>
        <p>当サイトに掲載される広告は、広告配信事業者によって自動的に選択されています。広告の内容は、当サイトの運営者が直接管理・制御するものではありません。</p>
        <h3 className="text-lg font-bold mt-4 mb-1">広告の無効化について</h3>
        <p>ユーザーは、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline text-[#6ea7b2]">Google の広告設定ページ</a>で、パーソナライズされた広告を無効にすることができます。</p>
      </section>

      {/* Cookieの使用について */}
      <section id="cookies" className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Cookieの使用について</h2>
        <p>当サイトでは、ユーザーエクスペリエンスの向上とサイトの改善のために、Cookie（クッキー）を使用しています。このページでは、Cookieの使用目的と管理方法について説明します。</p>
        <h3 className="text-lg font-bold mt-4 mb-1">Cookieの種類</h3>
        <div className="space-y-2">
          <div>
            <h4 className="font-bold">必須Cookie</h4>
            <ul className="list-disc list-inside ml-4">
              <li>セッション管理</li>
              <li>セキュリティ機能</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">分析Cookie</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Google Analyticsによるページビュー数</li>
              <li>訪問者の行動分析</li>
              <li>サイトの改善点の特定</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">広告Cookie</h4>
            <p>Google AdSenseによって使用され、ユーザーに関連性の高い広告を表示するために使用されます。</p>
          </div>
        </div>
        <h3 className="text-lg font-bold mt-4 mb-1">Cookieの管理方法</h3>
        <p>ブラウザの設定を変更することで、Cookieの使用を制限したり、無効にしたりすることができます。ただし、その場合、サイトの一部の機能が正常に動作しない可能性があります。</p>
      </section>

      {/* 免責事項 */}
      <section id="disclaimer" className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">免責事項</h2>
        <p>当サイトは、個人による非営利運営の情報提供サイトです。可能な限り正確かつ最新の情報を掲載するよう努めておりますが、情報の正確性・信頼性・適時性を保証するものではありません。万が一誤情報や表現の不備がある場合は、お手数ですがご指摘いただけますと幸いです。</p>
        <p>当サイトの情報を利用・参考にされたことにより生じた損害・損失について、当サイト運営者は一切の責任を負いかねます。情報の利用は、すべてご自身の判断と責任においてお願いいたします。</p>
        <p>当サイトには外部サイトへのリンクが含まれることがあります。リンク先で提供される情報やサービス等に関して、当サイトは一切の責任を負いません。</p>
        <p>当サイトに掲載されている文章、画像、その他のコンテンツの著作権は、当サイトまたは正当な権利を有する第三者に帰属します。無断での複製、転載、改変等は禁止いたします。</p>
        <p>本免責事項の内容は、法令変更やサービス内容の変更に応じて、予告なく改定される場合があります。その場合は、本ページにて最新の内容を掲示いたします。</p>
      </section>

      {/* 特定商取引法に基づく表記 */}
      <section id="spec-commercial" className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">特定商取引法に基づく表記</h2>
        <h3 className="text-lg font-bold mt-4 mb-1">運営者情報</h3>
        <p>当サイトは、選挙対策支援を目的とした情報提供サイトです。商品販売は行っておりませんが、広告収入（Google AdSense、Amazonアソシエイト）を利用しています。</p>
        <h3 className="text-lg font-bold mt-4 mb-1">広告収入の使途</h3>
        <p>広告収入は、サイトの運営・維持費用に充てられています。詳細は<a href="#ads" className="underline text-[#6ea7b2]">広告について</a>をご確認ください。</p>
        <h3 className="text-lg font-bold mt-4 mb-1">プライバシーポリシーとの連携</h3>
        <p>当サイトでは、ユーザーのプライバシーを尊重し、<a href="#privacy" className="underline text-[#6ea7b2]">プライバシーポリシー</a>に基づいて情報を管理しています。広告配信に関連するデータ収集については、<a href="#cookies" className="underline text-[#6ea7b2]">Cookieの使用について</a>もご参照ください。</p>
      </section>

      {/* お問い合わせ・制定日 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">お問い合わせ・制定日</h2>
        <p>当サイトに関するお問い合わせ・ご意見・ご指摘は、<Link to="/contact" className="underline text-[#6ea7b2]">お問い合わせフォーム</Link>よりお願いいたします。内容に応じて、誠実に対応いたします。</p>
        <p className="mt-2">2025年5月28日<br />運営者: KEIJI（個人による非営利運営）</p>
      </section>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default LegalAllInOne; 