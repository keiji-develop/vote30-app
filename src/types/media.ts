export type MediaItem = {
  id: string;
  title: string;
  type: string;
  links: string[];
  category: 'liveVideo' | 'liveArrangement';
};

export type TourMedia = {
  id: number;
  liveVideoIds: string[];
  liveArrangementIds: string[];
};

export type TourExtraNotes = {
  id: number;
  extraNotes: string;
};

export type TourCore = {
  id: number;
  title: string;
  subtitle: string;
  year: number;
  description: string;
};

export type Setlist = {
  tourId: number;
  songs: string[];
}; 