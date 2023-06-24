import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem: (state, action) => {
    //   state.cartItems.push(action.payload);
    //   state.totalPrice = state.cartItems.reduce((sum, item) => {
    //     return sum + item.price;
    //   }, 0);
    // },
    addItem: (state, action) => {
      const findItem = state.cartItems.find((item) => item.id === action.payload.id);

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
    plusItem: (state, action) => {
      const findItem = state.cartItems.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count++;
      }
    },
    minusItem: (state, action) => {
      const findItem = state.cartItems.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload);
    },
    clearItems: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
