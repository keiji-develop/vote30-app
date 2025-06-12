import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MediaEditor } from '../components/editor/MediaEditor';

export default function MediaEditorPage() {
  const router = useRouter();

  useEffect(() => {
    // 本番環境では404ページにリダイレクト
    if (process.env.NODE_ENV === 'production') {
      router.replace('/404');
      return;
    }
  }, [router]);

  // 本番環境では何も表示しない
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">メディア情報エディタ</h1>
            <p className="mt-2 text-sm text-red-600">
              ※ この機能は開発環境でのみ利用可能です
            </p>
          </div>
          <MediaEditor />
        </div>
      </div>
    </div>
  );
} 