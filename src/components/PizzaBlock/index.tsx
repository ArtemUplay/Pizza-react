import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '../../redux/slices/cartSlice/cartSlice';
import { IPizzaBlockProps } from './index.types';
import { ICartItem } from '../../redux/slices/cartSlice/cartSlice.types';
import { Link } from 'react-router-dom';

const typeNames = ['тонкое', 'традиционное'];

const PizzaBlock = ({ id, title, price, imageUrl, sizes, types }: IPizzaBlockProps) => {
  const dispatch = useDispatch();
  const [activeType, setActiveTypes] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const uniqueId = `${id}_${typeNames[activeType]}_${sizes[activeSize]}`;
  const cartItem = useSelector(selectCartItemById(uniqueId));

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      uniqueId,
    } as ICartItem;

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`} key={id}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeIndex) => {
              if (types.length === 1 && types[0] === 1) {
                return (
                  <li
                    key={typeIndex}
                    onClick={() => setActiveTypes(typeIndex)}
                    className={typeIndex === 1 ? 'active' : ''}>
                    {typeNames[typeIndex]}
                  </li>
                );
              } else {
                return (
                  <li
                    key={typeIndex}
                    onClick={() => setActiveTypes(typeIndex)}
                    className={activeType === typeIndex ? 'active' : ''}>
                    {typeNames[typeIndex]}
                  </li>
                );
              }
            })}
          </ul>
          <ul>
            {sizes.map((size, index) => {
              return (
                <li key={index} onClick={() => setActiveSize(index)} className={activeSize === index ? 'active' : ''}>
                  {size} см.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button className="button button--outline button--add" onClick={onClickAdd}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount !== 0 && addedCount && addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
