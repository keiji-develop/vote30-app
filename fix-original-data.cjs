const fs = require('fs');

console.log('📊 元のtours.jsonの二重表示問題を修正...');

try {
  const toursData = JSON.parse(fs.readFileSync('public/tours.json', 'utf8'));
  
  console.log(`読み込み: ${toursData.length} ツアー`);
  
  // バックアップを作成
  fs.writeFileSync('backup/tours-original.json', JSON.stringify(toursData, null, 2));
  console.log('✅ バックアップ作成: backup/tours-original.json');
  
  let modifiedCount = 0;
  
  toursData.forEach((tour, index) => {
    let modified = false;
    
    // liveVideosの重複チェック
    if (Array.isArray(tour.liveVideos) && typeof tour.liveVideos === 'object') {
      // 配列形式が存在する場合、文字列形式を削除
      if (tour.liveVideos && typeof tour.liveVideos === 'string') {
        console.log(`🔧 Tour ${tour.id}: 文字列形式のliveVideosを削除（配列形式を優先）`);
        delete tour.liveVideos; // 文字列形式を削除
        modified = true;
      }
    } else if (typeof tour.liveVideos === 'string') {
      // 文字列形式のみの場合はそのまま保持
      console.log(`📝 Tour ${tour.id}: 文字列形式のliveVideosを保持`);
    }
    
    // liveArrangementsの重複チェック
    if (Array.isArray(tour.liveArrangements) && typeof tour.liveArrangements === 'object') {
      // 配列形式が存在する場合、文字列形式を削除
      if (tour.liveArrangements && typeof tour.liveArrangements === 'string') {
        console.log(`🔧 Tour ${tour.id}: 文字列形式のliveArrangementsを削除（配列形式を優先）`);
        delete tour.liveArrangements; // 文字列形式を削除
        modified = true;
      }
    } else if (typeof tour.liveArrangements === 'string') {
      // 文字列形式のみの場合はそのまま保持
      console.log(`📝 Tour ${tour.id}: 文字列形式のliveArrangementsを保持`);
    }
    
    if (modified) {
      modifiedCount++;
    }
  });
  
  // 修正版を保存
  fs.writeFileSync('public/tours.json', JSON.stringify(toursData, null, 2));
  console.log(`✅ 修正完了: ${modifiedCount} ツアーを修正`);
  console.log('💾 修正版データを public/tours.json に保存');
  
} catch (error) {
  console.error('❌ エラー:', error.message);
} 