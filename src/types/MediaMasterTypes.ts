export type MediaType = 'DVD' | 'CD' | 'DVD/Blu-ray' | 'VHS' | 'Streaming' | 'YouTube' | 'TV' | 'Web';

export type CategoryType = 'purchase' | 'streaming' | 'marketplace';

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

export type MediaLink = {
  platform: PlatformType;
  label: string;
  priority: number;
  category: CategoryType;
  enabled: boolean;
  urls: {
    direct: string;
    affiliate: string | null;
  };
};

export interface PlatformConfig {
  enabled: boolean;
  priority: number;
}

export interface Categories {
  [key: string]: {
    enabled: boolean;
  };
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
  type: string;
  category: string;
  purchaseEnabled: boolean;
  purchaseStores: PurchaseStores;
  streamingEnabled: boolean;
  marketplaceEnabled: boolean;
  links: any[];
  categories: Categories;
}

export interface MediaMasterUpdatePayload {
  categories?: Record<CategoryType, boolean>;
  platforms?: Record<string, PlatformConfig>;
}

export type MediaMasterFile = MediaMaster; 