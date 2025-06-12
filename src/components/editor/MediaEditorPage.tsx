import React, { useState, useEffect } from 'react';
import { ToursMediaEditor } from './ToursMediaEditor';
import { MediaMasterEditor } from './MediaMasterEditor';
import { Button } from '../Button';
import type { TourInfo } from '../../types/ToursMediaTypes';
import { loadToursMedia } from '../../services/toursMediaService';
import { loadMediaMaster } from '../../services/mediaMasterService';

type EditorMode = 'tours-media' | 'media-master';

interface ConfirmDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ isOpen, message, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">確認</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onCancel}>
            いいえ
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            はい
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MediaEditorPage() {
  const [mode, setMode] = useState<EditorMode>('media-master');  // 初期モードをメディアマスターに変更
  const [selectedTourId, setSelectedTourId] = useState<number | ''>('');
  const [selectedMediaId, setSelectedMediaId] = useState<string>('');
  const [tours, setTours] = useState<Array<{ id: number; title: string }>>([]);
  const [mediaIds, setMediaIds] = useState<Array<{ id: string; title: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading data...');  // デバッグログ追加

      const [tourData, mediaData] = await Promise.all([
        loadToursMedia(),
        loadMediaMaster()
      ]);

      console.log('Loaded data:', { tourData, mediaData });  // デバッグログ追加

      if (!Array.isArray(tourData) || !Array.isArray(mediaData)) {
        throw new Error('Invalid data format received');
      }

      const processedTours = tourData.map(tour => ({ id: tour.id, title: tour.title }));
      const processedMediaIds = mediaData.map(media => ({ id: media.id, title: media.title }));

      console.log('Processed data:', { processedTours, processedMediaIds });  // デバッグログ追加

      setTours(processedTours);
      setMediaIds(processedMediaIds);

      // メディアマスターモードの場合、最初のメディアを選択
      if (mode === 'media-master' && processedMediaIds.length > 0) {
        setSelectedMediaId(processedMediaIds[0].id);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      setError(error instanceof Error ? error.message : 'データの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (newMode: EditorMode) => {
    if (hasUnsavedChanges) {
      setPendingAction(() => () => {
        setMode(newMode);
        setSelectedTourId('');
        setSelectedMediaId('');
        setHasUnsavedChanges(false);
      });
      setShowConfirmDialog(true);
    } else {
      setMode(newMode);
      setSelectedTourId('');
      setSelectedMediaId('');
    }
  };

  const handleSelectionChange = (id: string | number) => {
    console.log('Selection change:', { id, mode });  // デバッグログ追加
    if (hasUnsavedChanges) {
      setPendingAction(() => () => {
        if (mode === 'tours-media') {
          setSelectedTourId(id ? Number(id) : '');
        } else {
          setSelectedMediaId(String(id));
        }
        setHasUnsavedChanges(false);
      });
      setShowConfirmDialog(true);
    } else {
      if (mode === 'tours-media') {
        setSelectedTourId(id ? Number(id) : '');
      } else {
        setSelectedMediaId(String(id));
      }
    }
  };

  const handleConfirmNavigation = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setShowConfirmDialog(false);
  };

  const handleCancelNavigation = () => {
    setPendingAction(null);
    setShowConfirmDialog(false);
  };

  if (loading) {
    return <div className="p-6">読み込み中...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
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
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">メディア情報エディタ</h1>

      <div className="flex gap-2 mb-6">
        <Button
          variant={mode === 'tours-media' ? 'primary' : 'secondary'}
          onClick={() => handleModeChange('tours-media')}
        >
          ツアーメディア情報
        </Button>
        <Button
          variant={mode === 'media-master' ? 'primary' : 'secondary'}
          onClick={() => handleModeChange('media-master')}
        >
          メディアマスター
        </Button>
      </div>

      <div className="mb-6">
        <select
          value={mode === 'tours-media' ? selectedTourId : selectedMediaId}
          onChange={(e) => handleSelectionChange(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">{mode === 'tours-media' ? 'ツアーを選択' : 'メディアを選択'}</option>
          {mode === 'tours-media' ? (
            tours.map(tour => (
              <option key={tour.id} value={tour.id}>
                {tour.title} (ID: {tour.id})
              </option>
            ))
          ) : (
            mediaIds.map(media => (
              <option key={media.id} value={media.id}>
                {media.title} (ID: {media.id})
              </option>
            ))
          )}
        </select>
      </div>

      {mode === 'tours-media' && selectedTourId && (
        <ToursMediaEditor
          tourId={Number(selectedTourId)}
          onChangesPending={setHasUnsavedChanges}
        />
      )}

      {mode === 'media-master' && selectedMediaId && (
        <MediaMasterEditor
          mediaId={selectedMediaId}
          onChangesPending={setHasUnsavedChanges}
        />
      )}

      <ConfirmDialog
        isOpen={showConfirmDialog}
        message="変更が保存されていません。移動しますか？"
        onConfirm={handleConfirmNavigation}
        onCancel={handleCancelNavigation}
      />
    </div>
  );
} 