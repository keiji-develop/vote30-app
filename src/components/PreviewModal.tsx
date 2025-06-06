import { useRef, useEffect } from 'react';
import { type Tour } from '../types/tour';
import { fitOneLine } from '../utils/fitOneLine';
import { Button } from './Button';

type PreviewModalProps = {
  preview: Tour;
  seat: string;
  setPreview: (t: Tour | null) => void;
};

export function PreviewModal({ preview, seat, setPreview }: PreviewModalProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fitOneLine(titleRef.current);
    fitOneLine(subtitleRef.current);
  }, [preview]);

  return (
    <div
      className="fixed inset-0 bg-white flex items-center justify-center border-[6px] border-black z-50 py-4"
    >
      {/* 閉じるボタン */}
      <Button
        variant="primary"
        size="sm"
        onClick={() => setPreview(null)}
        className="absolute top-2 right-2"
      >
        閉じる
      </Button>
      {/* ラッパー: 縦積み & 同じ幅を共有 */}
      <div className="flex flex-col items-stretch w-[90%] max-w-[600px]">
        {/* 投票用紙そっくりボックス */}
        <div
          className="border border-black grid relative"
          style={{
            gridTemplateColumns: '30px 72px 30px 1fr',
            width: '100%', height: '110px'
          }}
        >
          {/* 1列目：候補番号ラベル */}
          <div className="border-r border-black flex items-center justify-center">
            <div className="flex justify-between w-full px-[2px]">
              <span className="font-bold leading-none"
                    style={{ writingMode:'vertical-rl', textOrientation:'upright', fontSize:'var(--kanji-size)' }}>
                候補番号
              </span>
              <span className="leading-none"
                    style={{ writingMode:'vertical-rl', textOrientation:'upright', fontSize:'var(--ruby-size)' }}>
                こうほばんごう
              </span>
            </div>
          </div>
          {/* 2列目：数字 */}
          <div className="border-r border-black flex items-center justify-center">
            <span style={{ fontSize:'var(--num-size)' }} className="font-bold">
              {preview.id}
            </span>
          </div>
          {/* 3列目：候補公演名ラベル */}
          <div className="border-r border-black flex items-center justify-center">
            <div className="flex justify-between w-full px-[2px]">
              <span className="font-bold leading-none"
                    style={{ writingMode:'vertical-rl', textOrientation:'upright', fontSize:'var(--kanji-size)' }}>
                候補公演名
              </span>
              <span className="leading-none"
                    style={{ writingMode:'vertical-rl', textOrientation:'upright', fontSize:'var(--ruby-size)' }}>
                こうほこうえんめい
              </span>
            </div>
          </div>
          {/* 4列目：公演名 */}
          <div className="px-4 flex flex-col justify-center overflow-hidden">
            <div ref={titleRef} className="whitespace-normal leading-tight text-heading-3 font-semibold">
              {preview.title}
            </div>
            {preview.subtitle && (
              <div ref={subtitleRef} className="whitespace-normal leading-tight tracking-wider text-heading-3">
                {preview.subtitle}
              </div>
            )}
          </div>
        </div>
        {/* 座席番号行 */}
        <div className="w-full px-0 pt-0 text-body-small flex">
          <span className="mr-2 font-semibold text-body-small">(本日の座席番号:</span>
          <span style={{ fontSize:'18px' }}>{seat || '–––'}</span>
          <span className="ml-1 font-semibold text-body-small">)</span>
        </div>
      </div>
    </div>
  );
} 