import { useEffect, useState, useRef } from 'react';
import './index.css';

type Tour = {
  id: number;
  title: string;
  subtitle?: string;
  year: number;
  description: string;
  candidateNumber: string;
};

export default function App() {
  const [filtered, setFiltered] = useState<Tour[]>([]);
  const [preview, setPreview] = useState<Tour | null>(null);
  const [seat, setSeat] = useState<string>(() => localStorage.getItem('seat') || '');
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  const saveSeat = (value: string) => {
    setSeat(value);
    localStorage.setItem('seat', value);
  };

  const fitOneLine = (el: HTMLDivElement | null) => {
    if (!el) return;
    const cw = el.parentElement!.clientWidth - 8;
    let fs = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > cw && fs > 12) {
      fs -= 0.5;
      el.style.fontSize = `${fs}px`;
    }
  };

  useEffect(() => {
    fitOneLine(titleRef.current);
    fitOneLine(subtitleRef.current);
  }, [preview]);

  useEffect(() => {
    fetch('tours.json')
      .then(r => r.json())
      .then((data: Tour[]) => setFiltered(data));
  }, []);

  return (
    <main className="p-4 max-w-xl mx-auto select-none">
      {/* 座席入力 */}
      <div className="mb-4 text-sm flex gap-2">
        <label>
          <ruby>
            本日の座席番号<rt>ほんじつのざせきばんごう</rt>
          </ruby>
          <br />（投票見本）:
        </label>
        <input
          value={seat}
          onChange={e => saveSeat(e.target.value)}
          placeholder="例: 1階19列91番"
          className="border p-1 flex-1"
        />
      </div>

      {/* カード一覧 */}
      <ul className="grid gap-3">
        {filtered.map(tour => (
          <li
            key={tour.id}
            className="border rounded p-3 flex flex-col gap-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => setPreview(tour)}
          >
            <div className="flex items-center gap-4">
              <span className="text-6xl sm:text-7xl font-bold leading-none">
                {tour.id}
              </span>
              <div>
                <div
                  ref={titleRef}
                  className="text-lg sm:text-xl font-semibold"
                  style={{ fontSize: 'var(--title-size)', whiteSpace: 'var(--title-wrap)' }}
                >
                  {tour.title}
                </div>
                {tour.subtitle && (
                  <div
                    ref={subtitleRef}
                    className="text-base sm:text-lg tracking-wider"
                    style={{ fontSize: 'var(--sub-size)' }}
                  >
                    {tour.subtitle}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-800">{tour.candidateNumber}</p>
            <p className="mt-1 text-sm text-gray-700 line-clamp-3">
              {tour.description}
            </p>
          </li>
        ))}
      </ul>

      {/* プレビュー */}
      {preview && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <button
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 px-4 py-1 bg-black text-white text-sm rounded"
          >
            閉じる
          </button>

          {/* 可変サイズプレビュー（デフォルト500×130px） */}
          <div
            className="border border-black bg-white"
            style={{ width: '500px', height: '130px' }}
          >
            {/* 投票用紙領域 */}
            <div
              className="border-b border-black grid h-full"
              style={{ gridTemplateColumns: '30px 72px 30px 1fr' }}
            >
              {/* ラベル 候補番号 */}
              <div className="border-r border-black flex items-center justify-center text-lg sm:text-xl font-semibold p-1 sm:p-2" style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
                <ruby>
                  候補番号<rt>こうほばんごう</rt>
                </ruby>
              </div>
              {/* 候補番号 */}
              <div className="border-r border-black flex items-center justify-center">
                <span className="text-6xl sm:text-7xl font-bold leading-none">{preview.id}</span>
              </div>
              {/* ラベル 候補公演名 */}
              <div className="border-r border-black flex items-center justify-center text-lg sm:text-xl font-semibold p-0 sm:p-2" style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
                <ruby>
                  候補公演名<rt>こうほこうえんめい</rt>
                </ruby>
              </div>
              {/* 公演名 */}
              <div className="flex flex-col justify-center px-1 overflow-hidden">
                <span className="text-lg sm:text-xl font-semibold preview-title">{preview.title}</span>
                {preview.subtitle && (
                  <span className="mt-1 text-base sm:text-lg preview-subtitle">{preview.subtitle}</span>
                )}
              </div>
            </div>

            {/* 座席番号表示（横書き・枠線なし） */}
            <div className="w-full px-2 text-sm flex items-center">
              <span className="font-semibold">(本日の座席番号: </span>
              <span style={{ fontSize: '18px' }}>{seat || '–––'}</span>
              <span className="font-semibold">)</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
