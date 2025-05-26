import { type Tour } from '../types/tour';

type TourCardListProps = {
  tours: Tour[];
  onCardClick: (t: Tour) => void;
};

export function TourCardList({ tours, onCardClick }: TourCardListProps) {
  return (
    <ul className="grid gap-3 mx-auto w-full">
      {tours.map(t => (
        <li
          key={t.id}
          className="border rounded p-3 flex flex-col gap-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onCardClick(t)}
        >
          {/* ID とタイトルまわりは横並び */}
          <div className="flex gap-6 items-start">
            <span className="text-6xl sm:text-7xl font-bold leading-none">
              {t.id}
            </span>
            <div className="leading-tight mt-2">
              <div className="text-lg sm:text-xl font-semibold">{t.title}</div>
              {t.subtitle && (
                <div className="tracking-wider text-base sm:text-lg">{t.subtitle}</div>
              )}
            </div>
          </div>
          {/* 説明文はタイトル群の下に表示 */}
          <p className="mt-2 text-sm text-gray-700 line-clamp-2">
            {t.description}
          </p>
        </li>
      ))}
    </ul>
  );
} 