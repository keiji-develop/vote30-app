import type { Tour as BaseTour } from '../../src/types/tour';
import type { MediaItem as BaseMediaItem } from '../../src/types/media';

// テスト用にMediaItemの型を拡張
export interface TestMediaItem extends Omit<BaseMediaItem, 'notes'> {
  notes: string; // テスト用にnullを許可しない
}

// テスト用にTourの型を拡張
export interface TestTour extends Omit<BaseTour, 'liveVideos'> {
  liveVideos: TestMediaItem[];
}

// JSONデータの型
export interface TestToursCore {
  id: number;
  title: string;
  subtitle: string;
  year: number;
  description: string;
}

export interface TestToursMedia {
  id: number;
  liveVideoIds: string[];
  liveArrangementIds: string[];
  noMediaInfo: {
    liveVideo: {
      showNoneItem: boolean;
      comment: string | null;
    };
    liveArrangement: {
      showNoneItem: boolean;
      comment: string | null;
    };
  };
}

export interface TestMediaMaster {
  id: string;
  title: string;
  type: string;
  notes: string;
  categories?: {
    [key: string]: {
      enabled: boolean;
    };
  };
  links: Array<{
    platform: string;
    category: string;
    label: string;
    priority: number;
    enabled: boolean;
    urls: {
      direct: string;
      affiliate: string | null;
    };
  }>;
} 