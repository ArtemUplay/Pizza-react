export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: ISort;
}

export interface ISort {
  name: string;
  sortProperty: SortPropertyEnum;
}

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}
