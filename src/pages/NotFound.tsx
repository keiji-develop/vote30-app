import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 md:px-8 py-16 bg-white rounded shadow-md mt-16 mb-16 text-center">
      <Helmet>
        <title>404 - ページが見つかりません | VOTE30選挙対策支援サイト</title>
        <meta name="description" content="お探しのページは見つかりませんでした。VOTE30選挙対策支援サイトのトップページにお戻りください。" />
      </Helmet>
      <h1 className="text-6xl font-bold text-[#6ea7b2] mb-4">404</h1>
      <p className="text-xl mb-8">お探しのページは見つかりませんでした。</p>
      <Link to="/" className="inline-block text-[#6ea7b2] underline text-lg">← トップページに戻る</Link>
    </div>
  );
};

export default NotFound; 