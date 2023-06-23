import { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { APIURL } from '../constants/constants';
import { SearchContext } from '../App';
import Pagination from '../components/Pagination/Pagination';
import { filterListNames } from '../components/Sort';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue } = useContext(SearchContext);
  const categoryId = useSelector((store) => store.filter.categoryId);
  const sortType = useSelector((store) => store.filter.sort.sortProperty);
  const currentPage = useSelector((store) => store.filter.currentPage);
  const url = new URL(APIURL);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (currentPage) => {
    dispatch(setCurrentPage(currentPage));
  };

  url.searchParams.append('title', `${searchValue ? searchValue : ''}`);
  url.searchParams.append('page', `${currentPage}`);
  url.searchParams.append('limit', '4');
  url.searchParams.append('category', `${categoryId > 0 ? categoryId : ''}`);
  url.searchParams.append('orderBy', `${sortType.replace('-', '')}`);
  url.searchParams.append('order', `${sortType.includes('-') ? 'asc' : 'desc'}`);

  const fetchPizzas = async () => {
    setIsLoading(true);
    try {
      const items = await axios.get(`${url}`);
      setItems(items.data);
      setIsLoading(false);
    } catch (error) {
      throw new Error(`Произошла ошибка: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = filterListNames.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
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
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => (
              <PizzaBlock
                key={item.id}
                title={item.title}
                price={item.price}
                image={item.imageUrl}
                sizes={item.sizes}
                types={item.types}
              />
            ))}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
