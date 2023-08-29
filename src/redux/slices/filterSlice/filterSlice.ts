import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilterSliceState, ISort, SortPropertyEnum } from './filterSlice.types';
import { RootState } from '../../../types';

const initialState: IFilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortType: (state, action: PayloadAction<ISort>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilterSliceState>) => {
      state.currentPage = +action.payload.currentPage;
      state.sort.sortProperty = action.payload.sort.sortProperty;
      state.categoryId = +action.payload.categoryId;
    },
  },
});

export const selectFilter = (store: RootState) => store.filter;
export const selectSort = (store: RootState) => store.filter.sort;
export const selectSortType = (store: RootState) => store.filter.sort.sortProperty;

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
