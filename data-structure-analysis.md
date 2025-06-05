# T.M.Revolution Tour Data 構造分析レポート

## 現在の問題点

### 1. データの重複・不整合
- Tour ID 1: `summarize_1`が`liveVideoIds`と`liveArrangementIds`の両方に存在
- Tour ID 6,9: 同じ`genesis_turbo_type_d_live_arena_2000_ad_special_dvd_version`
- Tour ID 8,10: 同じ`wowow_broadcast`

### 2. メディア分類の混乱
- `media-master.json`の`category`と`tours-media.json`の分類が一致しない
- 同じメディアが複数のカテゴリで使用されている

### 3. ID管理の問題
- メディアIDの命名規則が不統一
- `unknown_0001`のような不明確なID

## 理想的な元データ構造

### A. 統合型アプローチ（推奨）
```json
{
  "tours": [
    {
      "id": 1,
      "title": "T.M.R. LIVE REVOLUTION '96",
      "subtitle": "-monopolize-",
      "year": 1996,
      "description": "基本情報（読み取り専用）",
      "setlist": ["楽曲リスト"],
      "media": {
        "liveVideos": [
          {
            "title": "映像タイトル",
            "type": "DVD|Blu-ray|YouTube|配信|TV|VHS",
            "links": [],
            "availability": "available|unavailable|partial",
            "notes": "補足情報"
          }
        ],
        "liveArrangements": [
          {
            "title": "音源タイトル", 
            "type": "CD|DVD|TV|配信",
            "notes": "補足情報"
          }
        ]
      },
      "extraNotes": "追加メモ（編集可能）"
    }
  ]
}
```

### B. 参照型アプローチ（現在）
分割ファイルを使用するが、以下の改善が必要：

#### 改善点
1. **メディアマスターの統一**
   - 1つのメディアアイテムは1つのカテゴリのみ
   - 複数ツアーで使用される場合は参照で管理

2. **ID命名規則の統一**
   ```
   [category]_[year]_[identifier]
   例: video_1996_summarize_1, audio_2006_undercover_cd
   ```

3. **データ整合性の確保**
   - 重複データの排除
   - 参照整合性の確認

## 推奨アクション

### 即座に修正すべき項目
1. Tour ID 1の`summarize_1`重複を解決
2. 同じメディアアイテムの重複使用を整理
3. `unknown_0001`などの不明確なIDを修正

### 長期的改善項目
1. メディアIDの命名規則統一
2. データ検証スクリプトの作成
3. 編集権限の明確化（読み取り専用vs編集可能）

## 結論

現在の分割アプローチは概念的には良いが、データの整合性に問題がある。
まず既存データの不整合を修正し、その後に統一的なデータ管理ルールを確立すべき。 