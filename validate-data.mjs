import fs from 'fs';

try {
  console.log('📊 データファイル検証開始...\n');
  
  // ファイル存在チェック
  const files = [
    'public/data/media-master.json',
    'public/data/tours-media.json',
    'public/data/tours-core.json',
    'public/data/setlists.json'
  ];
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      console.log(`✅ ${file}: ${stats.size} bytes`);
    } else {
      console.log(`❌ ${file}: 見つかりません`);
    }
  });
  
  // データ読み込み
  const mediaMaster = JSON.parse(fs.readFileSync('public/data/media-master.json', 'utf8'));
  const toursMedia = JSON.parse(fs.readFileSync('public/data/tours-media.json', 'utf8'));
  
  console.log('\n📈 データ統計:');
  console.log(`- メディアマスター: ${mediaMaster.length} アイテム`);
  console.log(`- ツアーメディア: ${toursMedia.length} ツアー`);
  
  // カテゴリ分布
  const categories = {};
  mediaMaster.forEach(m => {
    categories[m.category] = (categories[m.category] || 0) + 1;
  });
  
  console.log('\n🏷️  メディアカテゴリ分布:');
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`- ${cat}: ${count} アイテム`);
  });
  
  // 不整合チェック
  console.log('\n🔍 不整合チェック:');
  const mediaMap = new Map(mediaMaster.map(m => [m.id, m]));
  let inconsistencies = 0;
  
  toursMedia.forEach(tour => {
    // liveVideoIds の確認
    tour.liveVideoIds?.forEach(id => {
      const media = mediaMap.get(id);
      if (!media) {
        console.log(`❌ Tour ${tour.id}: メディアID "${id}" が見つかりません`);
        inconsistencies++;
      } else if (media.category !== 'liveVideo') {
        console.log(`⚠️  Tour ${tour.id}: "${id}" は${media.category}だがliveVideoIdsで使用`);
        inconsistencies++;
      }
    });
    
    // liveArrangementIds の確認
    tour.liveArrangementIds?.forEach(id => {
      const media = mediaMap.get(id);
      if (!media) {
        console.log(`❌ Tour ${tour.id}: メディアID "${id}" が見つかりません`);
        inconsistencies++;
      } else if (media.category !== 'liveArrangement') {
        console.log(`⚠️  Tour ${tour.id}: "${id}" は${media.category}だがliveArrangementIdsで使用`);
        inconsistencies++;
      }
    });
  });
  
  if (inconsistencies === 0) {
    console.log('✅ データ整合性: 問題なし');
  } else {
    console.log(`❌ データ整合性: ${inconsistencies} 件の問題`);
  }
  
  console.log('\n🎉 検証完了!');
  
} catch (error) {
  console.error('❌ エラー:', error.message);
} 