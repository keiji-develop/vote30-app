export type MediaItem = {
  id: string;
  title: string;
  type: string;
  notes: string | null;  // 補足情報（例：「テレビ放送のみ」）
  isNone?: boolean;     // 非表示フラグ
  links: MediaLink[];   // プラットフォーム別リンク
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

// 商品データの型定義
export type MediaLink = {
  platform: string;      // プラットフォーム識別子
  label: string;        // 表示ラベル
  urls: {
    direct: string;     // 直接リンク
  };
  category: string;     // 購入/視聴カテゴリー
  enabled?: boolean;    // 個別の表示制御（任意）
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