import { useState, useMemo, useEffect } from 'react';
import type { Tour } from '../types/tour';

type SearchFilters = {
  decade: string[];
};

type SearchInterfaceProps = {
  tours: Tour[];
  onFilteredResults: (filtered: Tour[]) => void;
};

// 年代区切り定義
const DECADE_RANGES = [
  { label: '1996～2001', start: 1996, end: 2001 },
  { label: '2002～2006', start: 2002, end: 2006 },
  { label: '2007～2012', start: 2007, end: 2012 },
  { label: '2013～2017', start: 2013, end: 2017 },
  { label: '2018～2023', start: 2018, end: 2023 }
];

export function SearchInterface({ tours, onFilteredResults }: SearchInterfaceProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    decade: []
  });

  // フィルタ処理
  const filteredTours = useMemo(() => {
    let results = tours;

    // 年代フィルター
    if (filters.decade.length > 0) {
      results = results.filter(tour => {
        return filters.decade.some(decadeLabel => {
          const range = DECADE_RANGES.find(r => r.label === decadeLabel);
          if (!range) return false;
          return tour.year >= range.start && tour.year <= range.end;
        });
      });
    }

    return results;
  }, [tours, filters]);

  // フィルタ結果を親に通知
  useEffect(() => {
    onFilteredResults(filteredTours);
  }, [filteredTours, onFilteredResults]);

  // 年代フィルターのトグル
  const toggleDecadeFilter = (decadeLabel: string) => {
    setFilters(prev => ({
      ...prev,
      decade: prev.decade.includes(decadeLabel)
        ? prev.decade.filter(item => item !== decadeLabel)
        : [...prev.decade, decadeLabel]
    }));
  };

  // すべてクリア
  const clearAllFilters = () => {
    setFilters({
      decade: []
    });
  };

  const hasActiveFilters = filters.decade.length > 0;

  return (
    <div className="bg-white rounded-lg border-2 p-4 mb-6" style={{ borderColor: 'var(--primary)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-heading-3 font-semibold text-gray-800">年代別検索</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-body-small text-red-600 hover:text-red-800 underline"
          >
            すべてクリア
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* 年代別フィルター */}
        <div>
          <h3 className="text-body font-semibold mb-3 text-gray-700">📅 年代で絞り込み</h3>
          <div className="flex flex-wrap gap-2">
            {DECADE_RANGES.map(range => (
              <button
                key={range.label}
                onClick={() => toggleDecadeFilter(range.label)}
                className={`px-4 py-2 rounded-full text-body-small border transition-colors ${
                  filters.decade.includes(range.label)
                    ? 'bg-blue-100 border-blue-400 text-blue-800 font-semibold'
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* 検索結果サマリー */}
        <div className="border-t pt-4">
          <div className="text-body-small text-gray-600">
            検索結果: <span className="font-semibold text-black">{filteredTours.length}</span> 件 
            {hasActiveFilters && (
              <span className="text-gray-500"> / 全{tours.length}件</span>
            )}
          </div>
          
          {/* 選択中の年代を表示 */}
          {hasActiveFilters && (
            <div className="mt-2">
              <span className="text-body-small text-gray-600">選択中: </span>
              <span className="text-body-small font-medium text-blue-700">
                {filters.decade.join('、')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 