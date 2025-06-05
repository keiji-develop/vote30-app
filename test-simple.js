const fs = require('fs');

console.log('📊 データ基本チェック');

try {
  const mediaMaster = JSON.parse(fs.readFileSync('public/data/media-master.json', 'utf8'));
  const toursMedia = JSON.parse(fs.readFileSync('public/data/tours-media.json', 'utf8'));
  
  console.log(`✅ メディアマスター: ${mediaMaster.length} アイテム`);
  console.log(`✅ ツアーメディア: ${toursMedia.length} ツアー`);
  
  // Tour 1の状態確認
  const tour1 = toursMedia.find(t => t.id === 1);
  console.log('\n🔍 Tour 1の状態:');
  console.log(`- liveVideoIds: ${JSON.stringify(tour1.liveVideoIds)}`);
  console.log(`- liveArrangementIds: ${JSON.stringify(tour1.liveArrangementIds)}`);
  
  // summarize_1 の情報
  const summarize1 = mediaMaster.find(m => m.id === 'summarize_1');
  if (summarize1) {
    console.log(`\n📹 summarize_1: category="${summarize1.category}"`);
  }
  
  console.log('\n✨ 検証完了');
  
} catch (error) {
  console.error('❌ エラー:', error.message);
} 