import fs from 'fs';
import path from 'path';

// データファイルを読み込み
const mediaMaster = JSON.parse(fs.readFileSync('./public/data/media-master.json', 'utf8'));
const toursMedia = JSON.parse(fs.readFileSync('./public/data/tours-media.json', 'utf8'));

console.log('🔍 データ整合性チェック開始...');

// 1. メディアマスターのカテゴリと実際の使用を照合
console.log('\n📊 カテゴリ不整合チェック:');
const mediaMap = new Map(mediaMaster.map(m => [m.id, m]));

toursMedia.forEach(tour => {
  // liveVideoIds の確認
  tour.liveVideoIds.forEach(id => {
    const media = mediaMap.get(id);
    if (media && media.category !== 'liveVideo') {
      console.log(`⚠️  Tour ${tour.id}: ${id} は${media.category}だが liveVideoIds で使用`);
    }
  });
  
  // liveArrangementIds の確認
  tour.liveArrangementIds.forEach(id => {
    const media = mediaMap.get(id);
    if (media && media.category !== 'liveArrangement') {
      console.log(`⚠️  Tour ${tour.id}: ${id} は${media.category}だが liveArrangementIds で使用`);
    }
  });
});

// 2. 重複使用の検出
console.log('\n🔄 重複使用チェック:');
const videoUsage = new Map();
const arrangementUsage = new Map();

toursMedia.forEach(tour => {
  tour.liveVideoIds.forEach(id => {
    if (!videoUsage.has(id)) videoUsage.set(id, []);
    videoUsage.get(id).push(tour.id);
  });
  
  tour.liveArrangementIds.forEach(id => {
    if (!arrangementUsage.has(id)) arrangementUsage.set(id, []);
    arrangementUsage.get(id).push(tour.id);
  });
});

// 重複使用されているメディアを表示
videoUsage.forEach((tours, mediaId) => {
  if (tours.length > 1) {
    console.log(`📹 ${mediaId}: Tours ${tours.join(', ')} で重複使用`);
  }
});

arrangementUsage.forEach((tours, mediaId) => {
  if (tours.length > 1) {
    console.log(`🎵 ${mediaId}: Tours ${tours.join(', ')} で重複使用`);
  }
});

// 3. 修正提案の生成
console.log('\n🛠️  修正提案:');

// Tour ID 1 の修正（summarize_1 が両方のカテゴリに存在）
const tour1 = toursMedia.find(t => t.id === 1);
if (tour1) {
  const summarize1Media = mediaMap.get('summarize_1');
  if (summarize1Media) {
    console.log(`\n修正 Tour 1:`);
    console.log(`- summarize_1 は category: ${summarize1Media.category}`);
    
    if (summarize1Media.category === 'liveVideo') {
      console.log(`- liveArrangementIds から summarize_1 を削除すべき`);
      tour1.liveArrangementIds = tour1.liveArrangementIds.filter(id => id !== 'summarize_1');
    } else {
      console.log(`- liveVideoIds から summarize_1 を削除すべき`);  
      tour1.liveVideoIds = tour1.liveVideoIds.filter(id => id !== 'summarize_1');
    }
  }
}

// 4. 修正版データの出力
console.log('\n💾 修正版データを生成中...');

// バックアップを作成
fs.writeFileSync('./public/data/tours-media.json.backup', JSON.stringify(toursMedia, null, 2));
console.log('✅ バックアップ作成: tours-media.json.backup');

// 修正版を出力
fs.writeFileSync('./public/data/tours-media.json', JSON.stringify(toursMedia, null, 2));
console.log('✅ 修正版データ保存完了');

// 5. 使用されていないメディアアイテムの検出
console.log('\n🔍 未使用メディアアイテム:');
const usedMediaIds = new Set();
toursMedia.forEach(tour => {
  tour.liveVideoIds.forEach(id => usedMediaIds.add(id));
  tour.liveArrangementIds.forEach(id => usedMediaIds.add(id));
});

const unusedMedia = mediaMaster.filter(m => !usedMediaIds.has(m.id));
if (unusedMedia.length > 0) {
  console.log('未使用のメディアアイテム:');
  unusedMedia.forEach(m => console.log(`- ${m.id}: "${m.title}"`));
} else {
  console.log('✅ すべてのメディアアイテムが使用されています');
}

console.log('\n�� データ整合性チェック完了!'); 