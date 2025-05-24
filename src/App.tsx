import { useEffect, useState, useRef } from 'react';
import * as FlexSearch from 'flexsearch';
import './index.css';

type Tour = {
  id: number;
  title: string;
  subtitle: string;
  year: number;
  description: string;
};

export default function App() {
  /* ---------- state ---------- */
  const [tours, setTours] = useState<Tour[]>([]);
  const [q, _setQ] = useState('');
  const [filtered, setFiltered] = useState<Tour[]>([]);
  const [active, setActive] = useState<Tour | null>(null);   // ← モーダル対象
  const [preview, setPreview] = useState<Tour | null>(null); // ← 1 行プレビュー
  const titleRef     = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLDivElement>(null);
  const [yearFilter, _setYearFilter] = useState(0);
  const [seat, setSeat] = useState<string>(() => localStorage.getItem('seat') || ''); // 本日の座席番号の情報をローカルにだけ保存


  /* 本日の座席番号の情報をローカルにだけ保存する */ 
  const saveSeat = (v:string) => {
  setSeat(v);
  localStorage.setItem('seat', v);
};

  /* 文字列がハミ出すときだけ fontSize を 0.5px ずつ下げる */
const fitOneLine = (el: HTMLDivElement | null) => {
  if (!el) return;
  const cellWidth = el.parentElement!.clientWidth - 8;   // 4px左右余白
  let font = parseFloat(getComputedStyle(el).fontSize);
  while (el.scrollWidth > cellWidth && font > 12) {
    font -= 0.5;
    el.style.fontSize = `${font}px`;
  }
};

/* preview が変わるたびタイトル / サブタイトルをフィット */
useEffect(() => {
  fitOneLine(titleRef.current);
  fitOneLine(subtitleRef.current);
}, [preview]);

  /* ---------- 年リスト ---------- */
  const [_years] = [Array.from(new Set(tours.map(t => t.year))).sort()];

  /* ---------- fetch tours.json ---------- */
  useEffect(() => {
    fetch('tours.json')
      .then(r => r.json())
      .then((data: Tour[]) => {
        setTours(data);
        setFiltered(data);
      });
  }, []);

  /* ---------- 検索 + 年フィルタ ---------- */
  useEffect(() => {
    const idx = new FlexSearch.Index({ tokenize: 'strict' });
    tours.forEach(t =>
      idx.add(t.id, `${t.title} ${t.subtitle} ${t.year}`)
    );
    const ids = q ? (idx.search(q) as number[]) : tours.map(t => t.id);
    const byYear = yearFilter === 0
      ? tours
      : tours.filter(t => t.year === yearFilter);
    setFiltered(byYear.filter(t => ids.includes(t.id)));
  }, [q, tours, yearFilter]);

  /* ---------- Esc でどちらも閉じる ---------- */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
/* 新：プレビュー表示中は Esc を無視 */
      if (e.key === 'Escape' && !preview) {
        setActive(null);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  /* ---------- UI ---------- */
  return (
    <main className="p-4 max-w-xl mx-auto select-none">

{/* 本日の座席番号欄 */}
<div className="mb-2 text-sm flex items-center gap-2">
  <label className="whitespace-nowrap">本日の座席番号<br></br>（投票記入見本に表示されます）:</label>
  <input
    value={seat}
    onChange={e => saveSeat(e.target.value)}
    placeholder="例 1階 919ブロック 2R扉 513列 1242番"
    className="border p-1 flex-1"
  />
</div>

{/* 20250525_0330_検索機能はしばらく封印します */}
      {/* 検索バー */}
      {/* <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="検索…"
        className="w-full mb-4 p-2 border rounded"
      />
      */}
      {/* 年フィルタ */}
      {/* <div className="mb-4">
        <label className="mr-2 text-sm">年で絞る:</label>
        <select
          value={yearFilter}
          onChange={e => setYearFilter(Number(e.target.value))}
          className="border rounded p-1 text-sm"
        >
          <option value={0}>すべて</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      */} 
 
      {/* カード一覧 */}
      <ul className="grid gap-3">
        {filtered.map(t => (
          <li
            key={t.id}
            className="border rounded p-3 flex gap-6 hover:bg-gray-100 cursor-pointer"
            onClick={() => setActive(t)}
          >
            <span className="text-6xl sm:text-7xl font-bold leading-none">
              {t.id}
            </span>
            <div className="leading-tight mt-2">
              <div className="text-lg sm:text-xl font-semibold">{t.title}</div>
              {t.subtitle && (
                <div className="tracking-wider text-base sm:text-lg">{t.subtitle}</div>
              )}
            </div>
          </li>
        ))}
      </ul>




{/* ---------- 投票記入プレビュー ---------- */}
{preview && (
  <div
    className="fixed inset-0 bg-white flex items-center justify-center
               border-[6px] border-black z-50"
  >

    {/* ▼ モーダルと同じ閉じるボタン（右上・枠内） */}
      <button
        onClick={() => setPreview(null)}
        className="absolute top-2 right-2 px-6 py-1 bg-black text-white text-sm rounded"
      >
        閉じる
      </button>

{/* ▼ ラッパー: 縦積み & 同じ幅を共有 */}
<div className="flex flex-col items-stretch w-[90%] max-w-[600px]">


    {/* ▼ 投票用紙そっくりボックス（幅ピッタリ） */}
    <div
      className="border border-black grid relative"
      style={{
        gridTemplateColumns: '30px 72px 30px 1fr',
        width: '100%', height: '110px'
      }}
    >
      {/* === 1列目：候補番号ラベル === */}
      <div className="border-r border-black flex items-center justify-center">
        <div className="flex justify-between w-full px-[2px]">
          <span className="font-bold leading-none"
                style={{ writingMode:'vertical-rl', textOrientation:'upright', fontSize:'var(--kanji-size)' }}>
            候補番号
          </span>
          <span className="leading-none"
                style={{ writingMode:'vertical-rl', textOrientation:'upright', fontSize:'var(--ruby-size)' }}>
            こうほばんごう
          </span>
        </div>
      </div>

      {/* === 2列目：数字 === */}
      <div className="border-r border-black flex items-center justify-center">
        <span style={{ fontSize:'var(--num-size)' }} className="font-bold">
          {preview.id}
        </span>
      </div>

      {/* === 3列目：候補公演名ラベル === */}
      <div className="border-r border-black flex items-center justify-center">
        <div className="flex justify-between w-full px-[2px]">
          <span className="font-bold leading-none"
                style={{ writingMode:'vertical-rl', textOrientation:'upright', fontSize:'var(--kanji-size)' }}>
            候補公演名
          </span>
          <span className="leading-none"
                style={{ writingMode:'vertical-rl', textOrientation:'upright', fontSize:'var(--ruby-size)' }}>
            こうほこうえんめい
          </span>
        </div>
      </div>

      {/* === 4列目：公演名 === */}
      <div className="px-4 flex flex-col justify-center overflow-hidden">
        <div className="whitespace-normal leading-tight text-lg font-semibold">
          {preview.title}
        </div>
        {preview.subtitle && (
          <div className="whitespace-normal leading-tight tracking-wider text-lg">
            {preview.subtitle}
          </div>
        )}
      </div>
    </div>
      {/* ▼ 座席番号行（罫線なし & 幅はグリッドと同じ） */}
      <div className="w-full px-0 pt-0 text-sm flex">
        <span className="mr-2 font-semibold text-sm">(本日の座席番号:</span>
        <span style={{ fontSize:'18px' }}>{seat || '–––'}</span>
        <span className="ml-1 font-semibold text-sm">)</span>
      </div>
    </div>
</div> 
)}

{/* ---------- 詳細モーダル ---------- */}
      {active && (
        <div
          className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center"
          onClick={() => setActive(null)}
        >
        <article
          tabIndex={-1}
          className="relative bg-white w-full max-w-lg border-[3px] border-black font-serif"
            onClick={e => e.stopPropagation()}
        >

      {/* ★ ヘッダー直後に × ボタン */}
           <button
             onClick={e => {
               e.stopPropagation();
               setActive(null);    // ← こちらを呼び出す
             }}
             className="absolute top-2 right-2 text-2xl font-semibold leading-none"
             aria-label="閉じる"
           >
             ×
           </button>

            <header className="flex text-xs font-semibold tracking-wider px-5 pt-2">
              <span className="min-w-[4.5rem]">候補番号</span>
              <span className="ml-6">候補公演名</span>
            </header>

            <section className="flex items-center px-5 pt-3 pb-4">
              <span className="text-6xl sm:text-7xl font-bold mr-6">
                {active.id}
              </span>
              <h2 className="leading-tight text-lg sm:text-xl font-semibold">
                {active.title}
                {active.subtitle && (
                  <>
                    <br />
                    <span className="tracking-wider">
                      {active.subtitle}
                    </span>
                  </>
                )}
              </h2>
            </section>

            <p className="px-5 pb-6 text-[0.95rem] leading-relaxed whitespace-pre-wrap">
              {active.description}
            </p>

            <footer className="relative border-t-[3px] border-black flex justify-end items-center p-3 space-x-2">
              {/* ×ボタン（消したい場合はここを削除） 
              <button
                onClick={() => setActive(null)}
                className="px-4 py-1 bg-black text-white text-sm rounded"
              >
                ×
              </button> */}
              {/* プレビュー表示ボタン */}
              <button
                onClick={() => setPreview(active)}
                className="px-6 py-1 border border-black text-sm rounded"
              >
                投票記入見本を開く
              </button>
            </footer>
          </article>
        </div>
      )}
    </main>
  );
}
