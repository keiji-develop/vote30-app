import type { TourMedia, NoMediaItem } from '../types/TourMediaTypes';

const mockData: TourMedia[] = [
  {
    id: 1,
    liveVideoIds: ["DVD_0001", "BD_0001"],
    liveArrangementIds: ["TMR_0001", "TMR_0002"],
    noMediaInfo: {
      liveVideo: {
        showNoneItem: false,
        comment: null
      },
      liveArrangement: {
        showNoneItem: false,
        comment: null
      }
    }
  },
  {
    id: 11,
    liveVideoIds: [],
    liveArrangementIds: ["TMR_0001"],
    noMediaInfo: {
      liveVideo: {
        showNoneItem: true,
        comment: "DVD化はARENA Tourのみ"
      },
      liveArrangement: {
        showNoneItem: false,
        comment: null
      }
    }
  }
];

export async function loadTourMedia(): Promise<TourMedia[]> {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Using mock tour media data');
      return mockData;
    }

    const response = await fetch('/api/tours-media');
    if (!response.ok) {
      throw new Error('Failed to fetch tour media data');
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format: expected an array');
    }
    return data;
  } catch (error) {
    console.error('Failed to load tour media:', error);
    throw error;
  }
}

export async function updateTourMedia(tourMedia: TourMedia): Promise<void> {
  try {
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
      throw new Error('Failed to update tour media data');
    }
  } catch (error) {
    console.error('Error updating tour media:', error);
    throw error;
  }
} 