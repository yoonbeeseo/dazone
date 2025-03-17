import { create } from "zustand";
import { products } from "../../lib/dummy";

export interface Props {
  cart: ProductProps[];
  addToCart: (item: ProductProps) => void;
  removeAnItem: (id: string) => void;
  emptyCart: () => void;
  updateAnItem: (item: ProductProps) => void;
  placeOrder: (items: ProductProps[]) => void;
}

export const store = create<Props>((set) => ({
  cart: [{ ...products[0], quan: 2 }],
  addToCart: (item) =>
    set((prev) => {
      const cart = [...prev.cart];

      const index = cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index < 0) {
        cart.push({ ...item, quan: 1 });
      } else {
        // cart[index].quan = cart[index].quan + 1
        cart[index].quan += 1;
      }

      return { ...prev, cart };
    }),

  removeAnItem: (id) =>
    set((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => item.id !== id),
    })),
  emptyCart: () => set((prev) => ({ ...prev, cart: [] })),
  updateAnItem: (item) =>
    set((prev) => ({
      ...prev,
      cart: prev.cart.map((cartItem) =>
        cartItem.id === item.id ? item : cartItem
      ),
    })),
  placeOrder: (items) =>
    set((prev) => {
      let cart = [...prev.cart];

      items.map((item) => {
        const foundItem = cart.find((cartItem) => cartItem.id === item.id);
        if (foundItem) {
          cart = cart.filter((cartItem) => cartItem.id !== item.id);
        }
      });

      return { ...prev, cart };
    }),
}));
