import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左カラム：サイト情報 */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">VOTE30選挙対策支援サイト</h3>
            <p className="text-gray-600 text-sm mb-4">
              投票テーマを共有し、ユーザー参加型の軽量Webアプリを通じてコンテンツ体験を提供します。
            </p>
          </div>

          {/* 右カラム：リンク集 */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">サイト情報</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-[#6ea7b2] text-sm">
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-gray-600 hover:text-[#6ea7b2] text-sm">
                  サイトマップ
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-gray-600 hover:text-[#6ea7b2] text-sm">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-[#6ea7b2] text-sm">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">© 2025 VOTE30-Support. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}; 