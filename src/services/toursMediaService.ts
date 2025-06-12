import type { TourMedia, TourMediaFile } from '../types/ToursMediaTypes';

const mockData: TourMedia[] = [
  {
    id: 1,
    title: "VOTE30 Tour 2024",
    subtitle: "Spring Tour",
    description: "Spring tour description",
    liveVideoIds: ["summarize_1", "complete_edition_2"],
    liveArrangementIds: [],
    relatedMedias: [],
    noMediaItems: {
      liveVideo: {
        label: "ライブ映像",
        text: "映像はありません",
        showNoneItem: false,
        comment: null
      },
      liveArrangement: {
        label: "ライブアレンジ",
        text: "アレンジはありません",
        showNoneItem: true,
        comment: null
      }
    }
  },
  {
    id: 2,
    title: "VOTE30 Tour 2023",
    subtitle: "Winter Tour",
    description: "Winter tour description",
    liveVideoIds: ["summarize_2", "TMR_0001"],
    liveArrangementIds: [],
    relatedMedias: [],
    noMediaItems: {
      liveVideo: {
        label: "ライブ映像",
        text: "映像はありません",
        showNoneItem: false,
        comment: null
      },
      liveArrangement: {
        label: "ライブアレンジ",
        text: "アレンジはありません",
        showNoneItem: true,
        comment: null
      }
    }
  }
];

export async function loadToursMedia(): Promise<TourMedia[]> {
  try {
    // 開発環境ではモックデータを使用
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Using mock tours media data');
      return mockData;
    }

    const response = await fetch('/api/tours-media');
    if (!response.ok) {
      throw new Error('Failed to fetch tours media data');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load tours media:', error);
    return [];
  }
}

export const saveToursMedia = async (data: TourMediaFile): Promise<void> => {
  try {
    const response = await fetch('/api/tours-media', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to save tours media data');
    }
  } catch (error) {
    console.error('Error saving tours media data:', error);
    throw error;
  }
};

export async function updateTourMedia(tourMedia: TourMedia): Promise<void> {
  try {
    // 開発環境では更新をシミュレート
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Simulating tour media update', { tourMedia });
      return;
    }

    const response = await fetch(`/api/tours-media/${tourMedia.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tourMedia),
    });

    if (!response.ok) {
      throw new Error('Failed to update tour media');
    }
  } catch (error) {
    console.error('Failed to update tour media:', error);
    throw error;
  }
} 