import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { checkResponse } from '../utils/utils';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.sortProperty.replace('-', '');
  const category = categoryId > 0 ? `${categoryId}` : '';

  useEffect(() => {
    setIsLoading(true);
    const getItems = async () => {
      const response = await fetch(
        `https://641ac58ef398d7d95d5e1fa0.mockapi.io/items?category=${category}&sortBy=${sortBy}&order=${order}`
      );
      const items = await checkResponse(response);
      setItems(items);
      setIsLoading(false);

      window.scrollTo(0, 0);
    };

    getItems();
  }, [categoryId, sortType]);

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
          : items
              .filter((item) => {
                if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
                  return true;
                }

                return false;
              })
              .map((item) => (
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
    </div>
  );
};

export default Home;
