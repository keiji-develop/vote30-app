import type { Tour } from '../../src/types/tour';
import type { MediaItem, TourMedia, TourCore } from '../../src/types/media';

// テストデータを読み込む関数
export async function loadTestData(): Promise<Tour[]> {
  try {
    // テストデータを読み込む
    const [toursCore, mediaMaster, toursMedia] = await Promise.all([
      import('../data/test-tours-core.json'),
      import('../data/test-media-master.json'),
      import('../data/test-tours-media.json')
    ]);

    // メディアマップを作成
    const mediaMap = new Map(
      (mediaMaster.default as MediaItem[]).map(m => [m.id, m])
    );

    // データを結合してTour配列を作成
    const tours: Tour[] = (toursCore.default as TourCore[]).map(core => {
      const tourMedia = (toursMedia.default as TourMedia[]).find(tm => tm.id === core.id);

      // メディア情報の処理
      const liveVideoIds = tourMedia?.liveVideoIds || [];
      const liveArrangementIds = tourMedia?.liveArrangementIds || [];
      
      const liveVideos = liveVideoIds
        .map(id => mediaMap.get(id))
        .filter((m): m is MediaItem => m !== undefined);
      const liveArrangements = liveArrangementIds
        .map(id => mediaMap.get(id))
        .filter((m): m is MediaItem => m !== undefined);

      // liveVideosの処理
      let processedLiveVideos: MediaItem[] | undefined;
      if (liveVideos.length > 0) {
        processedLiveVideos = liveVideos.map(v => ({
          id: v.id,
          title: v.notes ? `${v.title}（${v.notes}）` : v.title,
          type: v.type,
          notes: v.notes,
          categories: v.categories || {},
          links: v.links || [],
          isNone: false
        }));
      } else if (tourMedia?.noMediaInfo?.liveVideo?.showNoneItem === true) {
        const comment = tourMedia.noMediaInfo.liveVideo.comment;
        processedLiveVideos = [{
          id: `none-${core.id}-video`,
          title: comment ? `無し（${comment}）` : "無し",
          type: "none",
          notes: comment || null,
          categories: {},
          links: [],
          isNone: true
        }];
      }

      // liveArrangementsの処理
      let processedLiveArrangements: MediaItem[] | undefined;
      if (liveArrangements.length > 0) {
        processedLiveArrangements = liveArrangements.map(a => ({
          id: a.id,
          title: a.notes ? `${a.title}（${a.notes}）` : a.title,
          type: a.type,
          notes: a.notes,
          categories: a.categories || {},
          links: a.links || [],
          isNone: false
        }));
      } else if (tourMedia?.noMediaInfo?.liveArrangement?.showNoneItem === true) {
        const comment = tourMedia.noMediaInfo.liveArrangement.comment;
        processedLiveArrangements = [{
          id: `none-${core.id}-arrangement`,
          title: comment ? `無し（${comment}）` : "無し",
          type: "none",
          notes: comment || null,
          categories: {},
          links: [],
          isNone: true
        }];
      }

      return {
        ...core,
        liveVideos: processedLiveVideos,
        liveArrangements: processedLiveArrangements,
        setlist: [],
        extraNotes: '',
        memo: '',
        releases: []
      };
    });

    return tours;
  } catch (error) {
    console.error('Failed to load test data:', error);
    return [];
  }
} 