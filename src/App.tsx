import { useEffect, useState } from 'react';
import * as FlexSearch from 'flexsearch';
import './index.css';

type Tour = {
  id: number;
  title: string;
  year: number;
  description: string;
};

export default function App() {
  /* ---------- state ---------- */
  const [tours, setTours] = useState<Tour[]>([]);
  const [q, setQ] = useState('');
  const [filtered, setFiltered] = useState<Tour[]>([]);
  const [active, setActive] = useState<Tour | null>(null);
  const [open, setOpen] = useState(false);

  /* ---------- fetch tours.json ---------- */
  useEffect(() => {
    fetch('/tours.json')
      .then((r) => r.json())
      .then((data: Tour[]) => {
        setTours(data);
        setFiltered(data);
      });
  }, []);

  /* ---------- search filter ---------- */
  useEffect(() => {
    if (!q) {
      setFiltered(tours);
      return;
    }
    const idx = new FlexSearch.Index<number>({ tokenize: 'strict' });
    tours.forEach((t) => idx.add(t.id, `${t.title} ${t.year}`));
    const ids = idx.search(q);
    setFiltered(tours.filter((t) => ids.includes(t.id)));
  }, [q, tours]);

  /* ---------- esc key closes modal ---------- */
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  /* ---------- helpers ---------- */
  const openModal = (tour: Tour) => {
    setActive(tour);
    setOpen(true);
  };

  /* ---------- UI ---------- */
  return (
    <main className="p-4 max-w-xl mx-auto">
      {/* search bar */}
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="検索…"
        className="w-full mb-4 p-2 border rounded"
      />

      {/* card list */}
      <ul className="grid gap-3">
        {filtered.map((t) => (
          <li
            key={t.id}
            className="border rounded p-3 flex justify-between items-baseline hover:bg-gray-100 cursor-pointer"
            onClick={() => openModal(t)}
          >
            <span className="font-bold text-lg">{t.id}</span>
            <span className="flex-1 mx-2 truncate">{t.title}</span>
            <span className="text-sm opacity-70">{t.year}</span>
          </li>
        ))}
      </ul>

      {/* custom modal (no <dialog>) */}
      {open && active && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
          onClick={() => setOpen(false)} /* backdrop click */
        >
          <article
            tabIndex={-1}
            className="bg-white w-full max-w-lg border-[3px] border-black font-serif"
            onClick={(e) => e.stopPropagation()} /* stop bubbling */
          >
            <header className="flex justify-between text-xs font-semibold tracking-wider px-5 pt-2">
              <span>候補番号</span>
              <span>候補公演名</span>
            </header>

            <section className="flex items-start px-5 pt-1 pb-3">
              <span className="text-7xl sm:text-8xl font-bold leading-none mr-6">
                {active.id}
              </span>
              <h2 className="mt-1 leading-tight text-lg sm:text-xl font-semibold">
                {active.title.split('-')[0].trim()}
                <br />
                <span className="tracking-wider">
                  -{active.title.split('-').slice(1).join('-').trim()}-
                </span>
              </h2>
            </section>

            <p className="px-5 pb-6 text-[0.95rem] leading-relaxed whitespace-pre-wrap">
              {active.description}
            </p>

            <footer className="border-t-[3px] border-black flex justify-end p-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-6 py-1 bg-black text-white text-sm rounded"
              >
                閉じる
              </button>
            </footer>
          </article>
        </div>
      )}
    </main>
  );
}
