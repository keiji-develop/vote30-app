import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左カラム：サイト情報 */}
          <div>
                    <h3 className="text-heading-3 text-gray-800 mb-4">VOTE30選挙対策支援サイト</h3>
        <p className="text-gray-600 text-body-small mb-4">
              T.M.Rの30年分のライブツアー情報をまとめて、
              VOTE30で迷ってる人の投票をお手伝いしてます。
              あのライブのセトリとか映像情報とか調べるのにも使えると思います。
            </p>
          </div>

          {/* 右カラム：リンク集 */}
          <div>
            <h3 className="text-heading-3 text-gray-800 mb-4">サイト情報</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-body-small hover:opacity-80" style={{ color: 'var(--neutral-600)' }}>
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-body-small hover:opacity-80" style={{ color: 'var(--neutral-600)' }}>
                  サイトマップ
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-body-small hover:opacity-80" style={{ color: 'var(--neutral-600)' }}>
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-body-small hover:opacity-80" style={{ color: 'var(--neutral-600)' }}>
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-500 text-caption">© 2025 VOTE30-Support. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}; 