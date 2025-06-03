import { useEffect, useState, useRef } from 'react';
import * as FlexSearch from 'flexsearch';
import './index.css';
import type { Tour } from './types/tour';
import { fitOneLine } from './utils/fitOneLine';
import { saveSeat } from './utils/localStorage';
import { PreviewModal } from './components/PreviewModal';
import { DetailModal } from './components/DetailModal';
import { TourCardList } from './components/TourCardList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Sitemap from './pages/Sitemap';
import ScrollToTop from './components/ScrollToTop';
import LegalAllInOne from './pages/LegalAllInOne';
import { Helmet } from 'react-helmet-async';
import { loadToursData } from './services/dataService';

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

  /* ---------- fetch tours data ---------- */
  useEffect(() => {
    loadToursData()
      .then((data: Tour[]) => {
        setTours(data);
        setFiltered(data);
      })
      .catch((error) => {
        console.error('Failed to load tours data:', error);
        setTours([]);
        setFiltered([]);
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

  /* モーダル・プレビュー表示中はbodyスクロール禁止 */
  useEffect(() => {
    if (active || preview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [active, preview]);

  /* ---------- UI ---------- */
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50" role="application" aria-label="VOTE30選挙対策支援サイト">
            <main className="pb-4 px-4 sm:px-6 md:px-8 max-w-2xl mx-auto select-none">
              <Header />
              <Helmet>
                <title>VOTE30選挙対策支援サイト</title>
                <meta name="description" content="T.M.Rの30年分のライブツアー情報をまとめて、VOTE30で迷ってる人の投票をお手伝いしてます。セトリとか映像情報とか調べるのにも使えます。" />
              </Helmet>

{/* 本日の座席番号欄 */}
              <section aria-labelledby="seat-label" className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-white rounded border border-[#6ea7b2] px-4 py-3 mb-6">
                <label id="seat-label" className="font-bold text-base text-gray-800 text-center sm:text-right whitespace-nowrap sm:w-1/3">
                  本日の座席番号
                  <span className="block sm:text-right">（投票記入見本に表示されます）</span>
                </label>
  <input
    value={seat}
                  onChange={e => { setSeat(e.target.value); saveSeat(e.target.value); }}
    placeholder="例 1階 919ブロック 2R扉 513列 1242番"
                  className="border border-gray-300 rounded px-3 py-2 text-base w-full sm:w-2/3 h-12"
                  style={{ minWidth: 0 }}
                  aria-label="本日の座席番号"
  />
              </section>

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
              <section aria-labelledby="tour-list-title" className="flex flex-col sm:flex-row justify-center items-center text-xl font-bold text-center border-b-2 border-[#6ea7b2] pb-2 mb-6">
                <h2 id="tour-list-title" className="text-xl font-bold">候補公演名一覧と公演概要</h2>
                <span className="sm:ml-4 font-bold text-xl text-[#213547]">（公式の一覧から転記）</span>
              </section>

      {/* カード一覧 */}
              <section aria-label="公演一覧">
                <TourCardList tours={filtered} onCardClick={setActive} />
              </section>

{/* ---------- 投票記入プレビュー ---------- */}
{preview && (
                <PreviewModal
                  preview={preview}
                  seat={seat}
                  setPreview={setPreview}
                />
)}

{/* ---------- 詳細モーダル ---------- */}
      {active && (
                <DetailModal
                  active={active}
                  setActive={setActive}
                  setPreview={setPreview}
                  tours={filtered}
                />
      )}
      </main>
            <Footer />
    </div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<LegalAllInOne />} />
        <Route path="/privacy-policy" element={<LegalAllInOne />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cookies" element={<LegalAllInOne />} />
        <Route path="/affiliate-disclosure" element={<LegalAllInOne />} />
        <Route path="/spec-commercial" element={<LegalAllInOne />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
