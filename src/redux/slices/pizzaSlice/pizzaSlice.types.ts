export interface IPizzaSliceState {
  items: IPizzaItem[];
  status: Status;
}

export interface IPizzaItem {
  id: string;
  title: string;
  types: TPizzaTypes[];
  sizes: TSizes[];
  rating: number;
  imageUrl: string;
  price: number;
  category: number;
}

export interface IFetchPizzasParams {
  url: URL;
}

type TPizzaTypes = 0 | 1;

type TSizes = 26 | 30 | 40;

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
