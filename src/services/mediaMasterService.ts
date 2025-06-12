import type { MediaMaster, MediaMasterCollection, MediaMasterUpdatePayload } from '../types/MediaMasterTypes';

const mockMediaMasterData: MediaMaster[] = [
  {
    id: "genesis_turbo_type_d_live_arena_2000_ad_special_dvd_version",
    title: "GENESIS TURBO TYPE-D LIVE ARENA 2000 A.D. SPECIAL DVD VERSION",
    type: "DVD",
    category: "liveVideo",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "TMR_0001",
    title: "TMR LIVE REVOLUTION 2000",
    type: "DVD",
    category: "liveVideo",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "summer_crush_2000_wowow",
    title: "SUMMER CRUSH 2000 (WOWOW)",
    type: "TV",
    category: "liveVideo",
    purchaseEnabled: false,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "summarize_1",
    title: "VOTE30 Summarize Vol.1",
    type: "DVD",
    category: "liveVideo",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "summarize_2",
    title: "VOTE30 Summarize Vol.2",
    type: "DVD",
    category: "liveVideo",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "summarize_3",
    title: "VOTE30 Summarize Vol.3",
    type: "DVD",
    category: "liveVideo",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "summarize_4",
    title: "VOTE30 Summarize Vol.4",
    type: "DVD",
    category: "liveVideo",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "complete_edition_2",
    title: "VOTE30 Complete Edition 2",
    type: "DVD",
    category: "liveVideo",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "complete_edition_3",
    title: "VOTE30 Complete Edition 3",
    type: "DVD",
    category: "liveVideo",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "video1",
    title: "VOTE30 Live DVD 2024",
    type: "DVD",
    category: "liveVideo",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "video2",
    title: "VOTE30 YouTube Live",
    type: "YouTube",
    category: "liveVideo",
    purchaseEnabled: false,
    purchaseStores: {},
    streamingEnabled: true,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "arr1",
    title: "VOTE30 Live CD",
    type: "CD",
    category: "liveArrangement",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "tour_media_1",
    title: "VOTE30 Tour Media Set 1",
    type: "DVD",
    category: "tourMedia",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: false,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  },
  {
    id: "tour_media_2",
    title: "VOTE30 Tour Media Set 2",
    type: "DVD/Blu-ray",
    category: "tourMedia",
    purchaseEnabled: true,
    purchaseStores: {},
    streamingEnabled: true,
    marketplaceEnabled: false,
    links: [],
    categories: {}
  }
];

const mockMediaMasterCollection: MediaMasterCollection = {
  videos: [
    { id: "DVD_0001", title: "LIVE DVD Vol.1" },
    { id: "DVD_0002", title: "LIVE DVD Vol.2" },
    { id: "BD_0001", title: "LIVE Blu-ray Vol.1" }
  ],
  arrangements: [
    { id: "TMR_0001", title: "Tour Music Remix 1" },
    { id: "TMR_0002", title: "Tour Music Remix 2" },
    { id: "TMR_0003", title: "Tour Music Remix 3" }
  ]
};

export async function loadMediaMaster(): Promise<MediaMasterCollection> {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Using mock media master data');
      return mockMediaMasterCollection;
    }

    const response = await fetch('/api/media-master');
    if (!response.ok) {
      throw new Error('Failed to fetch media master data');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load media master:', error);
    throw error;
  }
}

export async function loadMediaMasterData(): Promise<MediaMaster[]> {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Using mock media master data');
      return mockMediaMasterData;
    }

    const response = await fetch('/api/media-master/data');
    if (!response.ok) {
      throw new Error('Failed to fetch media master data');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load media master data:', error);
    throw error;
  }
}

export const saveMediaMaster = async (data: MediaMaster): Promise<void> => {
  try {
    const response = await fetch('/api/media-master', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to save media master data');
    }
  } catch (error) {
    console.error('Error saving media master data:', error);
    throw error;
  }
};

export async function updateMediaMaster(media: MediaMaster): Promise<void> {
  try {
    // 開発環境では更新をシミュレート
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Simulating media master update', { media });
      return;
    }

    const response = await fetch(`/api/media-master/${media.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(media),
    });

    if (!response.ok) {
      throw new Error('Failed to update media master');
    }
  } catch (error) {
    console.error('Failed to update media master:', error);
    throw error;
  }
} 