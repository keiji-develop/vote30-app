import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MediaEditor } from '../components/editor/MediaEditor';
import { loadMediaMaster } from '../services/mediaMasterService';
import type { MediaMasterFile } from '../types/MediaMasterTypes';

export function MediaEditorPage() {
  const { mediaId } = useParams<{ mediaId: string }>();
  const [hasChanges, setHasChanges] = useState(false);
  const [mediaList, setMediaList] = useState<MediaMasterFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMediaList = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await loadMediaMaster();
        setMediaList(data);
      } catch (err) {
        setError('メディアデータの読み込みに失敗しました');
        console.error('Failed to load media data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!mediaId) {
      loadMediaList();
    }
  }, [mediaId]);

  // ページを離れる前に変更が保存されていない場合に警告を表示
  window.onbeforeunload = hasChanges 
    ? (e) => {
        e.preventDefault();
        return e.returnValue = '変更が保存されていません。このページを離れてもよろしいですか？';
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-700">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-red-600 mb-2">エラー</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!mediaId) {
    // メディアをカテゴリーごとにグループ化
    const groupedMedia = mediaList.reduce((acc, media) => {
      const category = media.category || 'その他';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(media);
      return acc;
    }, {} as Record<string, MediaMasterFile[]>);

    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">メディアマスター編集</h1>
            
            {Object.entries(groupedMedia).map(([category, items]) => (
              <div key={category} className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                  {category === 'liveVideo' ? 'ライブ映像' :
                   category === 'liveArrangement' ? 'ライブアレンジ音源' :
                   category === 'tourMedia' ? 'ツアーメディア' : category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((media) => (
                    <div
                      key={media.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/media-editor/${media.id}`)}
                    >
                      <h3 className="font-semibold mb-2">{media.title || media.id}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>ID: {media.id}</p>
                        <p>タイプ: {media.type}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {media.purchaseEnabled && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">購入可能</span>
                          )}
                          {media.streamingEnabled && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">ストリーミング</span>
                          )}
                          {media.marketplaceEnabled && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">マーケットプレイス</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <MediaEditor 
        mediaId={mediaId} 
        onChangesPending={setHasChanges}
      />
    </div>
  );
} 