import type { Tour } from '../types/tour';
import type { MediaItem, TourMedia, TourExtraNotes, TourCore, Setlist } from '../types/media';

export async function loadToursData(): Promise<Tour[]> {
  const version = import.meta.env?.VITE_APP_VERSION || Date.now();
  
  console.log('🔄 Loading tours data from split files...');
  
  try {
    // 並行してすべてのJSONファイルを取得
    console.log('📥 Fetching data files...');
    const [
      toursCore,
      setlists,
      mediaMaster,
      toursMedia,
      toursExtraNotes
    ] = await Promise.all([
      fetch(`data/tours-core.json?v=${version}`).then(r => r.json()) as Promise<TourCore[]>,
      fetch(`data/setlists.json?v=${version}`).then(r => r.json()) as Promise<Setlist[]>,
      fetch(`data/media-master.json?v=${version}`).then(r => r.json()) as Promise<MediaItem[]>,
      fetch(`data/tours-media.json?v=${version}`).then(r => r.json()) as Promise<TourMedia[]>,
      fetch(`data/tours-extra-notes.json?v=${version}`).then(r => r.json()) as Promise<TourExtraNotes[]>
    ]);

    console.log(`✅ Data loaded: ${toursCore.length} tours, ${setlists.length} setlists, ${mediaMaster.length} media items`);

    // インデックスマップを作成（高速化のため）
    const setlistMap = new Map(setlists.map(s => [s.tourId, s.songs]));
    const mediaMap = new Map(mediaMaster.map(m => [m.id, m]));
    const extraNotesMap = new Map(toursExtraNotes.map(en => [en.id, en.extraNotes]));

    // データを結合してTour配列を作成
    console.log('🔗 Merging data...');
    const tours: Tour[] = toursCore.map(core => {
      const setlist = setlistMap.get(core.id);
      const tourMedia = toursMedia.find(tm => tm.id === core.id);
      const extraNotes = extraNotesMap.get(core.id) || '';

      // 分類別にメディア情報を取得
      const liveVideoIds = tourMedia?.liveVideoIds || [];
      const liveArrangementIds = tourMedia?.liveArrangementIds || [];
      
      const liveVideos = liveVideoIds.map(id => mediaMap.get(id)).filter(Boolean) as MediaItem[];
      const liveArrangements = liveArrangementIds.map(id => mediaMap.get(id)).filter(Boolean) as MediaItem[];

      return {
        id: core.id,
        title: core.title,
        subtitle: core.subtitle,
        year: core.year,
        description: core.description,
        setlist: setlist || [],
        extraNotes,
        // 分類情報を使って正しく分けて配列形式で返す
        liveVideos: liveVideos.length > 0 ? liveVideos.map(v => ({
          title: v.title,
          type: v.type as 'DVD' | 'Blu-ray' | 'YouTube' | '配信' | 'TV' | 'VHS',
          links: v.links || []
        })) : undefined,
        liveArrangements: liveArrangements.length > 0 ? liveArrangements.map(a => ({
          title: a.title,
          type: a.type as 'CD' | 'DVD' | 'TV' | '配信',
          notes: a.title
        })) : undefined,
        // 必要に応じて他のフィールドも追加
        memo: '',
        releases: []
      };
    });

    console.log(`✅ Successfully merged ${tours.length} tours`);
    return tours;

  } catch (error) {
    console.error('❌ Failed to load tours data:', error);
    // フォールバック: 従来のtours.jsonを試す
    try {
      console.log('🔄 Trying fallback tours.json...');
      const fallbackData = await fetch(`tours.json?v=${version}`).then(r => r.json());
      console.warn('⚠️ Using fallback tours.json');
      return fallbackData;
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError);
      return [];
    }
  }
}

// メディア情報を取得するヘルパー関数
export async function getMediaItems(mediaIds: string[]): Promise<MediaItem[]> {
  const version = import.meta.env?.VITE_APP_VERSION || Date.now();
  
  try {
    const mediaMaster = await fetch(`data/media-master.json?v=${version}`).then(r => r.json()) as MediaItem[];
    const mediaMap = new Map(mediaMaster.map(m => [m.id, m]));
    
    return mediaIds.map(id => mediaMap.get(id)).filter(Boolean) as MediaItem[];
  } catch (error) {
    console.error('Failed to load media data:', error);
    return [];
  }
} 