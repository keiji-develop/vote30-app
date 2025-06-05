import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const LegalAllInOne = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
      <Helmet>
        <title>プライバシーポリシー - VOTE30選挙対策支援サイト</title>
        <meta name="description" content="VOTE30選挙対策支援サイトのプライバシーポリシー・広告・免責事項・Cookie・特定商取引法に基づく表記をまとめて掲載しています。" />
      </Helmet>
      <h1 className="text-heading-1 mb-6 border-b-2 border-[#6ea7b2] pb-2">プライバシーポリシー</h1>

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

      <div className="space-y-8">
        {/* 基本方針 */}
        <section>
          <p className="mb-4">
            VOTE30選挙対策支援サイト（以下「当サイト」）では、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
          </p>
        </section>

        {/* 個人情報の取り扱い */}
        <section>
          <h2 className="text-heading-2 mb-2">個人情報の取り扱い</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-heading-3 mt-4 mb-1">1. 個人情報の収集と利用について</h3>
              <p>当サイトでは、お問い合わせフォームを通じて以下の個人情報を収集する場合があります：</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>メールアドレス（お問い合わせへの返信のため）</li>
                <li>お名前（任意、お問い合わせ対応のため）</li>
              </ul>
              <p className="mt-2">これらの情報は、お問い合わせへの対応以外の目的では使用いたしません。</p>
            </div>

            <div>
              <h3 className="text-heading-3 mt-4 mb-1">2. アクセス解析ツールについて</h3>
              <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。</p>
              <p className="mt-2">このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。</p>
              <p className="mt-2">この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。</p>
              <p className="mt-2">この規約に関して、詳しくは<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">こちら</a>をクリックしてください。</p>
            </div>

            <div>
              <h3 className="text-heading-3 mt-4 mb-1">3. アフィリエイトプログラムについて</h3>
              <p>当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。</p>
              <p className="mt-2">第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookieを設定したりこれを認識したりする場合があります。</p>
            </div>

            <div>
              <h3 className="text-heading-3 mt-4 mb-1">4. データ保持期間について</h3>
              <p>お問い合わせフォームから送信された個人情報は、お問い合わせ対応完了後、適切な期間保持した後に削除いたします。</p>
              <p className="mt-2">Googleアナリティクスのデータ保持期間は、Googleの規定に従います。</p>
            </div>
          </div>
        </section>

        {/* 広告について */}
        <section>
          <h2 className="text-heading-2 mb-2">広告について</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-heading-3 mt-4 mb-1">利用している広告サービス</h3>
              <p>当サイトでは、第三者配信の広告サービス（Googleアドセンス、Amazonアソシエイト等）を利用しています。</p>
              <p className="mt-2">これらの広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報（氏名、住所、メール アドレス、電話番号は含まれません）を使用することがあります。</p>
            </div>

            <div>
              <h3 className="text-heading-3 mt-4 mb-1">広告収入について</h3>
              <p>当サイトは、サイト運営費用をまかなうために広告収入を得ています。ユーザーが広告をクリックしたり、広告経由で商品を購入した場合に収益が発生します。</p>
            </div>

            <div>
              <h3 className="text-heading-3 mt-4 mb-1">広告の選択について</h3>
              <p>当サイトでは、サイトの内容に関連する広告や、ユーザーにとって有益と思われる広告を選択して掲載しています。</p>
            </div>

            <div>
              <h3 className="text-heading-3 mt-4 mb-1">パーソナライズ広告の無効化について</h3>
              <p>ユーザーは、広告設定でパーソナライズ広告を無効にすることができます。</p>
              <p className="mt-2">詳しくは<a href="https://support.google.com/ads/answer/2662922?hl=ja" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">こちら</a>をご覧ください。</p>
            </div>
          </div>
        </section>

        {/* Cookieの使用について */}
        <section>
          <h2 className="text-heading-2 mb-2">Cookieの使用について</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-heading-3 mt-4 mb-1">Cookieの種類</h3>
              <p>当サイトでは以下のCookieを使用しています：</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><strong>必要なCookie</strong>：サイトの基本機能を提供するために必要</li>
                <li><strong>分析Cookie</strong>：サイトの利用状況を分析するため（Googleアナリティクス）</li>
                <li><strong>広告Cookie</strong>：関連性の高い広告を表示するため</li>
                <li><strong>機能Cookie</strong>：ユーザーの設定を記憶するため（座席番号など）</li>
              </ul>
              <p className="mt-2">これらのCookieは、以下の目的で使用されます：</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>サイトの機能向上</li>
                <li>ユーザー体験の改善</li>
                <li>サイト利用状況の分析</li>
                <li>適切な広告の表示</li>
              </ul>
            </div>

            <div>
              <h3 className="text-heading-3 mt-4 mb-1">Cookieの管理方法</h3>
              <p>ブラウザの設定により、Cookieを無効にしたり削除したりすることができます。ただし、一部のCookieを無効にすると、サイトの機能が制限される場合があります。</p>
            </div>
          </div>
        </section>

        {/* 免責事項 */}
        <section>
          <h2 className="text-heading-2 mb-2">免責事項</h2>
          <p>当サイトに掲載されている情報の正確性については万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について、当サイトは何ら責任を負うものではありません。</p>
          <p className="mt-2">当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</p>
        </section>

        {/* 特定商取引法に基づく表記 */}
        <section>
          <h2 className="text-heading-2 mb-2">特定商取引法に基づく表記</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-heading-3 mt-4 mb-1">サイトの性質</h3>
              <p>当サイトは情報提供を目的とした個人運営のファンサイトです。商品の販売は行っておりません。</p>
            </div>

            <div>
              <h3 className="text-heading-3 mt-4 mb-1">広告収入の使途</h3>
              <p>当サイトで得られる広告収入は、サーバー代、ドメイン代等のサイト運営費に充てられます。</p>
            </div>

            <div>
              <h3 className="text-heading-3 mt-4 mb-1">プライバシーポリシーとの連携</h3>
              <p>広告に関する個人情報の取り扱いについては、上記のプライバシーポリシーに準じます。</p>
            </div>
          </div>
        </section>

        {/* お問い合わせ・制定日 */}
        <section>
          <h2 className="text-heading-2 mb-2">お問い合わせ・制定日</h2>
          <p>本ポリシーに関するお問い合わせは、<Link to="/contact" className="text-blue-600 hover:underline">お問い合わせフォーム</Link>からお願いいたします。</p>
          <p className="mt-4"><strong>制定日：</strong>2025年1月1日</p>
        </section>
      </div>

      <div className="mt-8">
        <Link to="/" className="inline-block text-[#6ea7b2] underline">← トップページに戻る</Link>
      </div>
    </div>
  );
};

export default LegalAllInOne; 