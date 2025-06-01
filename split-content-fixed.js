import fs from 'fs';

// 商品名から分かりやすいIDを生成する関数
function generateReadableId(title) {
  // 特殊ケースの処理
  if (title === '無し' || title === '無し（DVD化はARENA Tourのみ）' || title === '無し（DVD/BD化はARENA STYLE Versionのみ）') {
    return 'none';
  }
  if (title === '0001') {
    return 'unknown_0001';
  }
  if (title.includes('WOWOWで生中継')) {
    return 'wowow_broadcast';
  }

  let id = title
    // DVD Series The Summary
    .replace(/T\.M\.Revolution DVD Series The Summary -summarize (\d+)-/, 'summarize_$1')
    // SEVENTH HEAVEN
    .replace(/T\.M\.Revolution SEVENTH HEAVEN.*/, 'seventh_heaven')
    // UNDER:COVER関連
    .replace(/T\.M\.R\. LIVE REVOLUTION '06 -UNDER:COVER-/, 'under_cover_live')
    .replace(/UNDER:COVER（CD）/, 'under_cover_cd')
    .replace(/T\.M\.R\. LIVE REVOLUTION'13 -UNDER II COVER-/, 'under_2_cover')
    // CLOUD NINE関連
    .replace(/T\.M\.R\. LIVE REVOLUTION'11-12 -CLOUD NINE-（CD）/, 'cloud_nine_cd')
    // その他の具体的な商品
    .replace(/LIVE REVOLUTION COMPLETE EDITION-(\d+).*/, 'complete_edition_$1')
    .replace(/T\.M\.R\. LIVE REVOLUTION '02 B★E★S★T SUMMER CRUSH 2002/, 'best_summer_crush_2002')
    .replace(/T\.M\.R\. LIVE REVOLUTION '05 -vertical infinity-（テレビ放送のみ）/, 'vertical_infinity_tv')
    .replace(/T\.M\.R\. LIVE REVOLUTION '12 -15th Anniversary FINAL-/, 'anniversary_15th_final')
    .replace(/T\.M\.R\. LIVE REVOLUTION'16-'17 -Route 20- LIVE AT NIPPON BUDOKAN/, 'route_20_budokan')
    .replace(/T\.M\.R\. LIVE REVOLUTION '17 -20th Anniversary FINAL at Saitama Super Arena-/, 'anniversary_20th_final')
    .replace(/SONIC WARP the Visual Fields/, 'sonic_warp')
    .replace(/DOUBLE-DEAL（CD）完全生産限定盤A/, 'double_deal_cd')
    .replace(/イナズマロックフェス (\d+)/, 'inazuma_$1')
    .replace(/T\.M\.R\. LIVE REVOLUTION '(\d+) -Strikes Back ([IVX]+)-/, 'strikes_back_$2_$1')
    // 一般的なクリーンアップ
    .replace(/T\.M\.R?\. LIVE REVOLUTION'?(\d+)-?'?(\d+)? ?-([^-]+)-?/g, '$3_$1')
    .replace(/T\.M\.R?\. LIVE REVOLUTION '(\d+) -([^-]+)-?/g, '$2_$1')
    .replace(/the end of genesis T\.M\.R\. evolution turbo type D/, 'genesis_turbo_type_d')
    // 記号・特殊文字の除去と正規化
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_')
    .replace(/-+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();

  // 空文字列の場合はfallback
  if (!id || id === '_') {
    id = title.replace(/[^\w]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '').toLowerCase() || 'unknown_item';
  }

  return id;
}

// 現在のtours-content.jsonを読み込み
const toursContent = JSON.parse(fs.readFileSync('public/data/tours-content.json', 'utf8'));

// 映像・音源データを収集してマスターを作成（重複排除）
const mediaItems = new Map(); // titleベースで重複排除
const usedIds = new Set(); // ID重複チェック用

// 1. tours-extra-notes.json（extraNotesのみ）
const toursExtraNotes = toursContent.map(tour => ({
  id: tour.id,
  extraNotes: tour.extraNotes || ""
}));

// 2. 映像・音源データを解析してマスターデータを構築（重複排除、分類情報保持）
toursContent.forEach(tour => {
  // liveVideosの処理
  if (tour.liveVideos) {
    if (Array.isArray(tour.liveVideos)) {
      // 配列形式（構造化データ）
      tour.liveVideos.forEach(video => {
        const title = video.title.trim();
        if (!mediaItems.has(title)) {
          let id = generateReadableId(title);
          // ID重複チェック
          let counter = 1;
          const originalId = id;
          while (usedIds.has(id)) {
            id = `${originalId}_${counter}`;
            counter++;
          }
          usedIds.add(id);

          mediaItems.set(title, {
            id: id,
            title: title,
            type: video.type || 'unknown',
            links: video.links || [],
            category: 'liveVideo' // 分類情報を保持
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
          let id = generateReadableId(title);
          // ID重複チェック
          let counter = 1;
          const originalId = id;
          while (usedIds.has(id)) {
            id = `${originalId}_${counter}`;
            counter++;
          }
          usedIds.add(id);

          mediaItems.set(title, {
            id: id,
            title: title,
            type: 'unknown',
            links: [],
            category: 'liveVideo' // 分類情報を保持
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
        const title = arrangement.notes ? arrangement.notes.trim() : arrangement.title.trim();
        if (!mediaItems.has(title)) {
          let id = generateReadableId(title);
          // ID重複チェック
          let counter = 1;
          const originalId = id;
          while (usedIds.has(id)) {
            id = `${originalId}_${counter}`;
            counter++;
          }
          usedIds.add(id);

          mediaItems.set(title, {
            id: id,
            title: title,
            type: 'note',
            links: [],
            category: 'liveArrangement' // 分類情報を保持
          });
        }
      });
    } else if (typeof tour.liveArrangements === 'string' && tour.liveArrangements.trim() !== '') {
      // 文字列形式（複数項目は改行区切り）
      const arrangementLines = tour.liveArrangements.split('\n').filter(line => line.trim() !== '');
      arrangementLines.forEach(arrangementTitle => {
        const title = arrangementTitle.trim();
        if (!mediaItems.has(title)) {
          let id = generateReadableId(title);
          // ID重複チェック
          let counter = 1;
          const originalId = id;
          while (usedIds.has(id)) {
            id = `${originalId}_${counter}`;
            counter++;
          }
          usedIds.add(id);

          mediaItems.set(title, {
            id: id,
            title: title,
            type: 'note',
            links: [],
            category: 'liveArrangement' // 分類情報を保持
          });
        }
      });
    }
  }
});

// 3. media-master.json（映像・音源マスター、重複なし、分類情報保持）
const mediaMaster = Array.from(mediaItems.values());

// 4. tours-media.json（参照関係、新しいIDで更新、分類別）
const toursMedia = toursContent.map(tour => {
  const result = {
    id: tour.id,
    liveVideoIds: [], // liveVideo用のIDリスト
    liveArrangementIds: [] // liveArrangement用のIDリスト
  };

  // liveVideosのID参照を作成
  if (tour.liveVideos) {
    if (Array.isArray(tour.liveVideos)) {
      tour.liveVideos.forEach(video => {
        const title = video.title.trim();
        const mediaItem = mediaItems.get(title);
        if (mediaItem && !result.liveVideoIds.includes(mediaItem.id)) {
          result.liveVideoIds.push(mediaItem.id);
        }
      });
    } else if (typeof tour.liveVideos === 'string' && tour.liveVideos.trim() !== '') {
      const videoLines = tour.liveVideos.split('\n').filter(line => line.trim() !== '');
      videoLines.forEach(videoTitle => {
        const title = videoTitle.trim();
        const mediaItem = mediaItems.get(title);
        if (mediaItem && !result.liveVideoIds.includes(mediaItem.id)) {
          result.liveVideoIds.push(mediaItem.id);
        }
      });
    }
  }

  // liveArrangementsのID参照を作成
  if (tour.liveArrangements) {
    if (Array.isArray(tour.liveArrangements)) {
      tour.liveArrangements.forEach(arrangement => {
        const title = arrangement.notes ? arrangement.notes.trim() : arrangement.title.trim();
        const mediaItem = mediaItems.get(title);
        if (mediaItem && !result.liveArrangementIds.includes(mediaItem.id)) {
          result.liveArrangementIds.push(mediaItem.id);
        }
      });
    } else if (typeof tour.liveArrangements === 'string' && tour.liveArrangements.trim() !== '') {
      const arrangementLines = tour.liveArrangements.split('\n').filter(line => line.trim() !== '');
      arrangementLines.forEach(arrangementTitle => {
        const title = arrangementTitle.trim();
        const mediaItem = mediaItems.get(title);
        if (mediaItem && !result.liveArrangementIds.includes(mediaItem.id)) {
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

console.log('商品名ベースIDの分割が完了しました：');
console.log('- public/data/media-master.json');
console.log('- public/data/tours-media.json');  
console.log('- public/data/tours-extra-notes.json');
console.log(`映像・音源マスターに${mediaMaster.length}件のユニークアイテムを作成しました。`);

// 生成されたIDのサンプルを表示
console.log('\n生成されたIDのサンプル:');
mediaMaster.slice(0, 10).forEach(item => {
  console.log(`  ${item.id} → ${item.title}`);
}); 