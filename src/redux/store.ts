import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice/filterSlice';
import cart from './slices/cartSlice/cartSlice';
import pizza from './slices/pizzaSlice/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
