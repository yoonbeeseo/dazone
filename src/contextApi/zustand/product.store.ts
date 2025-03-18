import { create } from "zustand";
import { products } from "../../lib/dummy";

export interface Props {
  products: ProductProps[];
  keyword: string | null;
  onChangeKeyword: PropsFunc<string>;
}

export const store = create<Props>((set) => ({
  products,
  keyword: null,
  onChangeKeyword: (newKeyword) =>
    set((prev) => ({ ...prev, keyword: newKeyword })),
}));
