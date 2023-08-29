import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../../types';
import { IFetchPizzasParams, IPizzaItem, IPizzaSliceState, Status } from './pizzaSlice.types';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params: IFetchPizzasParams) => {
  const { url } = params;

  const { data } = await axios.get<IPizzaItem[]>(`${url}`);

  return data;
});

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IPizzaItem[]>) => {
      state.items = action.payload;
    },
  },
  //? Возможно, нужно будет убрать этот код
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (store: RootState) => store.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
