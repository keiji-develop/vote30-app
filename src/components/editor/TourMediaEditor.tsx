import React, { useState, useEffect } from 'react';
import type { TourMedia, NoMediaItem } from '../../types/TourMediaTypes';
import type { MediaMaster, MediaItem } from '../../types/MediaMasterTypes';
import { loadTourMedia, updateTourMedia } from '../../services/tourMediaService';
import { loadMediaMaster } from '../../services/mediaMasterService';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { PlusIcon } from '@heroicons/react/24/outline';

interface TourMediaEditorProps {
  tourId: number;
  onChangesPending: (pending: boolean) => void;
}

export function TourMediaEditor({ tourId, onChangesPending }: TourMediaEditorProps) {
  const [tourMedia, setTourMedia] = useState<TourMedia | null>(null);
  const [mediaMaster, setMediaMaster] = useState<MediaMaster | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<string>('');
  const [addingTo, setAddingTo] = useState<'liveVideo' | 'liveArrangement' | null>(null);

  useEffect(() => {
    loadData();
  }, [tourId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [tourData, masterData] = await Promise.all([
        loadTourMedia(),
        loadMediaMaster()
      ]);
      const targetTourMedia = tourData.find(t => t.id === tourId);
      if (!targetTourMedia) {
        throw new Error(`ツアーID ${tourId} の情報が見つかりません`);
      }
      setTourMedia(targetTourMedia);
      setMediaMaster(masterData);
      setIsDirty(false);
      onChangesPending(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'データの読み込みに失敗しました');
      setTourMedia(null);
      setMediaMaster(null);
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

  const handleAddMedia = (type: 'liveVideo' | 'liveArrangement') => {
    if (!tourMedia || !selectedMediaId || !mediaMaster) return;
    
    const ids = type === 'liveVideo' ? tourMedia.liveVideoIds : tourMedia.liveArrangementIds;
    if (ids.includes(selectedMediaId)) {
      setError('このメディアは既に追加されています');
      return;
    }

    handleMediaListChange(type, [...ids, selectedMediaId]);
    setSelectedMediaId('');
    setAddingTo(null);
    setError(null);
  };

  const getAvailableMedia = (type: 'liveVideo' | 'liveArrangement'): MediaItem[] => {
    if (!mediaMaster) return [];
    const currentIds = type === 'liveVideo' ? tourMedia?.liveVideoIds : tourMedia?.liveArrangementIds;
    const allMedia = type === 'liveVideo' ? mediaMaster.videos : mediaMaster.arrangements;
    return allMedia.filter(media => !currentIds?.includes(media.id));
  };

  const getMediaTitle = (type: 'liveVideo' | 'liveArrangement', id: string): string => {
    if (!mediaMaster) return id;
    const media = type === 'liveVideo' 
      ? mediaMaster.videos.find(v => v.id === id)
      : mediaMaster.arrangements.find(a => a.id === id);
    return media ? `${media.id} - ${media.title}` : id;
  };

  const handleMediaListChange = (type: 'liveVideo' | 'liveArrangement', newIds: string[]) => {
    if (!tourMedia) return;
    
    setTourMedia(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [type === 'liveVideo' ? 'liveVideoIds' : 'liveArrangementIds']: newIds
      };
    });
    setIsDirty(true);
    onChangesPending(true);
  };

  const handleNoMediaInfoChange = (
    type: 'liveVideo' | 'liveArrangement',
    field: keyof NoMediaItem,
    value: boolean | string | null
  ) => {
    if (!tourMedia) return;

    setTourMedia(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        noMediaInfo: {
          ...prev.noMediaInfo,
          [type]: {
            ...prev.noMediaInfo[type],
            [field]: value
          }
        }
      };
    });
    setIsDirty(true);
    onChangesPending(true);
  };

  const onDragEnd = (result: DropResult, type: 'liveVideo' | 'liveArrangement') => {
    if (!result.destination || !tourMedia) return;
    if (result.source.droppableId !== result.destination.droppableId) return;
    if (result.destination.index === result.source.index) return;

    const items = type === 'liveVideo' ? [...tourMedia.liveVideoIds] : [...tourMedia.liveArrangementIds];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    handleMediaListChange(type, items);
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 mb-4">
        <p>{error}</p>
        <button
          onClick={loadData}
          className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          再読み込み
        </button>
      </div>
    );
  }

  if (!tourMedia) {
    return <div>データが見つかりません</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">ツアーメディア情報の編集</h2>
        <button
          onClick={handleUpdate}
          disabled={!isDirty}
          className={`px-4 py-2 rounded ${
            isDirty
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isDirty ? "更新" : "更新済み"}
        </button>
      </div>

      {/* このライブが収録されている映像・音源 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">このライブが収録されている映像・音源</h3>
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={tourMedia?.noMediaInfo.liveVideo.showNoneItem}
              onChange={(e) => handleNoMediaInfoChange('liveVideo', 'showNoneItem', e.target.checked)}
              className="rounded"
            />
            「なし」項目を表示
          </label>
          {tourMedia?.noMediaInfo.liveVideo.showNoneItem && (
            <input
              type="text"
              value={tourMedia.noMediaInfo.liveVideo.comment || ''}
              onChange={(e) => handleNoMediaInfoChange('liveVideo', 'comment', e.target.value || null)}
              placeholder="補足コメント"
              className="flex-1 px-3 py-1 border rounded"
            />
          )}
        </div>

        {/* メディア追加フォーム */}
        {addingTo === 'liveVideo' ? (
          <div className="flex gap-2 mb-4">
            <select
              value={selectedMediaId}
              onChange={(e) => setSelectedMediaId(e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
            >
              <option value="">選択してください</option>
              {getAvailableMedia('liveVideo').map(media => (
                <option key={media.id} value={media.id}>
                  {media.id} - {media.title}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleAddMedia('liveVideo')}
              disabled={!selectedMediaId}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              追加
            </button>
            <button
              onClick={() => {
                setAddingTo(null);
                setSelectedMediaId('');
              }}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              キャンセル
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAddingTo('liveVideo')}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700"
          >
            <PlusIcon className="w-5 h-5" />
            <span>映像・音源を追加</span>
          </button>
        )}

        <DragDropContext onDragEnd={(result) => onDragEnd(result, 'liveVideo')}>
          <Droppable droppableId="liveVideoList" isCombineEnabled={false} direction="vertical">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 min-h-[100px] p-2 border-2 rounded transition-colors overflow-hidden ${
                  snapshot.isDraggingOver ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-200'
                }`}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                {tourMedia?.liveVideoIds.map((id, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                          userSelect: 'none',
                          background: snapshot.isDragging ? '#f0f6ff' : 'white',
                          boxShadow: snapshot.isDragging ? '0 2px 8px rgba(0,0,0,0.15)' : undefined
                        }}
                        className={`flex items-center gap-2 p-2 border rounded transition-shadow ${
                          snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : 'hover:shadow'
                        }`}
                      >
                        <span className="flex-1">{getMediaTitle('liveVideo', id)}</span>
                        <button
                          onClick={() => {
                            const newIds = tourMedia.liveVideoIds.filter(i => i !== id);
                            handleMediaListChange('liveVideo', newIds);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          削除
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>

      {/* 同じライブアレンジの映像・音源 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">同じライブアレンジの映像・音源</h3>
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={tourMedia?.noMediaInfo.liveArrangement.showNoneItem}
              onChange={(e) => handleNoMediaInfoChange('liveArrangement', 'showNoneItem', e.target.checked)}
              className="rounded"
            />
            「なし」項目を表示
          </label>
          {tourMedia?.noMediaInfo.liveArrangement.showNoneItem && (
            <input
              type="text"
              value={tourMedia.noMediaInfo.liveArrangement.comment || ''}
              onChange={(e) => handleNoMediaInfoChange('liveArrangement', 'comment', e.target.value || null)}
              placeholder="補足コメント"
              className="flex-1 px-3 py-1 border rounded"
            />
          )}
        </div>

        {/* メディア追加フォーム */}
        {addingTo === 'liveArrangement' ? (
          <div className="flex gap-2 mb-4">
            <select
              value={selectedMediaId}
              onChange={(e) => setSelectedMediaId(e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
            >
              <option value="">選択してください</option>
              {getAvailableMedia('liveArrangement').map(media => (
                <option key={media.id} value={media.id}>
                  {media.id} - {media.title}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleAddMedia('liveArrangement')}
              disabled={!selectedMediaId}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              追加
            </button>
            <button
              onClick={() => {
                setAddingTo(null);
                setSelectedMediaId('');
              }}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              キャンセル
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAddingTo('liveArrangement')}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700"
          >
            <PlusIcon className="w-5 h-5" />
            <span>映像・音源を追加</span>
          </button>
        )}

        <DragDropContext onDragEnd={(result) => onDragEnd(result, 'liveArrangement')}>
          <Droppable droppableId="liveArrangementList" isCombineEnabled={false} direction="vertical">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 min-h-[100px] p-2 border-2 rounded transition-colors overflow-hidden ${
                  snapshot.isDraggingOver ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-200'
                }`}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                {tourMedia?.liveArrangementIds.map((id, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                          userSelect: 'none',
                          background: snapshot.isDragging ? '#f0f6ff' : 'white',
                          boxShadow: snapshot.isDragging ? '0 2px 8px rgba(0,0,0,0.15)' : undefined
                        }}
                        className={`flex items-center gap-2 p-2 border rounded transition-shadow ${
                          snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : 'hover:shadow'
                        }`}
                      >
                        <span className="flex-1">{getMediaTitle('liveArrangement', id)}</span>
                        <button
                          onClick={() => {
                            const newIds = tourMedia.liveArrangementIds.filter(i => i !== id);
                            handleMediaListChange('liveArrangement', newIds);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          削除
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>

      {error && (
        <div className="text-red-600 mt-4">
          {error}
        </div>
      )}
    </div>
  );
} 