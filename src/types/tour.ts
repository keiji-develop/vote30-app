import type { TourMedia } from './media';

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
  liveVideos?: {
    title: string;
    link?: string;
    type: 'DVD' | 'Blu-ray' | 'YouTube' | '配信' | 'TV' | 'VHS';
    notes?: string;
    links?: string[];
    isNone?: boolean;
  }[];
  liveArrangements?: {
    title: string;
    link?: string;
    type: 'CD' | 'DVD' | 'TV' | '配信';
    notes?: string;
    isNone?: boolean;
  }[];
  noMediaInfo?: TourMedia['noMediaInfo'];
}; 