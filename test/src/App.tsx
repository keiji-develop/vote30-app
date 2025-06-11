import React, { useState } from 'react';
import { DetailModal } from '../../src/components/DetailModal';
import testMediaMaster from '../data/test-media-master.json';
import testToursCore from '../data/test-tours-core.json';
import testToursMedia from '../data/test-tours-media.json';
import type { Tour } from '../../src/types/tour';
import type { TestToursCore, TestToursMedia, TestMediaMaster, TestMediaItem } from './types';

// 型アサーション
const mediaData = testMediaMaster as TestMediaMaster[];
const coreData = testToursCore as TestToursCore[];
const tourMediaData = testToursMedia as TestToursMedia[];

// テストデータの結合
const testTours: Tour[] = coreData.map(core => {
  const media = tourMediaData.find(m => m.id === core.id);
  
  // 映像ソースの結合
  const mediaItems = media?.liveVideoIds?.map(id => {
    const item = mediaData.find(m => m.id === id);
    if (!item) return undefined;
    
    // MediaItemの型に変換
    const mediaItem: TestMediaItem = {
      ...item,
      notes: item.notes || '', // nullを空文字列に変換
    };
    return mediaItem;
  }).filter((item): item is TestMediaItem => item !== undefined) ?? [];

  // アレンジ音源の結合
  const arrangementItems = media?.liveArrangementIds?.map(id => {
    const item = mediaData.find(m => m.id === id);
    if (!item) return undefined;
    
    // MediaItemの型に変換
    const mediaItem: TestMediaItem = {
      ...item,
      notes: item.notes || '', // nullを空文字列に変換
    };
    return mediaItem;
  }).filter((item): item is TestMediaItem => item !== undefined) ?? [];

  return {
    ...core,
    liveVideos: mediaItems,
    liveArrangements: arrangementItems
  };
});

export default function App() {
  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [previewTour, setPreviewTour] = useState<Tour | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">メディア表示制御テスト</h1>
      
      {/* テストケース一覧 */}
      <div className="space-y-4">
        {testTours.map(tour => (
          <div key={tour.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
            <p className="text-gray-600 mb-4">{tour.description}</p>
            <button
              onClick={() => setActiveTour(tour)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              詳細を表示
            </button>
          </div>
        ))}
      </div>

      {/* DetailModal */}
      {activeTour && (
        <DetailModal
          active={activeTour}
          setActive={setActiveTour}
          setPreview={setPreviewTour}
          tours={testTours}
        />
      )}
    </div>
  );
} 