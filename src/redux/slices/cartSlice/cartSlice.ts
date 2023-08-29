import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem, ICartSliceState } from './cartSlice.types';
import { RootState } from '../../../types';

const initialState: ICartSliceState = {
  totalPrice: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const findItem = state.cartItems.find((item) => {
        return item.id === action.payload.id;
      });

      if (findItem) {
        findItem.count!++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.cartItems.reduce((sum, item) => {
        return item.price * item.count! + sum;
      }, 0);
    },
    plusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count!++;
      }
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count!--;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload);
    },
    clearItems: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (store: RootState) => store.cart;
export const selectCartItemById = (id: string) => (store: RootState) =>
  store.cart.cartItems.find((item) => item.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;