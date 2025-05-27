import { useEffect, useState, useRef } from 'react';
import * as FlexSearch from 'flexsearch';
import './index.css';
import { type Tour } from './types/tour';
import { fitOneLine } from './utils/fitOneLine';
import { saveSeat } from './utils/localStorage';
import { PreviewModal } from './components/PreviewModal';
import { DetailModal } from './components/DetailModal';
import { TourCardList } from './components/TourCardList';
import { Header } from './components/Header';

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
    <div className="min-h-screen bg-gray-50">
      <main className="pb-4 px-4 sm:px-4 max-w-2xl mx-auto select-none">
        <Header />

        {/* 本日の座席番号欄 */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-white rounded border border-[#6ea7b2] px-4 py-3 mb-6">
          <label className="font-bold text-base text-gray-800 text-center sm:text-right whitespace-nowrap sm:w-1/3">
            本日の座席番号
            <span className="block sm:text-right">（投票記入見本に表示されます）</span>
          </label>
          <input
            value={seat}
            onChange={e => { setSeat(e.target.value); saveSeat(e.target.value); }}
            placeholder="例 1階 919ブロック 2R扉 513列 1242番"
            className="border border-gray-300 rounded px-3 py-2 text-base w-full sm:w-2/3 h-12"
            style={{ minWidth: 0 }}
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
        <div className="flex flex-col sm:flex-row justify-center items-center text-xl font-bold text-center border-b-2 border-[#6ea7b2] pb-2 mb-6">
          <span>候補公演名一覧と公演概要</span>
          <span className="sm:ml-4 font-bold text-xl text-[#213547]">（公式の一覧から転記）</span>
        </div>

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
