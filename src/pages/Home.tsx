import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useWhyDidYouUpdate } from 'ahooks';

import {
  selectFilter,
  selectSort,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice/filterSlice';

import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { APIURL } from '../constants/constants';
import Pagination from '../components/Pagination/Pagination';
import { filterListNames } from '../components/Sort/Sort';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice/pizzasSlice';
import { useAppDispatch } from '../types';
import { SortPropertyEnum } from '../redux/slices/filterSlice/filterSlice.types';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, currentPage, searchValue, sort } = useSelector(selectFilter);
  const { sortProperty: sortType } = useSelector(selectSort);
  const url = new URL(APIURL);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = useCallback((currentPageNumber: number) => {
    dispatch(setCurrentPage(currentPageNumber));
  }, []);

  url.searchParams.append('title', `${searchValue ? searchValue : ''}`);
  url.searchParams.append('page', `${currentPage}`);
  url.searchParams.append('limit', '4');
  url.searchParams.append('category', `${categoryId > 0 ? categoryId : ''}`);
  url.searchParams.append('orderBy', `${sortType.replace('-', '')}`);
  url.searchParams.append('order', `${sortType.includes('-') ? 'asc' : 'desc'}`);

  const getPizzas = () => {
    // @ts-ignore
    dispatch(fetchPizzas({ url }));
  };

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = filterListNames.find((obj) => obj.sortProperty === params.sortType) ?? {
        name: 'популярности (desc)',
        sortProperty: SortPropertyEnum.RATING_DESC,
      };

      dispatch(
        setFilters({
          searchValue,
          categoryId,
          currentPage,
          sort,
        })
      );

      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, currentPage, searchValue]);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
            : items.map((item) => {
                return (
                  <PizzaBlock
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    sizes={item.sizes}
                    types={item.types}
                  />
                );
              })}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
