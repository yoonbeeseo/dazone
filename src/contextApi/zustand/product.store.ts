import { create } from "zustand";
import { products } from "../../lib/dummy";

export interface Props {
  products: ProductProps[];
}

export const store = create<Props>(() => ({
  products,
}));
