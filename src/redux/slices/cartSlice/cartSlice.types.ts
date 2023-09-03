export interface ICartSliceState {
  totalPrice: number;
  cartItems: ICartItem[];
}

export interface ICartItem {
  id: string;
  uniqueId: string;
  title: string;
  type: string;
  size: number;
  imageUrl: string;
  price: number;
  count: number;
}
