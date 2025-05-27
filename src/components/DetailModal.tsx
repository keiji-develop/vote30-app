import { type Tour } from '../types/tour';
import { useState } from 'react';

type DetailModalProps = {
  active: Tour;
  setActive: (t: Tour | null) => void;
  setPreview: (t: Tour) => void;
};

export function DetailModal({ active, setActive, setPreview }: DetailModalProps) {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center"
      onClick={() => setActive(null)}
    >
      <article
        tabIndex={-1}
        className="relative bg-white w-full max-w-[95vw] sm:max-w-md md:max-w-lg border-[3px] border-black font-serif flex flex-col max-h-[90vh]"
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
            
            {/* 公演メモとセットリストを横並びに */}
            <div className="flex flex-col md:flex-row gap-6 w-full">
              {/* 公演メモ */}
              {active.extraNotes && (
                <section className="flex-1 min-w-0 break-words">
                  <div className="font-bold text-sm text-black mb-1">公演メモ</div>
                  <div className="text-sm leading-relaxed text-gray-800">{active.extraNotes}</div>
                </section>
              )}
              {/* セットリスト */}
              {active.setlist && (
                <section className="flex-1 min-w-0 break-words overflow-x-auto">
                  <div className="font-bold text-sm text-black mb-1">セットリスト</div>
                  <ul className="list-disc list-inside text-sm leading-relaxed ml-4">
                    {active.setlist.map((song, i) => (
                      <li key={i}>{song}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* 詳細情報の展開ボタン */}
            {((active.releases?.length ?? 0) > 0 || (active.liveVideos?.length ?? 0) > 0 || (active.liveArrangements?.length ?? 0) > 0) && (
              <button
                onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 border-t border-b border-gray-200"
              >
                {isDetailsExpanded ? '詳細を閉じる' : '関連作品情報を開く'}
              </button>
            )}

            {/* 詳細情報部分 */}
            {isDetailsExpanded && (
              <section>
                <div className="font-bold text-sm text-black mb-1">関連作品情報</div>
                {active.releases && active.releases.length > 0 && (
                  <div className="mb-3">
                    <div className="text-sm font-semibold mb-1">・ツアー関連リリース</div>
                    <ul className="space-y-2">
                      {active.releases.map((rel, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          {rel.coverImageUrl && (
                            <img src={rel.coverImageUrl} alt={rel.title} className="w-8 h-8 object-cover rounded border" />
                          )}
                          <span className="font-semibold">{rel.title}</span>
                          <span className="text-xs text-gray-500">({rel.type})</span>
                          <span className="text-xs text-gray-500">{rel.releaseDate}</span>
                          {rel.link && (
                            <a href={rel.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">詳細</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {active.liveVideos && active.liveVideos.length > 0 && (
                  <div className="mb-3">
                    <div className="text-sm font-semibold mb-1">・ライブ映像</div>
                    <ul className="space-y-2">
                      {active.liveVideos.map((v, i) => (
                        <li key={i} className="text-sm">
                          <span className="font-semibold">{v.title}</span>
                          <span className="text-xs text-gray-500 ml-2">({v.type})</span>
                          {v.type !== 'TV' && v.link && (
                            <a href={v.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">視聴/購入</a>
                          )}
                          {v.type === 'TV' && v.notes && (
                            <span className="text-xs text-gray-500 ml-2">{v.notes}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {active.liveArrangements && active.liveArrangements.length > 0 && (
                  <div className="mb-3">
                    <div className="text-sm font-semibold mb-1">・関連ライブ音源</div>
                    <ul className="space-y-2">
                      {active.liveArrangements.map((a, i) => (
                        <li key={i} className="text-sm">
                          <span className="font-semibold">{a.title}</span>
                          <span className="text-xs text-gray-500 ml-2">({a.type})</span>
                          {a.link && (
                            <a href={a.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">詳細</a>
                          )}
                        </li>
                      ))}
                    </ul>
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