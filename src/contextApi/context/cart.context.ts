import { useContext, createContext } from "react";

export interface Props {
  cart: CartProps[];

  addToCart: (item: ProductProps) => Promise<PromiseResult>;
  removeAnItem: (item: CartProps) => Promise<PromiseResult>;
  updateAnItem: (item: CartProps) => Promise<PromiseResult>;
  emptyCart: () => Promise<PromiseResult>;

  isPending: boolean;
  error: null | Error;
}

export const initialState: Props = {
  cart: [],

  addToCart: async () => ({}),
  removeAnItem: async () => ({}),
  updateAnItem: async () => ({}),
  emptyCart: async () => ({}),
  isPending: true,
  error: null,
};

export const context = createContext(initialState);
export const use = () => useContext(context);
