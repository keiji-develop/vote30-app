import { useEffect, useState, useRef } from 'react';
import './index.css';
import type { Tour } from './types/tour';
import { fitOneLine } from './utils/fitOneLine';
import { saveSeat } from './utils/localStorage';
import { PreviewModal } from './components/PreviewModal';
import { DetailModal } from './components/DetailModal';
import { TourCardList } from './components/TourCardList';
import { SearchInterface } from './components/SearchInterface';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Sitemap from './pages/Sitemap';
import ScrollToTop from './components/ScrollToTop';
import LegalAllInOne from './pages/LegalAllInOne';
import { MediaEditorPage } from './pages/MediaEditorPage';
import { Helmet } from 'react-helmet-async';
import { loadToursData } from './services/dataService';

export default function App() {
  /* ---------- state ---------- */
  const [tours, setTours] = useState<Tour[]>([]);
  const [filtered, setFiltered] = useState<Tour[]>([]);
  const [active, setActive] = useState<Tour | null>(null);   // ← モーダル対象
  const [preview, setPreview] = useState<Tour | null>(null); // ← 1 行プレビュー
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLDivElement>(null);
  const [seat, setSeat] = useState<string>(() => localStorage.getItem('seat') || ''); // 本日の座席番号の情報をローカルにだけ保存

/* preview が変わるたびタイトル / サブタイトルをフィット */
useEffect(() => {
  fitOneLine(titleRef.current);
  fitOneLine(subtitleRef.current);
}, [preview]);

  /* ---------- fetch tours data ---------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data: Tour[] = await loadToursData();
        setTours(data);
        setFiltered(data);
      } catch (err) {
        console.error('Failed to load tours data:', err);
        setError('ツアーデータの読み込みに失敗しました。しばらく時間をおいてから再度お試しください。');
        setTours([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ---------- データ再読み込み関数 ---------- */
  const handleRetry = () => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data: Tour[] = await loadToursData();
        setTours(data);
        setFiltered(data);
      } catch (err) {
        console.error('Failed to load tours data:', err);
        setError('ツアーデータの読み込みに失敗しました。しばらく時間をおいてから再度お試しください。');
        setTours([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  /* ---------- 検索結果を受け取る関数 ---------- */
  const handleFilteredResults = (filteredTours: Tour[]) => {
    setFiltered(filteredTours);
  };

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
            <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-white rounded shadow-md mt-8 mb-8">
              <main className="select-none">
                <Header />
                <Helmet>
                  <title>VOTE30選挙対策支援サイト</title>
                  <meta name="description" content="T.M.Rの30年分のライブツアー情報をまとめて、VOTE30で迷ってる人の投票をお手伝いしてます。セトリとか映像情報とか調べるのにも使えます。" />
                </Helmet>

                                {/* 本日の座席番号欄 */}
                <section aria-labelledby="seat-label" className="bg-gray-50 rounded p-4 border-l-4 border-[#6ea7b2] mb-6">
                  <div className="mb-3">
                    <label id="seat-label" className="text-heading-4 text-gray-800 block">
                      本日の座席番号
                    </label>
                    <p className="text-body-small text-gray-600 mt-1">
                      投票記入見本に表示されます
                    </p>
                  </div>
                  <input
                    value={seat}
                    onChange={e => { setSeat(e.target.value); saveSeat(e.target.value); }}
                    placeholder="例 1階 919ブロック 2R扉 513列 1242番"
                    className="border border-gray-300 rounded px-3 py-2 text-body w-full h-12 focus:border-[#6ea7b2] focus:ring-1 focus:ring-[#6ea7b2] transition-colors"
                    aria-label="本日の座席番号"
                  />
                </section>

 

                {/* 検索・絞り込み機能 */}
                {!loading && !error && tours.length > 0 && (
                  <SearchInterface 
                    tours={tours} 
                    onFilteredResults={handleFilteredResults}
                  />
                )}

                {/* カード一覧説明 */}
                <section aria-labelledby="tour-list-title" className="flex flex-col sm:flex-row justify-center items-center text-center border-b-2 border-[#6ea7b2] pb-2 mb-6">
                  <h2 id="tour-list-title" className="text-heading-2">候補公演名一覧と公演概要</h2>
                  <span className="sm:ml-4 text-heading-2 text-[#213547]">（会場配布の候補一覧より）</span>
                </section>

                {/* コンテンツエリア */}
                <section aria-label="公演一覧">
                  {loading && (
                    <LoadingSpinner 
                      size="lg" 
                      message="候補公演データを読み込み中..." 
                      className="py-8"
                    />
                  )}

                  {error && (
                    <ErrorState
                      title="データ読み込みエラー"
                      message={error}
                      onRetry={handleRetry}
                      className="py-8"
                    />
                  )}

                  {!loading && !error && filtered.length === 0 && tours.length > 0 && (
                    <EmptyState
                      icon="🔍"
                      title="検索結果が見つかりません"
                      description="検索条件を変更してもう一度お試しください。"
                      className="py-8"
                    />
                  )}

                  {!loading && !error && tours.length === 0 && (
                    <EmptyState
                      icon="🎵"
                      title="候補公演データがありません"
                      description="公演データが見つかりませんでした。"
                      actionLabel="再読み込み"
                      onAction={handleRetry}
                      className="py-8"
                    />
                  )}

                  {!loading && !error && filtered.length > 0 && (
                    <TourCardList tours={filtered} onCardClick={setActive} />
                  )}
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
            </div>
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
        <Route path="/media-editor" element={<MediaEditorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
