import { useEffect, useRef } from 'react';
import type { Tour } from '../types/tour';
import { Button } from './Button';

type DetailModalProps = {
  active: Tour;
  setActive: (t: Tour | null) => void;
  setPreview: (t: Tour) => void;
  tours: Tour[];
};

export function DetailModal({ active, setActive, setPreview, tours }: DetailModalProps) {
  const modalRef = useRef<HTMLElement>(null);

  const currentIndex = tours.findIndex(t => t.id === active.id);
  const prevTour = currentIndex > 0 ? tours[currentIndex - 1] : null;
  const nextTour = currentIndex < tours.length - 1 ? tours[currentIndex + 1] : null;

  // キーボードナビゲーション
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevTour) {
        setActive(prevTour);
      }
      if (e.key === 'ArrowRight' && nextTour) {
        setActive(nextTour);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prevTour, nextTour, setActive]);

  // タッチイベント（スワイプナビゲーション）
  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // 50px以上のスワイプで反応
        if (diff > 0 && nextTour) {
          setActive(nextTour); // 左スワイプで次へ
        } else if (diff < 0 && prevTour) {
          setActive(prevTour); // 右スワイプで前へ
        }
      }
    };

    const modal = modalRef.current;
    if (modal) {
      modal.addEventListener('touchstart', handleTouchStart);
      modal.addEventListener('touchend', handleTouchEnd);
      return () => {
        modal.removeEventListener('touchstart', handleTouchStart);
        modal.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [prevTour, nextTour, setActive]);

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-40 p-4"
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
            <Button 
              variant="icon" 
              size="md"
              onClick={() => setActive(prevTour)}
              aria-label="前の公演"
            >
              &#8592;
            </Button>
          )}
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
          {nextTour && (
            <Button 
              variant="icon" 
              size="md"
              onClick={() => setActive(nextTour)}
              aria-label="次の公演"
            >
              &#8594;
            </Button>
          )}
        </div>

        {/* × ボタン */}
        <Button
          variant="close"
          size="md"
          onClick={e => {
            e.stopPropagation();
            setActive(null);
          }}
          className="absolute top-2 right-2"
          aria-label="閉じる"
        >
          ×
        </Button>

        {/* ヘッダー部分 */}
        <div className="flex-shrink-0">
          <header className="flex text-caption font-semibold tracking-wider px-5 pt-2">
            <span className="min-w-[4.5rem]">候補番号</span>
            <span className="ml-6">候補公演名</span>
          </header>
          {/* --- 公式情報 --- */}
          <div className="padding-sm sm:padding-md md:padding-lg margin-t-lg margin-b-md">
            <div className="flex items-center margin-b-sm">
              <span className="text-display-md sm:text-display-lg font-bold margin-r-md">{active.id}</span>
              <div>
                <div className="text-heading-3 sm:text-heading-2 leading-tight">{active.title}</div>
                {active.subtitle && (
                  <div className="tracking-wider text-body sm:text-body-large text-gray-700">{active.subtitle}</div>
                )}
              </div>
            </div>
            <div className="text-body-small text-gray-700 whitespace-pre-wrap margin-t-xs">{active.description}</div>
          </div>
          <hr className="border-b border-black" />
        </div>

        {/* スクロール可能なコンテンツ部分 */}
        <div className="flex-1 overflow-y-auto">
          <div className="padding-sm sm:padding-md md:padding-lg section-spacing-sm gap-lg">
            <div className="text-heading-4 text-black margin-b-sm">中の人追記</div>
            
            {/* 公演メモとセットリストを1列に */}
            <div className="flex flex-col gap-lg w-full">
              {/* 公演メモ */}
              {/* 
              {active.extraNotes && (
                <section className="w-full break-words">
                  <div className="font-bold text-sm text-black mb-1">公演メモ</div>
                  <div className="text-sm leading-relaxed text-gray-800">{active.extraNotes}</div>
                </section>
              )}
              */}
              {/* セットリスト */}
              {active.setlist && (
                <section className="w-full break-words overflow-x-auto">
                  <div className="text-heading-4 text-black margin-b-xs">セットリスト</div>
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
                              <div key={index} className="font-bold margin-t-md margin-b-sm first:mt-0">
                                {dividerText}
                              </div>
                            );
                          } else {
                            // 楽曲の場合は番号付きで表示
                            const currentNumber = trackNumber++;
                            return (
                              <div key={index} className="text-body-small leading-relaxed margin-l-md margin-b-xs">
                                <span className="inline-block w-6 text-right margin-r-sm">{currentNumber}.</span>
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
                <div className="text-heading-4 text-black margin-b-md">関連作品情報</div>
                
                {/* このライブが収録されている映像・音源 */}
                {active.liveVideos && (
                  <div className="margin-b-md">
                    <div className="text-body-small font-semibold margin-b-sm">・このライブが収録されている映像・音源</div>
                    <div className="space-y-3">
                      {/* 配列形式のみ対応（文字列形式は廃止） */}
                      {Array.isArray(active.liveVideos) && active.liveVideos.map((v, i) => (
                        <div key={i} className={`padding-md rounded border ${v.isNone ? 'bg-gray-100 border-gray-300' : 'bg-gray-50'}`}>
                          <div className="margin-b-sm">
                            <div className={`font-semibold text-body-small ${v.isNone ? 'text-gray-500 italic' : ''}`}>
                              {v.title}
                            </div>
                            {!v.isNone && (
                              <div className="text-caption text-gray-500">({v.type})</div>
                            )}
                          </div>
                          {!v.isNone && (
                            <div className="flex flex-wrap gap-sm">
                              {/* リンク表示を一時的に非表示 - データは保持 */}
                              {/* 
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
                              */}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 同じライブアレンジの映像・音源 */}
                {active.liveArrangements && (
                  <div className="margin-b-md">
                    <div className="text-body-small font-semibold margin-b-sm">・同じライブアレンジの映像・音源</div>
                    <div className="space-y-2">
                      {/* 配列形式のみ対応（文字列形式は廃止） */}
                      {Array.isArray(active.liveArrangements) && active.liveArrangements.map((a, i) => (
                        <div key={i} className={`padding-md rounded border ${a.isNone ? 'bg-gray-100 border-gray-300' : 'bg-gray-50'}`}>
                          <div className="margin-b-sm">
                            <div className={`font-semibold text-body-small ${a.isNone ? 'text-gray-500 italic' : ''}`}>
                              {a.title}
                            </div>
                            {!a.isNone && (
                              <div className="text-caption text-gray-500">({a.type})</div>
                            )}
                          </div>
                          {a.notes && a.notes !== a.title && !a.isNone && (
                            <div className="text-caption text-gray-500 margin-t-xs">{a.notes}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* どちらも無い場合の表示 */}
                {!active.liveVideos && !active.liveArrangements && (
                  <div className="text-body-small text-gray-600">関連映像・音源情報なし</div>
                )}
              </section>
            )}
          </div>
        </div>

        {/* フッター部分 */}
        <footer className="flex-shrink-0 border-t-[3px] border-black flex justify-end items-center padding-md gap-sm">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPreview(active)}
          >
            投票記入見本を開く
          </Button>
        </footer>
      </article>
    </div>
  );
} 