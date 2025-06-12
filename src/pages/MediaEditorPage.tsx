import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TourMediaEditor } from '../components/editor/TourMediaEditor';
import { MediaMasterEditor } from '../components/editor/MediaMasterEditor';

type EditorMode = 'tourMedia' | 'mediaMaster';

export function MediaEditorPage() {
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get('tourId');
  const mediaId = searchParams.get('mediaId');
  const [hasChanges, setHasChanges] = useState(false);

  // ページを離れる前に変更が保存されていない場合に警告を表示
  window.onbeforeunload = hasChanges 
    ? (e) => {
        e.preventDefault();
        return e.returnValue = '変更が保存されていません。このページを離れてもよろしいですか？';
      }
    : null;

  if (!tourId && !mediaId) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-red-600 mb-2">エラー</h1>
          <p className="text-gray-700">ツアーIDまたはメディアIDが指定されていません。</p>
          <p className="text-gray-600 mt-2">
            URLに以下のいずれかのパラメータを追加してください：
            <br />
            - ツアーID: ?tourId=数字
            <br />
            - メディアID: ?mediaId=文字列
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          {tourId ? (
            <TourMediaEditor 
              tourId={parseInt(tourId, 10)} 
              onChangesPending={setHasChanges}
            />
          ) : mediaId ? (
            <MediaMasterEditor 
              mediaId={mediaId} 
              onChangesPending={setHasChanges}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
} 