import React from 'react';

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
            <p className="text-gray-500 text-xs">
              © 2025 KEIJI. All rights reserved.
            </p>
          </div>

          {/* 右カラム：リンク集 */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">サイト情報</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-[#6ea7b2] text-sm">
                  このサイトについて
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-600 hover:text-[#6ea7b2] text-sm">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="/affiliate-disclosure" className="text-gray-600 hover:text-[#6ea7b2] text-sm">
                  広告について
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="text-gray-600 hover:text-[#6ea7b2] text-sm">
                  免責事項
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-[#6ea7b2] text-sm">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-600 hover:text-[#6ea7b2] text-sm">
                  Cookieの使用について
                </a>
              </li>
              <li>
                <a href="/spec-commercial" className="text-gray-600 hover:text-[#6ea7b2] text-sm">
                  特定商取引法に基づく表記
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}; 