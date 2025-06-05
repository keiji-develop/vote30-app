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
          {/* ID とタイトルまわりは横並び */}
          <div className="flex gap-6 items-start mb-3">
            <span className="text-display-lg sm:text-display-xl font-bold leading-none text-numeric" style={{ color: 'var(--primary)' }}>
              {t.id}
            </span>
            <div className="leading-tight mt-2">
              <div className="text-heading-3 sm:text-heading-2 font-semibold">{t.title}</div>
              {t.subtitle && (
                <div className="tracking-wider text-body sm:text-body-large text-gray-700">{t.subtitle}</div>
              )}
            </div>
          </div>
          {/* 説明文はタイトル群の下に表示 */}
          <p className="text-body-small text-gray-700 line-clamp-2">
            {t.description}
          </p>
        </li>
      ))}
    </ul>
  );
} 