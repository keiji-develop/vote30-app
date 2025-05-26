import { type Tour } from '../types/tour';

type DetailModalProps = {
  active: Tour;
  setActive: (t: Tour | null) => void;
  setPreview: (t: Tour) => void;
};

export function DetailModal({ active, setActive, setPreview }: DetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center"
      onClick={() => setActive(null)}
    >
      <article
        tabIndex={-1}
        className="relative bg-white w-full max-w-lg border-[3px] border-black font-serif"
        onClick={e => e.stopPropagation()}
      >
        {/* × ボタン */}
        <button
          onClick={e => {
            e.stopPropagation();
            setActive(null);
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
  );
} 