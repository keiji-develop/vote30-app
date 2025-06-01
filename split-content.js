import fs from 'fs';

// 現在のtours-content.jsonを読み込み
const toursContent = JSON.parse(fs.readFileSync('public/data/tours-content.json', 'utf8'));

// 映像・音源データを収集してマスターを作成
const mediaItems = new Map(); // 重複排除用
let mediaIdCounter = 1;

// 1. tours-extra-notes.json（extraNotesのみ）
const toursExtraNotes = toursContent.map(tour => ({
  id: tour.id,
  extraNotes: tour.extraNotes || ""
}));

// 2. 映像・音源データを解析してマスターデータを構築
toursContent.forEach(tour => {
  // liveVideosの処理
  if (tour.liveVideos) {
    if (Array.isArray(tour.liveVideos)) {
      // 配列形式（構造化データ）
      tour.liveVideos.forEach(video => {
        const key = video.title + '|' + video.type;
        if (!mediaItems.has(key)) {
          mediaItems.set(key, {
            id: `media${mediaIdCounter++}`,
            title: video.title,
            type: video.type,
            category: 'liveVideo',
            links: video.links || []
          });
        }
      });
    } else if (typeof tour.liveVideos === 'string' && tour.liveVideos.trim() !== '') {
      // 文字列形式（複数項目は改行区切り）
      const videoLines = tour.liveVideos.split('\n').filter(line => line.trim() !== '');
      videoLines.forEach(videoTitle => {
        const key = videoTitle.trim() + '|unknown';
        if (!mediaItems.has(key)) {
          mediaItems.set(key, {
            id: `media${mediaIdCounter++}`,
            title: videoTitle.trim(),
            type: 'unknown',
            category: 'liveVideo',
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
        const key = arrangement.notes + '|arrangement';
        if (!mediaItems.has(key)) {
          mediaItems.set(key, {
            id: `media${mediaIdCounter++}`,
            title: arrangement.notes,
            type: 'note',
            category: 'liveArrangement',
            links: []
          });
        }
      });
    } else if (typeof tour.liveArrangements === 'string' && tour.liveArrangements.trim() !== '') {
      // 文字列形式（複数項目は改行区切り）
      const arrangementLines = tour.liveArrangements.split('\n').filter(line => line.trim() !== '');
      arrangementLines.forEach(arrangementTitle => {
        const key = arrangementTitle.trim() + '|arrangement';
        if (!mediaItems.has(key)) {
          mediaItems.set(key, {
            id: `media${mediaIdCounter++}`,
            title: arrangementTitle.trim(),
            type: 'note',
            category: 'liveArrangement',
            links: []
          });
        }
      });
    }
  }
});

// 3. media-master.json（映像・音源マスター）
const mediaMaster = Array.from(mediaItems.values());

// 4. tours-media.json（参照関係）
const toursMedia = toursContent.map(tour => {
  const result = {
    id: tour.id,
    liveVideoIds: [],
    liveArrangementIds: []
  };

  // liveVideosのID参照を作成
  if (tour.liveVideos) {
    if (Array.isArray(tour.liveVideos)) {
      tour.liveVideos.forEach(video => {
        const key = video.title + '|' + video.type;
        const mediaItem = mediaItems.get(key);
        if (mediaItem) {
          result.liveVideoIds.push(mediaItem.id);
        }
      });
    } else if (typeof tour.liveVideos === 'string' && tour.liveVideos.trim() !== '') {
      const videoLines = tour.liveVideos.split('\n').filter(line => line.trim() !== '');
      videoLines.forEach(videoTitle => {
        const key = videoTitle.trim() + '|unknown';
        const mediaItem = mediaItems.get(key);
        if (mediaItem) {
          result.liveVideoIds.push(mediaItem.id);
        }
      });
    }
  }

  // liveArrangementsのID参照を作成
  if (tour.liveArrangements) {
    if (Array.isArray(tour.liveArrangements)) {
      tour.liveArrangements.forEach(arrangement => {
        const key = arrangement.notes + '|arrangement';
        const mediaItem = mediaItems.get(key);
        if (mediaItem) {
          result.liveArrangementIds.push(mediaItem.id);
        }
      });
    } else if (typeof tour.liveArrangements === 'string' && tour.liveArrangements.trim() !== '') {
      const arrangementLines = tour.liveArrangements.split('\n').filter(line => line.trim() !== '');
      arrangementLines.forEach(arrangementTitle => {
        const key = arrangementTitle.trim() + '|arrangement';
        const mediaItem = mediaItems.get(key);
        if (mediaItem) {
          result.liveArrangementIds.push(mediaItem.id);
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

console.log('tours-content.jsonの分割が完了しました：');
console.log('- public/data/media-master.json');
console.log('- public/data/tours-media.json');
console.log('- public/data/tours-extra-notes.json');
console.log(`映像・音源マスターに${mediaMaster.length}件のアイテムを作成しました。`); 