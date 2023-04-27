import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { APIURL } from '../constants/constants';
import { SearchContext } from '../App';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const categoryId = useSelector((store) => store.filter.categoryId);
  const sortType = useSelector((store) => store.filter.sort.sortProperty);
  const currentPage = useSelector((store) => store.filter.currentPage);
  // console.log(currentPage);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (currentPage) => {
    dispatch(setCurrentPage(currentPage));
  };

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);

  const url = new URL(APIURL);

  url.searchParams.append('title', `${searchValue ? searchValue : ''}`);
  url.searchParams.append('page', `${currentPage}`);
  url.searchParams.append('limit', '4');
  url.searchParams.append('category', `${categoryId > 0 ? categoryId : ''}`);
  url.searchParams.append('orderBy', `${sortType.replace('-', '')}`);
  url.searchParams.append('order', `${sortType.includes('-') ? 'asc' : 'desc'}`);

  useEffect(() => {
    setIsLoading(true);
    const getItems = async () => {
      try {
        const items = await axios.get(`${url}`);
        setItems(items.data);
        setIsLoading(false);
      } catch (error) {
        throw new Error(`Произошла ошибка: ${error}`);
      } finally {
        setIsLoading(false);
      }

      // window.scrollTo(0, 0);
    };

    getItems();
  }, [categoryId, sortType, searchValue, currentPage]);

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
