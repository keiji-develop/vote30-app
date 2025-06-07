import type { TourMedia, MediaItem } from './media';

export type Tour = {
  id: number;
  title: string;
  subtitle: string;
  year: number;
  description: string;
  setlist?: string[];
  extraNotes?: string;
  memo?: string;
  releases?: {
    title: string;
    type: 'album' | 'single';
    releaseDate: string;
    link?: string;
    coverImageUrl?: string;
  }[];
  liveVideos?: MediaItem[];
  liveArrangements?: MediaItem[];
  noMediaInfo?: TourMedia['noMediaInfo'];
}; 