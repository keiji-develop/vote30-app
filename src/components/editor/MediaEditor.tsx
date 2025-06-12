import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import type { MediaMasterFile } from '../../types/MediaMasterTypes';
import { loadMediaMaster, updateMediaMaster } from '../../services/mediaMasterService';

export interface MediaEditorProps {
  mediaId: string;
  onChangesPending: (pending: boolean) => void;
}

export function MediaEditor({ mediaId, onChangesPending }: MediaEditorProps) {
  const [media, setMedia] = useState<MediaMasterFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!mediaId) {
      setError('メディアIDが指定されていません');
      setLoading(false);
      return;
    }
    loadData();
  }, [mediaId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading media data for ID:', mediaId);  // デバッグログ追加

      const mediaData = await loadMediaMaster();
      console.log('Loaded media data:', mediaData);  // デバッグログ追加

      const targetMedia = mediaData.find(m => m.id === mediaId);
      if (!targetMedia) {
        throw new Error(`メディアID "${mediaId}" の情報が見つかりません`);
      }

      console.log('Found target media:', targetMedia);  // デバッグログ追加
      setMedia(targetMedia);
      setIsDirty(false);
      onChangesPending(false);
    } catch (err) {
      console.error('Error loading media:', err);  // デバッグログ追加
      setError(err instanceof Error ? err.message : 'データの読み込みに失敗しました');
      setMedia(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!media) return;
    
    try {
      setLoading(true);
      setError(null);
      await updateMediaMaster(media);
      setIsDirty(false);
      onChangesPending(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (newData: Partial<MediaMasterFile>) => {
    if (!media) return;
    setMedia({ ...media, ...newData });
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

  if (!media) {
    return <div>データが見つかりません</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">メディアマスター情報の編集</h2>
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
          <h3 className="text-lg font-semibold mb-4">購入を有効化</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={media.purchaseEnabled}
                onChange={(e) => handleChange({ purchaseEnabled: e.target.checked })}
                className="rounded"
              />
              購入を有効化
            </label>

            <div className="pl-6 space-y-4">
              {[
                { id: 'sonyMusic', label: 'SonyMusicで購入' },
                { id: 'amazon', label: 'Amazonで購入' },
                { id: 'rakuten', label: '楽天ブックスで購入' },
                { id: 'yahoo', label: 'Yahoo!ショッピングで購入' },
                { id: '7net', label: '7netで購入' }
              ].map(store => (
                <div key={store.id} className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={media.purchaseStores?.[store.id]?.enabled ?? false}
                      onChange={(e) => handleChange({
                        purchaseStores: {
                          ...media.purchaseStores,
                          [store.id]: {
                            enabled: e.target.checked,
                            priority: media.purchaseStores?.[store.id]?.priority ?? 0
                          }
                        }
                      })}
                      disabled={!media.purchaseEnabled}
                      className="rounded"
                    />
                    {store.label}
                  </label>
                  {media.purchaseStores?.[store.id]?.enabled && (
                    <div className="flex items-center gap-2">
                      <span>優先度:</span>
                      <input
                        type="number"
                        value={media.purchaseStores?.[store.id]?.priority ?? 0}
                        onChange={(e) => handleChange({
                          purchaseStores: {
                            ...media.purchaseStores,
                            [store.id]: {
                              enabled: true,
                              priority: parseInt(e.target.value) || 0
                            }
                          }
                        })}
                        className="w-20 px-2 py-1 border rounded"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">ストリーミング</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={media.streamingEnabled}
                onChange={(e) => handleChange({ streamingEnabled: e.target.checked })}
                className="rounded"
              />
              ストリーミングを有効化
            </label>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">マーケットプレイス</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={media.marketplaceEnabled}
                onChange={(e) => handleChange({ marketplaceEnabled: e.target.checked })}
                className="rounded"
              />
              マーケットプレイスを有効化
            </label>
          </div>
        </section>
      </div>
    </div>
  );
} 