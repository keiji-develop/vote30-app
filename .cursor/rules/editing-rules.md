# 編集禁止リスト

## 編集してはいけないファイル・フォルダ

### ❌ 絶対に編集・使用禁止
```
backup/*
```
**理由**: バックアップ用。意図せずここからデータを戻されることがあるため使用も禁止


### ❌ 絶対に編集禁止・閲覧のみ許可

```

```
**理由**: 他のデータファイルがこれらのIDを参照している。編集するとデータが壊れる

```
public/data/tours-core.json
```
**理由**: このサイトのデータ構造の主キーになる重要ファイル。編集するとサイト全体が壊れる

```
public/data/setlists.json
```
**理由**: このサイトのコンテンツにおける重要ファイル。順番が崩れるとサイト閲覧者の信頼を大きく損ねる

### ⚠️ 編集注意（事前相談推奨）
```
public/data/songs-master.json
public/data/media-master.json
public/data/tours-content.json
public/data/tours-media.json
public/data/tours-extra-notes.json
```
**理由**: データ構造整理で作った重要ファイル。編集する場合は相談してから

```
package.json
package-lock.json
```
**理由**: 依存関係が壊れる可能性

## やってはいけないコマンド

### ❌ 禁止コマンド
```
cp backup/* public/data/
mv backup/* public/data/
```
**理由**: バックアップファイルを実データとして使ってしまう

```
rm public/data/songs-master.json
rm public/data/media-master.json
```
**理由**: マスターデータを削除するとアプリが動かなくなる

```
npm run dev
```
**理由**: 基本的にこちらで常時起動中のため、起動が重複して動きがおかしくなる


```
npm run deploy
npm run preview
npm run build && npm run deploy
npm run build:deploy
npm run prod
npm run release
```
**理由**: デプロイ関連はこちらのタイミングで実施する事にしている、勝手に実行されると思ったタイミングで反映できなくなる

```
git commit
git commit -m "..."
git commit -a
git commit -am "..."
git add . && git commit
git add -A && git commit
```
**理由**: コミットはこちらのタイミングで実施する事にしている、勝手に実行されると思ったタイミングで反映できなくなる

```
git push
git push origin main
git push origin master
git push --force
git push -f
```
**理由**: プッシュもこちらのタイミングで実施する事にしている、勝手に実行されると意図しない変更が公開される


## 編集が必要な場合

1. **バックアップを取る**
2. **理由を明確にする**
3. **事前に相談する**（特に ⚠️ マークのファイル）
4. **少しずつ変更する**

## 困った時は

- `validate-data.mjs` を実行してデータをチェック
- Gitで元に戻す
- 相談する 