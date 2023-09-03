import { Link } from 'react-router-dom';
import cartEmptyImage from '../../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <div className="container container__cart">
      <div className="cart cart__empty">
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cartEmptyImage} alt="Пустая корзина" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
