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
  // ループナビゲーション: 最初の要素の前は最後の要素、最後の要素の次は最初の要素
  const prevTour = currentIndex > 0 ? tours[currentIndex - 1] : tours[tours.length - 1];
  const nextTour = currentIndex < tours.length - 1 ? tours[currentIndex + 1] : tours[0];

  // キーボードナビゲーション
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActive(prevTour);
      }
      if (e.key === 'ArrowRight') {
        setActive(nextTour);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prevTour, nextTour, setActive]);

  // タッチイベント（スワイプナビゲーション）
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;
      
      // 水平方向の移動距離が十分で、かつ垂直方向の移動が水平方向より小さい場合のみ反応
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 2) {
        if (diffX > 0) {
          setActive(nextTour); // 左スワイプで次へ
        } else if (diffX < 0) {
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
      {/* モーダルとナビゲーションのコンテナ */}
      <div className="relative">
        
        {/* 左矢印 - レスポンシブ配置 */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 z-50 left-1 sm:left-4 md:left-8 lg:left-12 xl:right-[calc(100%+8px)] xl:left-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Button 
            variant="icon" 
            size="md"
            onClick={(e) => {
              e.stopPropagation();
              setActive(prevTour);
            }}
            aria-label="前の公演"
            className="bg-white/95 hover:bg-white shadow-lg border text-lg sm:text-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center"
          >
            &#8592;
          </Button>
        </div>

        {/* 右矢印 - レスポンシブ配置 */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 z-50 right-1 sm:right-4 md:right-8 lg:right-12 xl:left-[calc(100%+8px)] xl:right-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Button 
            variant="icon" 
            size="md"
            onClick={(e) => {
              e.stopPropagation();
              setActive(nextTour);
            }}
            aria-label="次の公演"
            className="bg-white/95 hover:bg-white shadow-lg border text-lg sm:text-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center"
          >
            &#8594;
          </Button>
        </div>

        {/* モーダル本体 - 元の幅に戻す */}
        <article
          ref={modalRef}
          tabIndex={-1}
          className="relative bg-white w-full max-w-[95vw] sm:max-w-md md:max-w-lg rounded shadow-lg border-2 flex flex-col max-h-[90vh]"
          style={{ borderColor: 'var(--primary)' }}
          onClick={e => e.stopPropagation()}
        >

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

        {/* ヘッダー部分 - 公式一覧と同じレイアウト */}
        <div className="flex-shrink-0">
          <header className="flex items-center text-body font-semibold tracking-wider bg-gray-100 px-4 py-3 border-b">
            <span>候補番号・候補公演名・公演概要</span>
          </header>
          
          {/* 公式一覧と同じ構成：左に番号、右に公演名 */}
          <div className="p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-4 mb-4">
              {/* 候補番号（公式と同じく左側に大きく） */}
              <div className="flex-shrink-0 w-16 text-center">
                <span className="text-display-lg sm:text-display-xl font-bold text-numeric text-black">
                  {active.id}
                </span>
              </div>
              
              {/* 候補公演名（公式と同じく右側に） */}
              <div className="flex-1">
                <div className="text-heading-3 sm:text-heading-2 font-semibold leading-tight">
                  {active.title}
                </div>
                {active.subtitle && (
                  <div className="tracking-wider text-body sm:text-body-large text-gray-700 mt-1">
                    {active.subtitle}
                  </div>
                )}
              </div>
            </div>
            
            {/* 説明文（公式と同じく下部に） */}
            <div className="text-body-small text-gray-700 whitespace-pre-wrap leading-relaxed">
              {active.description}
            </div>
          </div>
          <hr className="border-b-2" style={{ borderColor: 'var(--primary)' }} />
        </div>

        {/* スクロール可能なコンテンツ部分 */}
        <div className="flex-1 overflow-y-auto">
          {/* 管理人追記エリアのヘッダー */}
          <header className="flex items-center text-body font-semibold tracking-wider bg-gray-100 px-4 py-3 border-b">
            <span>管理人追記</span>
          </header>
          
          <div className="p-4 sm:p-5 md:p-6 py-4 space-y-4">
            
            {/* 公演メモとセットリストを1列に */}
            <div className="flex flex-col gap-6 w-full">
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
                  <div className="mb-3">
                    <h3 className="text-body font-semibold text-gray-800 border-b border-gray-200 pb-1">セットリスト</h3>
                  </div>
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
                              <div key={index} className="text-body-small leading-relaxed ml-4 mb-1">
                                <span className="inline-block w-6 text-right mr-2 text-numeric">{currentNumber}.</span>
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
              <section className="mt-6">
                <div className="mb-4">
                  <h3 className="text-body font-semibold text-gray-800 border-b border-gray-200 pb-1">関連作品情報</h3>
                </div>
                
                {/* このライブが収録されている映像・音源 */}
                {active.liveVideos && (
                  <div className="mb-4">
                    <div className="text-body-small font-semibold mb-2">・このライブが収録されている映像・音源</div>
                    <div className="space-y-3">
                      {/* 配列形式のみ対応（文字列形式は廃止） */}
                      {Array.isArray(active.liveVideos) && active.liveVideos.map((v, i) => (
                                                 <div key={i} className={`rounded p-4 border-l-4 ${v.isNone ? 'bg-gray-100' : 'bg-gray-50'}`} style={{ borderLeftColor: v.isNone ? 'var(--neutral-300)' : 'var(--info)' }}>
                           <div className="mb-2">
                             <div className={`font-semibold text-body-small ${v.isNone ? 'text-gray-500 italic' : ''}`}>
                               {v.title}
                             </div>
                             {!v.isNone && (
                               <div className="text-caption text-gray-500">({v.type})</div>
                             )}
                           </div>
                          {!v.isNone && (
                            <div className="space-y-3">
                              {Array.isArray((v as any).links) && (v as any).links.length > 0 ? (
                                (() => {
                                  // プラットフォーム別の色設定（レスポンシブ対応・1行表示保証）
                                  const getButtonStyle = (platform: string) => {
                                    const baseStyle = "w-[120px] sm:w-[140px] md:w-[160px] px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm text-white font-bold rounded sm:rounded-md md:rounded-lg hover:shadow-lg transition-all duration-200 text-center whitespace-nowrap";
                                    
                                    switch(platform) {
                                      case 'sony_music':
                                        return `${baseStyle} bg-red-600 hover:bg-red-700`;
                                      case 'amazon':
                                        return `${baseStyle} bg-orange-500 hover:bg-orange-600`;
                                      case 'apple_music':
                                        return `${baseStyle} bg-gray-800 hover:bg-gray-900`;
                                      case 'spotify':
                                        return `${baseStyle} bg-green-500 hover:bg-green-600`;
                                      case 'youtube':
                                        return `${baseStyle} bg-red-500 hover:bg-red-600`;
                                      case 'rakuten':
                                        return `${baseStyle} bg-red-700 hover:bg-red-800`;
                                      default:
                                        return `${baseStyle} bg-blue-600 hover:bg-blue-700`;
                                    }
                                  };

                                  // カテゴリ設定（拡張可能）
                                  const categoryConfig: Record<string, { label: string; priority: number }> = {
                                    purchase: { label: '購入', priority: 1 },
                                    streaming: { label: '視聴・試聴', priority: 2 },
                                    viewing: { label: '視聴', priority: 3 }
                                  };

                                  // データのcategoryに基づいて動的に分類
                                  const linksByCategory = new Map<string, any[]>();
                                  const otherLinks: any[] = [];

                                  (v as any).links.forEach((link: any) => {
                                    // enabledがfalseの場合はスキップ
                                    if (link.enabled === false) return;

                                    if (typeof link === 'object' && link.category) {
                                      if (!linksByCategory.has(link.category)) {
                                        linksByCategory.set(link.category, []);
                                      }
                                      linksByCategory.get(link.category)?.push(link);
                                    } else {
                                      // カテゴリなし・旧形式は「その他」
                                      otherLinks.push(link);
                                    }
                                  });

                                  // priorityでカテゴリを並び替え
                                  const sortedCategories = Array.from(linksByCategory.keys())
                                    .sort((a, b) => (categoryConfig[a]?.priority || 999) - (categoryConfig[b]?.priority || 999));

                                  return (
                                    <>
                                      {/* 動的カテゴリ表示 */}
                                      {sortedCategories.map((category) => {
                                        const categoryLinks = linksByCategory.get(category) || [];
                                        const categoryLabel = categoryConfig[category]?.label || category;

                                        return (
                                          <div key={category}>
                                            <div className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">
                                              {categoryLabel}
                                            </div>
                                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                              {categoryLinks.map((link: any, j: number) => (
                                                <a key={`${category}-${j}`} href={link.urls.direct} target="_blank" rel="noopener noreferrer" 
                                                   className={getButtonStyle(link.platform)}>
                                                  {link.label || 'リンク'}
                                                </a>
                                              ))}
                                            </div>
                                          </div>
                                        );
                                      })}

                                      {/* その他・旧形式 */}
                                      {otherLinks.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                          {otherLinks.map((link: any, j: number) => {
                                            if (typeof link === 'string') {
                                              return (
                                                <a key={`other-${j}`} href={link} target="_blank" rel="noopener noreferrer" 
                                                   className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                                                  視聴/購入{otherLinks.length > 1 ? `(${j + 1})` : ''}
                                                </a>
                                              );
                                            }
                                            return null;
                                          })}
                                        </div>
                                      )}
                                    </>
                                  );
                                })()
                              ) : v.link ? (
                                <a href={v.link} target="_blank" rel="noopener noreferrer" 
                                   className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                                  視聴/購入
                                </a>
                              ) : null}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 同じライブアレンジの映像・音源 */}
                {active.liveArrangements && (
                  <div className="mb-4">
                    <div className="text-body-small font-semibold mb-2">・同じライブアレンジの映像・音源</div>
                    <div className="space-y-2">
                      {/* 配列形式のみ対応（文字列形式は廃止） */}
                      {Array.isArray(active.liveArrangements) && active.liveArrangements.map((a, i) => (
                        <div key={i} className={`rounded p-4 border-l-4 ${a.isNone ? 'bg-gray-100' : 'bg-gray-50'}`} style={{ borderLeftColor: a.isNone ? 'var(--neutral-300)' : 'var(--success)' }}>
                                                     <div className="mb-2">
                             <div className={`font-semibold text-body-small ${a.isNone ? 'text-gray-500 italic' : ''}`}>
                               {a.title}
                             </div>
                             {!a.isNone && (
                               <div className="text-caption text-gray-500">({a.type})</div>
                             )}
                           </div>
                           {a.notes && a.notes !== a.title && !a.isNone && (
                             <div className="text-caption text-gray-500 mt-1">{a.notes}</div>
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
        <footer className="flex-shrink-0 border-t-2 flex justify-end items-center p-3 space-x-2" style={{ borderTopColor: 'var(--primary)' }}>
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
    </div>
  );
} 