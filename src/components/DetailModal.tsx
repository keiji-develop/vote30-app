import { type Tour } from '../types/tour';
import { useEffect, useRef } from 'react';

type DetailModalProps = {
  active: Tour;
  setActive: (t: Tour | null) => void;
  setPreview: (t: Tour) => void;
  tours: Tour[];
};

export function DetailModal({ active, setActive, setPreview, tours }: DetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 前後のインデックス
  const idx = tours.findIndex(t => t.id === active.id);
  const prevTour = idx > 0 ? tours[idx - 1] : null;
  const nextTour = idx < tours.length - 1 ? tours[idx + 1] : null;

  // キーボード左右キー対応
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevTour) setActive(prevTour);
      if (e.key === 'ArrowRight' && nextTour) setActive(nextTour);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prevTour, nextTour, setActive]);

  // スワイプ対応
  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50 && nextTour) setActive(nextTour); // 左スワイプ
      if (endX - startX > 50 && prevTour) setActive(prevTour); // 右スワイプ
    };
    const node = modalRef.current;
    if (node) {
      node.addEventListener('touchstart', handleTouchStart);
      node.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      if (node) {
        node.removeEventListener('touchstart', handleTouchStart);
        node.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [prevTour, nextTour, setActive]);

  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center py-4"
      onClick={() => setActive(null)}
    >
      <article
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-white w-full max-w-[95vw] sm:max-w-md md:max-w-lg border-[3px] border-black font-serif flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* 矢印ナビゲーション */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
          {prevTour && (
            <button onClick={() => setActive(prevTour)} className="p-2 text-2xl font-bold text-gray-500 hover:text-black bg-white/80 rounded-full shadow">
              &#8592;
            </button>
          )}
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
          {nextTour && (
            <button onClick={() => setActive(nextTour)} className="p-2 text-2xl font-bold text-gray-500 hover:text-black bg-white/80 rounded-full shadow">
              &#8594;
            </button>
          )}
        </div>

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

        {/* ヘッダー部分 */}
        <div className="flex-shrink-0">
          <header className="flex text-xs font-semibold tracking-wider px-5 pt-2">
            <span className="min-w-[4.5rem]">候補番号</span>
            <span className="ml-6">候補公演名</span>
          </header>
          {/* --- 公式情報 --- */}
          <div className="px-2 sm:px-4 md:px-6 pt-5 pb-4">
            <div className="flex items-center mb-2">
              <span className="text-4xl sm:text-5xl font-bold mr-4">{active.id}</span>
              <div>
                <div className="text-lg sm:text-xl font-bold leading-tight">{active.title}</div>
                {active.subtitle && (
                  <div className="tracking-wider text-base sm:text-lg text-gray-700">{active.subtitle}</div>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-700 whitespace-pre-wrap mt-1">{active.description}</div>
          </div>
          <hr className="border-b border-black" />
        </div>

        {/* スクロール可能なコンテンツ部分 */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-2 sm:px-4 md:px-6 py-5 space-y-6">
            <div className="font-bold text-base text-black mb-2">中の人追記</div>
            
            {/* 公演メモとセットリストを1列に */}
            <div className="flex flex-col gap-6 w-full">
              {/* 公演メモ */}
              {active.extraNotes && (
                <section className="w-full break-words">
                  <div className="font-bold text-sm text-black mb-1">公演メモ</div>
                  <div className="text-sm leading-relaxed text-gray-800">{active.extraNotes}</div>
                </section>
              )}
              {/* セットリスト */}
              {active.setlist && (
                <section className="w-full break-words overflow-x-auto">
                  <div className="font-bold text-sm text-black mb-1">セットリスト</div>
                  {/* セットリストを区切り文字で分割して表示 */}
                  {(() => {
                    let trackNumber = 1;
                    return (
                      <div>
                        {active.setlist.map((item, index) => {
                          // 区切り文字（---で囲まれた文字列）かどうかを判定
                          const isDivider = item.startsWith('---') && item.endsWith('---');
                          
                          if (isDivider) {
                            // 区切り文字の場合は番号なしで表示
                            const dividerText = item.replace(/^---/, '').replace(/---$/, '');
                            return (
                              <div key={index} className="font-bold mt-3 mb-2 first:mt-0">
                                {dividerText}
                              </div>
                            );
                          } else {
                            // 楽曲の場合は番号付きで表示
                            const currentNumber = trackNumber++;
                            return (
                              <div key={index} className="text-sm leading-relaxed ml-4 mb-1">
                                <span className="inline-block w-6 text-right mr-2">{currentNumber}.</span>
                                <span>{item}</span>
                              </div>
                            );
                          }
                        })}
                      </div>
                    );
                  })()}
                </section>
              )}
            </div>

            {/* 関連作品情報 */}
            {((active.releases?.length ?? 0) > 0 || active.liveVideos || active.liveArrangements) && (
              <section>
                <div className="font-bold text-sm text-black mb-3">関連作品情報</div>
                
                {/* このライブが収録されている映像・音源 */}
                {active.liveVideos && (
                  <div className="mb-4">
                    <div className="text-sm font-semibold mb-2">・このライブが収録されている映像・音源</div>
                    <div className="space-y-3">
                      {/* 文字列形式の場合 */}
                      {typeof active.liveVideos === 'string' ? (
                        active.liveVideos.split('\n').filter(line => line.trim()).map((line, i) => (
                          <div key={i} className="bg-gray-50 p-3 rounded border">
                            <div className="text-sm">{line.trim()}</div>
                          </div>
                        ))
                      ) : (
                        /* 配列形式の場合（従来通り） */
                        active.liveVideos.map((v, i) => (
                        <div key={i} className="bg-gray-50 p-3 rounded border">
                          <div className="mb-2">
                            <div className="font-semibold text-sm">{v.title}</div>
                            <div className="text-xs text-gray-500">({v.type})</div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {/* links配列があれば優先して表示 */}
                            {Array.isArray((v as any).links) && (v as any).links.length > 0 ? (
                              (v as any).links.map((link: string, j: number) => (
                                <a key={j} href={link} target="_blank" rel="noopener noreferrer" 
                                   className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                                  視聴/購入{(v as any).links.length > 1 ? `(${j + 1})` : ''}
                                </a>
                              ))
                            ) : v.link ? (
                              <a href={v.link} target="_blank" rel="noopener noreferrer" 
                                 className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                                視聴/購入
                              </a>
                            ) : null}
                          </div>
                        </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
                
                {/* 同じライブアレンジの映像・音源 */}
                {active.liveArrangements && (
                  <div className="mb-4">
                    <div className="text-sm font-semibold mb-2">・同じライブアレンジの映像・音源</div>
                    <div className="space-y-2">
                      {/* 文字列形式の場合 */}
                      {typeof active.liveArrangements === 'string' ? (
                        active.liveArrangements === '無し' ? (
                          <div className="text-sm text-gray-600">無し</div>
                        ) : (
                          active.liveArrangements.split('\n').filter(line => line.trim()).map((line, i) => (
                            <div key={i} className="bg-gray-50 p-3 rounded border">
                              <div className="text-sm">{line.trim()}</div>
                            </div>
                          ))
                        )
                      ) : (
                        /* 配列形式の場合（従来通り） */
                        active.liveArrangements.map((a, i) => (
                        a.notes === '無し' ? (
                          <div key={i} className="text-sm text-gray-600">無し</div>
                        ) : (
                          <div key={i} className="bg-gray-50 p-3 rounded border">
                            <div className="font-semibold text-sm">{a.title}</div>
                            {a.notes && <div className="text-xs text-gray-500 mt-1">{a.notes}</div>}
                          </div>
                        )
                        ))
                      )}
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>

        {/* フッター部分 */}
        <footer className="flex-shrink-0 border-t-[3px] border-black flex justify-end items-center p-3 space-x-2">
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