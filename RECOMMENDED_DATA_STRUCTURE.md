# T.M.Revolution Tour Data - 推奨データ構造

## 現在の状況（修正後）

✅ **修正完了**:
- データ整合性の問題を解決
- Tour ID 1の`summarize_1`重複を修正
- メディアカテゴリの一貫性を確保

## 元のデータがどうあるべきか

### 1. 統合型アプローチ（最も推奨）

**理由**: 編集の安全性、データ整合性、保守性

```json
{
  "tours": [
    {
      "id": 1,
      "title": "T.M.R. LIVE REVOLUTION '96",
      "subtitle": "-monopolize-",
      "year": 1996,
      "description": "基本情報（読み取り専用）",
      "setlist": ["独裁-monopolize-", "URBAN BEASTS", ...],
      "media": {
        "liveVideos": [
          {
            "title": "T.M.Revolution DVD Series The Summary -summarize 1-",
            "type": "DVD",
            "links": [],
            "availability": "available"
          }
        ],
        "liveArrangements": [],
        "notes": {
          "video": "",
          "arrangement": ""
        }
      },
      "extraNotes": "追加メモ（編集可能）"
    }
  ]
}
```

**メリット**:
- 1つのファイルで完結
- データ整合性が保たれやすい
- 編集時の影響範囲が明確
- バックアップ・復元が簡単

### 2. 現在の分割型アプローチ（改善版）

**現在の構造を維持する場合の改善点**:

#### A. データ整合性ルール
```javascript
// 1つのメディアアイテムは1つのカテゴリのみ
{
  "id": "video_1996_summarize_1",
  "title": "...",
  "category": "liveVideo", // 固定
  "type": "DVD",
  "links": []
}

// 複数ツアーでの使用は参照で管理
{
  "id": 6,
  "liveVideoIds": ["video_2000_genesis_turbo"],
  "liveArrangementIds": []
},
{
  "id": 9,
  "liveVideoIds": ["video_2000_genesis_turbo"], // 同じIDを参照
  "liveArrangementIds": []
}
```

#### B. ID命名規則
```
[category]_[year]_[identifier]
例:
- video_1996_summarize_1
- audio_2006_undercover_cd
- note_2011_inazuma_festival
```

#### C. データ検証スクリプト
```javascript
// 定期実行する検証ルール
1. 参照整合性チェック
2. カテゴリ一貫性チェック
3. 重複データ検出
4. 未使用メディア検出
```

### 3. 編集権限の明確化

#### 読み取り専用データ
- `tours-core.json` (基本情報)
- `setlists.json` (セットリスト)
- `media-master.json` (メディアマスター)

#### 編集可能データ
- `tours-extra-notes.json` (追加メモ)
- `tours-media.json` (メディア関連付け)

## 推奨アクション

### 短期（即座に実行）
1. ✅ データ整合性の修正（完了）
2. 🔄 ID命名規則の統一
3. 📝 データ検証スクリプトの定期実行

### 中期（1-2週間）
1. 🔧 統合型アプローチへの移行検討
2. 📚 データ編集ガイドラインの作成
3. 🔒 編集権限の技術的実装

### 長期（1ヶ月以上）
1. 🎯 ユーザビリティテストの実施
2. 📊 データ分析機能の追加
3. 🔄 継続的なデータ品質管理

## 結論

**現在の分割アプローチは機能的には問題ないが、データ管理の複雑さがある。**

**推奨**: 
1. 短期的には現在の構造を維持し、データ整合性を確保
2. 中長期的には統合型アプローチへの移行を検討
3. どちらの場合も、明確なデータ管理ルールと検証プロセスが必要

**最重要**: データの整合性と編集の安全性を確保すること 