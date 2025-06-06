import { type Tour } from '../types/tour';

type TourCardListProps = {
  tours: Tour[];
  onCardClick: (t: Tour) => void;
};

export function TourCardList({ tours, onCardClick }: TourCardListProps) {
  return (
    <ul className="space-y-4 mx-auto w-full">
      {tours.map(t => (
        <li
          key={t.id}
          className="bg-gray-50 rounded p-4 border-l-4 hover:bg-gray-100 cursor-pointer transition-colors"
          style={{ borderLeftColor: 'var(--primary)' }}
          onClick={() => onCardClick(t)}
        >
          {/* 公式一覧と同じ構成：左に候補番号、右に候補公演名 */}
          <div className="flex items-start gap-4 mb-3">
            {/* 候補番号（公式と同じく左側に大きく） */}
            <div className="flex-shrink-0 w-12 text-center">
              <span className="text-display-lg font-bold text-numeric text-black">
                {t.id}
              </span>
            </div>
            
            {/* 候補公演名（公式と同じく右側に） */}
            <div className="flex-1">
              <div className="text-heading-3 font-semibold leading-tight">{t.title}</div>
              {t.subtitle && (
                <div className="tracking-wider text-body text-gray-700 mt-1">{t.subtitle}</div>
              )}
            </div>
          </div>
          
          {/* 説明文（公式と同じく下部に、簡潔に） */}
          <div className="text-body-small text-gray-700 line-clamp-2 leading-relaxed">
            {t.description}
          </div>
        </li>
      ))}
    </ul>
  );
} 