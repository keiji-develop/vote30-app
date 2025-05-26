import { useEffect, useState, useRef } from 'react';
import * as FlexSearch from 'flexsearch';
import './index.css';
import { type Tour } from './types/tour';
import { fitOneLine } from './utils/fitOneLine';
import { saveSeat } from './utils/localStorage';
import { PreviewModal } from './components/PreviewModal';
import { DetailModal } from './components/DetailModal';
import { TourCardList } from './components/TourCardList';

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
    /* 画面縦横中央寄せラッパー */
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <main className="p-4 w-full max-w-xl select-none">



{/* 本日の座席番号欄 */}
<div className="mb-2 text-sm flex items-center gap-2">
  <label className="whitespace-nowrap">本日の座席番号<br></br>（投票記入見本に表示されます）:</label>
  <input
    value={seat}
    onChange={e => {
      setSeat(e.target.value);
      saveSeat(e.target.value);
    }}
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

        {/* カード一覧説明 */}
        <p className="text-center text-gray-700 mb-4">
          候補公演名一覧と公演概要（公式の一覧から転記）
        </p>

      {/* カード一覧 */}
      <TourCardList tours={filtered} onCardClick={setActive} />




{/* ---------- 投票記入プレビュー ---------- */}
{preview && (
  <PreviewModal preview={preview} seat={seat} setPreview={setPreview} />
)}

{/* ---------- 詳細モーダル ---------- */}
      {active && (
        <DetailModal active={active} setActive={setActive} setPreview={setPreview} />
      )}
      </main>
    </div>
  );
}
