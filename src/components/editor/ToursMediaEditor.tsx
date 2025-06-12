import React, { useState, useEffect } from 'react';
import type { TourMedia, NoMediaItems } from '../../types/ToursMediaTypes';
import type { MediaMaster } from '../../types/MediaMasterTypes';
import { loadToursMedia, updateTourMedia } from '../../services/toursMediaService';
import { loadMediaMaster } from '../../services/mediaMasterService';
import { DraggableList } from './DraggableList';
import { Button } from '../Button';

export interface ToursMediaEditorProps {
  tourId: number;
  onChangesPending: (pending: boolean) => void;
}

export function ToursMediaEditor({ tourId, onChangesPending }: ToursMediaEditorProps) {
  const [tourMedia, setTourMedia] = useState<TourMedia | null>(null);
  const [availableMedias, setAvailableMedias] = useState<MediaMaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showAddArrangementModal, setShowAddArrangementModal] = useState(false);

  useEffect(() => {
    loadData();
  }, [tourId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [tourMediaData, mediaData] = await Promise.all([
        loadToursMedia(),
        loadMediaMaster()
      ]);
      
      const targetTourMedia = tourMediaData.find(tm => tm.id === tourId);
      if (!targetTourMedia) {
        throw new Error(`ツアーID ${tourId} のメディア情報が見つかりません`);
      }
      
      setTourMedia(targetTourMedia);
      setAvailableMedias(mediaData);
      setIsDirty(false);
      onChangesPending(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'データの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!tourMedia) return;
    
    try {
      setLoading(true);
      setError(null);
      await updateTourMedia(tourMedia);
      setIsDirty(false);
      onChangesPending(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (newData: Partial<TourMedia>) => {
    if (!tourMedia) return;
    setTourMedia({ ...tourMedia, ...newData });
    setIsDirty(true);
    onChangesPending(true);
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 mb-4">
        <p>{error}</p>
        <Button
          variant="secondary"
          onClick={loadData}
          className="mt-2"
        >
          再読み込み
        </Button>
      </div>
    );
  }

  if (!tourMedia) {
    return <div>データが見つかりません</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">ツアーメディア情報の編集</h2>
        <Button
          variant="primary"
          onClick={handleUpdate}
          disabled={!isDirty}
        >
          {isDirty ? "更新" : "更新済み"}
        </Button>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">ライブ映像</h3>
          <div className="space-y-4">
            <DraggableList
              items={tourMedia.liveVideoIds.map(id => {
                const media = availableMedias.find(m => m.id === id);
                return {
                  id,
                  title: media?.title || 'Unknown',
                  onRemove: () => handleChange({
                    liveVideoIds: tourMedia.liveVideoIds.filter(vid => vid !== id)
                  })
                };
              })}
              onReorder={(newIds) => handleChange({ liveVideoIds: newIds })}
            />
            <Button
              variant="secondary"
              onClick={() => setShowAddVideoModal(true)}
            >
              ライブ映像を追加
            </Button>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">ライブアレンジ</h3>
          <div className="space-y-4">
            <DraggableList
              items={tourMedia.liveArrangementIds.map(id => {
                const media = availableMedias.find(m => m.id === id);
                return {
                  id,
                  title: media?.title || 'Unknown',
                  onRemove: () => handleChange({
                    liveArrangementIds: tourMedia.liveArrangementIds.filter(aid => aid !== id)
                  })
                };
              })}
              onReorder={(newIds) => handleChange({ liveArrangementIds: newIds })}
            />
            <Button
              variant="secondary"
              onClick={() => setShowAddArrangementModal(true)}
            >
              ライブアレンジを追加
            </Button>
          </div>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">「なし」項目を表示</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32">{tourMedia.noMediaItems.liveVideo.label}:</label>
              <input
                type="text"
                value={tourMedia.noMediaItems.liveVideo.text}
                onChange={(e) => handleChange({
                  noMediaItems: {
                    ...tourMedia.noMediaItems,
                    liveVideo: {
                      ...tourMedia.noMediaItems.liveVideo,
                      text: e.target.value
                    }
                  }
                })}
                className="flex-grow px-4 py-2 border rounded"
                placeholder="映像がない場合のメッセージ"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32">{tourMedia.noMediaItems.liveArrangement.label}:</label>
              <input
                type="text"
                value={tourMedia.noMediaItems.liveArrangement.text}
                onChange={(e) => handleChange({
                  noMediaItems: {
                    ...tourMedia.noMediaItems,
                    liveArrangement: {
                      ...tourMedia.noMediaItems.liveArrangement,
                      text: e.target.value
                    }
                  }
                })}
                className="flex-grow px-4 py-2 border rounded"
                placeholder="アレンジがない場合のメッセージ"
              />
            </div>
          </div>
        </section>

        {showAddVideoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">ライブ映像を追加</h3>
              <select
                className="w-full px-4 py-2 border rounded mb-4"
                onChange={(e) => {
                  handleChange({
                    liveVideoIds: [...tourMedia.liveVideoIds, e.target.value]
                  });
                  setShowAddVideoModal(false);
                }}
              >
                <option value="">選択してください</option>
                {availableMedias
                  .filter(media => !tourMedia.liveVideoIds.includes(media.id))
                  .map(media => (
                    <option key={media.id} value={media.id}>
                      {media.title}
                    </option>
                  ))}
              </select>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddVideoModal(false)}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          </div>
        )}

        {showAddArrangementModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">ライブアレンジを追加</h3>
              <select
                className="w-full px-4 py-2 border rounded mb-4"
                onChange={(e) => {
                  handleChange({
                    liveArrangementIds: [...tourMedia.liveArrangementIds, e.target.value]
                  });
                  setShowAddArrangementModal(false);
                }}
              >
                <option value="">選択してください</option>
                {availableMedias
                  .filter(media => !tourMedia.liveArrangementIds.includes(media.id))
                  .map(media => (
                    <option key={media.id} value={media.id}>
                      {media.title}
                    </option>
                  ))}
              </select>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddArrangementModal(false)}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 