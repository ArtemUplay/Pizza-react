// function checkResponse(response) {
//   if (response.statusText === 'OK') {
//     return response;
//   }

import { ICartItem } from '../redux/slices/cartSlice/cartSlice.types';

//   throw new Error(`Произошла ошибка: ${response.status}`);
// }

// export { checkResponse };

export const getCartDataFromLocalStorage = () => {
  const cartData = localStorage.getItem('cartItems');
  const cartItems: ICartItem[] = cartData ? JSON.parse(cartData) : [];
  const totalPrice = calcTotalPrice(cartItems);

  return {
    totalPrice,
    cartItems,
  };
};

export const calcTotalPrice = (cartItems: ICartItem[]) => {
  return cartItems.reduce((sum, item) => {
    return item.price * item.count! + sum;
  }, 0);
};
