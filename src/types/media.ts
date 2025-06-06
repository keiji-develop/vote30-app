export type MediaItem = {
  id: string;
  title: string;
  type: string;
  notes: string | null;  // 補足情報（例：「テレビ放送のみ」）
  links: string[];
};

export type TourMedia = {
  id: number;
  liveVideoIds: string[];
  liveArrangementIds: string[];
  noMediaInfo: {
    liveVideo: {
      showNoneItem: boolean;    // 項目表示の有無（スイッチ）
      comment: string | null;   // 補足コメント
    };
    liveArrangement: {
      showNoneItem: boolean;
      comment: string | null;
    };
  };
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