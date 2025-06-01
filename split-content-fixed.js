import fs from 'fs';

// 現在のtours-content.jsonを読み込み
const toursContent = JSON.parse(fs.readFileSync('public/data/tours-content.json', 'utf8'));

// 映像・音源データを収集してマスターを作成（重複排除）
const mediaItems = new Map(); // titleベースで重複排除
let mediaIdCounter = 1;

// 1. tours-extra-notes.json（extraNotesのみ）
const toursExtraNotes = toursContent.map(tour => ({
  id: tour.id,
  extraNotes: tour.extraNotes || ""
}));

// 2. 映像・音源データを解析してマスターデータを構築（重複排除）
toursContent.forEach(tour => {
  // liveVideosの処理
  if (tour.liveVideos) {
    if (Array.isArray(tour.liveVideos)) {
      // 配列形式（構造化データ）
      tour.liveVideos.forEach(video => {
        const title = video.title.trim();
        if (!mediaItems.has(title)) {
          mediaItems.set(title, {
            id: `media${mediaIdCounter++}`,
            title: title,
            type: video.type || 'unknown',
            links: video.links || []
          });
        } else {
          // 既存アイテムのlinksを更新（より詳細な情報があれば）
          const existing = mediaItems.get(title);
          if (video.links && video.links.length > 0 && existing.links.length === 0) {
            existing.links = video.links;
            existing.type = video.type || existing.type;
          }
        }
      });
    } else if (typeof tour.liveVideos === 'string' && tour.liveVideos.trim() !== '') {
      // 文字列形式（複数項目は改行区切り）
      const videoLines = tour.liveVideos.split('\n').filter(line => line.trim() !== '');
      videoLines.forEach(videoTitle => {
        const title = videoTitle.trim();
        if (!mediaItems.has(title)) {
          mediaItems.set(title, {
            id: `media${mediaIdCounter++}`,
            title: title,
            type: 'unknown',
            links: []
          });
        }
      });
    }
  }

  // liveArrangementsの処理
  if (tour.liveArrangements) {
    if (Array.isArray(tour.liveArrangements)) {
      // 配列形式（構造化データ）
      tour.liveArrangements.forEach(arrangement => {
        const title = arrangement.notes.trim();
        if (!mediaItems.has(title)) {
          mediaItems.set(title, {
            id: `media${mediaIdCounter++}`,
            title: title,
            type: 'note',
            links: []
          });
        }
      });
    } else if (typeof tour.liveArrangements === 'string' && tour.liveArrangements.trim() !== '') {
      // 文字列形式（複数項目は改行区切り）
      const arrangementLines = tour.liveArrangements.split('\n').filter(line => line.trim() !== '');
      arrangementLines.forEach(arrangementTitle => {
        const title = arrangementTitle.trim();
        if (!mediaItems.has(title)) {
          mediaItems.set(title, {
            id: `media${mediaIdCounter++}`,
            title: title,
            type: 'note',
            links: []
          });
        }
      });
    }
  }
});

// 3. media-master.json（映像・音源マスター、categoryなし、重複なし）
const mediaMaster = Array.from(mediaItems.values());

// 4. tours-media.json（参照関係、新しいIDで更新）
const toursMedia = toursContent.map(tour => {
  const result = {
    id: tour.id,
    mediaIds: [] // liveVideoIdsとliveArrangementIdsを統合
  };

  // liveVideosのID参照を作成
  if (tour.liveVideos) {
    if (Array.isArray(tour.liveVideos)) {
      tour.liveVideos.forEach(video => {
        const title = video.title.trim();
        const mediaItem = mediaItems.get(title);
        if (mediaItem && !result.mediaIds.includes(mediaItem.id)) {
          result.mediaIds.push(mediaItem.id);
        }
      });
    } else if (typeof tour.liveVideos === 'string' && tour.liveVideos.trim() !== '') {
      const videoLines = tour.liveVideos.split('\n').filter(line => line.trim() !== '');
      videoLines.forEach(videoTitle => {
        const title = videoTitle.trim();
        const mediaItem = mediaItems.get(title);
        if (mediaItem && !result.mediaIds.includes(mediaItem.id)) {
          result.mediaIds.push(mediaItem.id);
        }
      });
    }
  }

  // liveArrangementsのID参照を作成
  if (tour.liveArrangements) {
    if (Array.isArray(tour.liveArrangements)) {
      tour.liveArrangements.forEach(arrangement => {
        const title = arrangement.notes.trim();
        const mediaItem = mediaItems.get(title);
        if (mediaItem && !result.mediaIds.includes(mediaItem.id)) {
          result.mediaIds.push(mediaItem.id);
        }
      });
    } else if (typeof tour.liveArrangements === 'string' && tour.liveArrangements.trim() !== '') {
      const arrangementLines = tour.liveArrangements.split('\n').filter(line => line.trim() !== '');
      arrangementLines.forEach(arrangementTitle => {
        const title = arrangementTitle.trim();
        const mediaItem = mediaItems.get(title);
        if (mediaItem && !result.mediaIds.includes(mediaItem.id)) {
          result.mediaIds.push(mediaItem.id);
        }
      });
    }
  }

  return result;
});

// ファイル出力
fs.writeFileSync('public/data/media-master.json', JSON.stringify(mediaMaster, null, 2));
fs.writeFileSync('public/data/tours-media.json', JSON.stringify(toursMedia, null, 2));
fs.writeFileSync('public/data/tours-extra-notes.json', JSON.stringify(toursExtraNotes, null, 2));

console.log('修正版の分割が完了しました：');
console.log('- public/data/media-master.json');
console.log('- public/data/tours-media.json');  
console.log('- public/data/tours-extra-notes.json');
console.log(`映像・音源マスターに${mediaMaster.length}件のユニークアイテムを作成しました。`); 