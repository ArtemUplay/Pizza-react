import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem, ICartSliceState } from './cartSlice.types';
import { RootState } from '../../../types';
import { getCartDataFromLocalStorage } from '../../../utils/utils';

const { cartItems, totalPrice } = getCartDataFromLocalStorage();

const initialState: ICartSliceState = {
  totalPrice,
  cartItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const findItem = state.cartItems.find((item) => item.uniqueId === action.payload.uniqueId);

      console.log(action.payload);

      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.cartItems.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    plusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find((item) => item.uniqueId === action.payload);

      if (findItem) {
        findItem.count!++;
      }

      state.totalPrice = state.cartItems.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },

    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find((item) => item.uniqueId === action.payload);

      if (findItem) {
        findItem.count!--;
      }

      state.totalPrice = state.cartItems.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.uniqueId !== action.payload);

      state.totalPrice = state.cartItems.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    clearItems: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (store: RootState) => store.cart;
export const selectCartItemById = (uniqueId: string) => (store: RootState) => {
  return store.cart.cartItems.find((item) => item.uniqueId === uniqueId);
};

export const { addItem, removeItem, minusItem, clearItems, plusItem } = cartSlice.actions;

export default cartSlice.reducer;
