import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { checkResponse } from '../utils/utils';
import { APIURL } from '../constants/constants';
import Pagination from '../components/Pagination/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const url = new URL(APIURL);

  url.searchParams.append('title', `${searchValue ? searchValue : ''}`);
  url.searchParams.append('page', `${currentPage}`);
  url.searchParams.append('limit', '4');
  url.searchParams.append('category', `${categoryId > 0 ? categoryId : ''}`);
  url.searchParams.append('orderBy', `${sortType.sortProperty.replace('-', '')}`);
  url.searchParams.append('order', `${sortType.sortProperty.includes('-') ? 'asc' : 'desc'}`);

  useEffect(() => {
    setIsLoading(true);
    const getItems = async () => {
      const response = await fetch(`${url}`);
      const items = await checkResponse(response);
      setItems(items);
      setIsLoading(false);

      // window.scrollTo(0, 0);
    };

    getItems();
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort sortType={sortType} onChangeSort={(i) => setSortType(i)} />
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
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
