import fs from 'fs';

// 現在のtours.jsonを読み込み
const tours = JSON.parse(fs.readFileSync('public/tours.json', 'utf8'));

// 1. tours-core.json（編集禁止）
const toursCore = tours.map(tour => ({
  id: tour.id,
  title: tour.title,
  subtitle: tour.subtitle,
  year: tour.year,
  description: tour.description
}));

// 2. setlists.json（編集禁止）
const setlists = tours.map(tour => ({
  tourId: tour.id,
  songs: tour.setlist
}));

// 3. tours-content.json（編集対象）
const toursContent = tours.map(tour => ({
  id: tour.id,
  memo: tour.memo || "",
  liveVideos: tour.liveVideos || "",
  liveArrangements: tour.liveArrangements || "",
  extraNotes: tour.extraNotes || ""
}));

// 4. songs-master.json（将来の統計用）
const allSongs = new Set();
tours.forEach(tour => {
  if (tour.setlist) {
    tour.setlist.forEach(song => {
      // セクション（---アンコール---など）は除外
      if (!song.startsWith('---') || !song.endsWith('---')) {
        allSongs.add(song);
      }
    });
  }
});

const songsMaster = Array.from(allSongs).map(songName => ({
  songName: songName,
  variations: [songName]
}));

// dataディレクトリを作成
if (!fs.existsSync('public/data')) {
  fs.mkdirSync('public/data');
}

// ファイル出力
fs.writeFileSync('public/data/tours-core.json', JSON.stringify(toursCore, null, 2));
fs.writeFileSync('public/data/setlists.json', JSON.stringify(setlists, null, 2));
fs.writeFileSync('public/data/tours-content.json', JSON.stringify(toursContent, null, 2));
fs.writeFileSync('public/data/songs-master.json', JSON.stringify(songsMaster, null, 2));

console.log('分割が完了しました：');
console.log('- public/data/tours-core.json');
console.log('- public/data/setlists.json'); 
console.log('- public/data/tours-content.json');
console.log('- public/data/songs-master.json'); 