import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 md:px-8 py-16 bg-white rounded shadow-md mt-16 mb-16">
      <Helmet>
        <title>404 - ページが見つかりません | VOTE30選挙対策支援サイト</title>
        <meta name="description" content="あれ、そのページないです。URLが間違ってるか、ページが移動してるかも。トップページから探してみてください。" />
      </Helmet>
      
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#6ea7b2] mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">あれ、そのページないです...🤔</h2>
        
        <div className="bg-gray-50 rounded p-6 mb-8 text-left">
          <h3 className="text-lg font-bold mb-3 text-gray-700">考えられる原因：</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>URLを間違えて入力した</li>
            <li>リンクが古くて、ページが移動してる</li>
            <li>そもそもそんなページはない</li>
            <li>サイト作ってる人がなんかやらかした</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-block bg-[#6ea7b2] text-white px-6 py-3 rounded hover:bg-[#5a8a94] transition-colors font-bold"
          >
            🏠 トップページに戻る
          </Link>
          
          <div className="text-sm text-gray-600">
            <p>それでも見つからない場合は</p>
            <Link to="/contact" className="text-[#6ea7b2] hover:underline">
              お問い合わせフォーム
            </Link>
            <span> から教えてください</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 