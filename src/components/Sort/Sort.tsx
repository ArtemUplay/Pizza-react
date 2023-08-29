import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSortType } from '../../redux/slices/filterSlice/filterSlice';
import { ISort, SortPropertyEnum } from '../../redux/slices/filterSlice/filterSlice.types';

export const filterListNames: ISort[] = [
  { name: 'популярности (desc)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ask)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене (desc)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ask)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (desc)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ask)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [isVisible, setVisible] = useState(false);

  const onClickListItem = (sortProperty: ISort) => {
    dispatch(setSortType(sortProperty));

    setVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Данный обработчик событий надо удалять, так как если не удалять
    // то при каждом ререндере компонента Sort будет создавать ещё слушатель и так далее
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div className="sort__label-wrapper">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
        </div>
        <span onClick={() => setVisible(!isVisible)}>{sort.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {filterListNames.map((obj, index) => {
              return (
                <li
                  key={index}
                  onClick={() => onClickListItem(obj)}
                  className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
