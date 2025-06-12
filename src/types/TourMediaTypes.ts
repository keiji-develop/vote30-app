// メディア非所持情報項目
export type NoMediaItem = {
  showNoneItem: boolean;        // 「なし」項目の表示フラグ
  comment: string | null;       // 補足コメント
};

// ツアーメディア情報
export type TourMedia = {
  id: number;                    // ツアーID（tours-core.jsonのid）
  liveVideoIds: string[];       // このライブが収録されている映像・音源のID配列
  liveArrangementIds: string[]; // 同じライブアレンジの映像・音源のID配列
  noMediaInfo: {                // メディアが存在しない場合の項目表示を制御する情報
    liveVideo: NoMediaItem;     // 「このライブが収録されている映像・音源」の制御情報
    liveArrangement: NoMediaItem; // 「同じライブアレンジの映像・音源」の制御情報
  };
}; 