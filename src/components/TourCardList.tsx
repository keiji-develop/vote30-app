import { type Tour } from '../types/tour';

type TourCardListProps = {
  tours: Tour[];
  onCardClick: (t: Tour) => void;
};

export function TourCardList({ tours, onCardClick }: TourCardListProps) {
  return (
    <ul className="grid gap-md mx-auto w-full">
      {tours.map(t => (
        <li
          key={t.id}
          className="border rounded padding-md flex flex-col gap-sm hover:bg-gray-100 cursor-pointer"
          onClick={() => onCardClick(t)}
        >
          {/* ID とタイトルまわりは横並び */}
          <div className="flex gap-lg items-start">
            <span className="text-display-lg sm:text-display-xl font-bold leading-none">
              {t.id}
            </span>
            <div className="leading-tight margin-t-sm">
              <div className="text-heading-3 sm:text-heading-2">{t.title}</div>
              {t.subtitle && (
                <div className="tracking-wider text-body sm:text-body-large">{t.subtitle}</div>
              )}
            </div>
          </div>
          {/* 説明文はタイトル群の下に表示 */}
          <p className="margin-t-sm text-body-small text-gray-700 line-clamp-2">
            {t.description}
          </p>
        </li>
      ))}
    </ul>
  );
} 