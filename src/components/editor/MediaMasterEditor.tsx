import React, { useState, useEffect } from 'react';
import type { MediaMaster } from '../../types/MediaMasterTypes';
import { loadMediaMasterData, updateMediaMaster } from '../../services/mediaMasterService';

interface MediaMasterEditorProps {
  mediaId: string;
}

export function MediaMasterEditor({ mediaId }: MediaMasterEditorProps) {
  const [media, setMedia] = useState<MediaMaster | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await loadMediaMasterData();
        const found = data.find(m => m.id === mediaId);
        if (!found) {
          setError('指定されたメディアが見つかりません');
          setMedia(null);
        } else {
          setMedia(found);
        }
      } catch (err) {
        setError('メディアマスターの読み込みに失敗しました');
        setMedia(null);
      } finally {
        setLoading(false);
        setIsDirty(false);
      }
    }
    loadData();
  }, [mediaId]);

  const handleCategoryChange = (key: string, enabled: boolean) => {
    if (!media) return;
    setMedia(prev => prev ? {
      ...prev,
      categories: {
        ...prev.categories,
        [key]: { enabled }
      }
    } : prev);
    setIsDirty(true);
  };

  const handleLinkChange = (index: number, enabled: boolean) => {
    if (!media) return;
    setMedia(prev => prev ? {
      ...prev,
      links: prev.links.map((link, i) => i === index ? { ...link, enabled } : link)
    } : prev);
    setIsDirty(true);
  };

  const handleUpdate = async () => {
    if (!media) return;
    setSaving(true);
    setError(null);
    try {
      await updateMediaMaster(media);
      setIsDirty(false);
    } catch (err) {
      setError('更新に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }
  if (error) {
    return <div className="text-red-600 mb-4">{error}</div>;
  }
  if (!media) {
    return <div>データが見つかりません</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-sm text-gray-500">メディアID</div>
          <div className="font-bold">{media.id}</div>
          <div className="text-sm text-gray-500 mt-2">タイトル</div>
          <div>{media.title}</div>
        </div>
        <button
          onClick={handleUpdate}
          disabled={!isDirty || saving}
          className={`px-4 py-2 rounded ${isDirty && !saving ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          {saving ? '保存中...' : isDirty ? '更新' : '更新済み'}
        </button>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">カテゴリー有効/無効</h3>
        <div className="space-y-2">
          {Object.entries(media.categories).map(([key, { enabled }]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enabled}
                onChange={e => handleCategoryChange(key, e.target.checked)}
                className="rounded"
              />
              <span>{key}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">リンク有効/無効</h3>
        <div className="space-y-2">
          {media.links.length === 0 && <div className="text-gray-400">リンク情報なし</div>}
          {media.links.map((link, i) => (
            <label key={link.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!link.enabled}
                onChange={e => handleLinkChange(i, e.target.checked)}
                className="rounded"
              />
              <span>{link.label}（{link.url}）</span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
} 