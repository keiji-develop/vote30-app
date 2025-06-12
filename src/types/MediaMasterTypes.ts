export type MediaType = 'DVD' | 'CD' | 'DVD/Blu-ray' | 'VHS' | 'Streaming' | 'YouTube' | 'TV' | 'Web';

export type CategoryType = 'liveVideo' | 'liveArrangement' | 'tourMedia';

export type PlatformType =
  | 'sony_music'
  | 'amazon'
  | 'rakuten_books'
  | 'yahoo_shopping'
  | 'seven_net'
  | 'spotify'
  | 'rakuten_music'
  | 'recochoku'
  | 'apple_music'
  | 'amazon_music'
  | 'line_music'
  | 'youtube'
  | 'mercari'
  | 'yahoo_auction'
  | 'rakuma';

export interface MediaItem {
  id: string;
  title: string;
}

export interface MediaLink {
  id: string;
  label: string;
  url: string;
  category: string;
  enabled: boolean;
}

export interface CategorySetting {
  enabled: boolean;
}

export interface Categories {
  [key: string]: CategorySetting;
}

export interface PlatformConfig {
  enabled: boolean;
  priority: number;
}

export interface PurchaseStore {
  enabled: boolean;
  priority: number;
}

export interface PurchaseStores {
  [key: string]: PurchaseStore;
}

export interface MediaMaster {
  id: string;
  title: string;
  type: MediaType;
  category: CategoryType;
  purchaseEnabled: boolean;
  purchaseStores: PurchaseStores;
  streamingEnabled: boolean;
  marketplaceEnabled: boolean;
  links: MediaLink[];
  categories: Categories;
}

export interface MediaMasterCollection {
  videos: MediaItem[];
  arrangements: MediaItem[];
}

export interface MediaMasterUpdatePayload {
  categories?: Record<CategoryType, boolean>;
  platforms?: Record<string, PlatformConfig>;
}

export type MediaMasterFile = MediaMaster; 