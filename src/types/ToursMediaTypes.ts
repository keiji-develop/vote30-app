export interface NoMediaItem {
  label: string;
  text: string;
  showNoneItem: boolean;
  comment: string | null;
}

export interface NoMediaItems {
  liveVideo: NoMediaItem;
  liveArrangement: NoMediaItem;
}

export interface TourMedia {
  id: number;
  title: string;
  subtitle: string | null;
  description?: string;
  liveVideoIds: string[];
  liveArrangementIds: string[];
  relatedMedias: RelatedMedia[];
  noMediaItems: NoMediaItems;
}

export interface RelatedMedia {
  id: string;
  title: string;
}

export interface TourInfo {
  id: number;
  title: string;
  subtitle: string | null;
}

export type TourMediaFile = TourMedia[]; 