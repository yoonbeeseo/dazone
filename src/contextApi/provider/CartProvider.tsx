import { PropsWithChildren, useCallback } from "react";
import { AUTH, CART } from "../context";
import useCartQuery from "../../lib/query.related/cart.query";
import { useQuery } from "@tanstack/react-query";

const CartProvider = ({ children }: PropsWithChildren) => {
  const { user } = AUTH.use();

  const { updateFn, queryKey, fetchFn } = useCartQuery(user?.uid as string);
  const { data, isPending, error } = useQuery({ queryFn: fetchFn, queryKey });

  const addToCart = useCallback(
    async (item: ProductProps): Promise<PromiseResult> => {
      try {
        const foundItem = data?.find((cartItem) => cartItem.id === item.id);
        console.log("adding item");
        await updateFn(
          "CREATE",
          foundItem
            ? { ...foundItem, quan: foundItem.quan + 1 }
            : { ...item, quan: 1 }
        );

        console.log("item added");
        return { success: true };
      } catch (error: any) {
        console.log(error.message);
        return { message: error.message };
      }
    },
    [updateFn, data]
  );

  const updateAnItem = useCallback(
    async (item: ProductProps): Promise<PromiseResult> => {
      try {
        await updateFn("UPDATE", item);

        return { success: true };
      } catch (error: any) {
        return { message: error.message };
      }
    },
    [updateFn]
  );

  const removeAnItem = useCallback(
    async (item: CartProps): Promise<PromiseResult> => {
      try {
        await updateFn("DELETE", item);

        return { success: true };
      } catch (error: any) {
        return { message: error.message };
      }
    },
    [updateFn]
  );

  const emptyCart = useCallback(async (): Promise<PromiseResult> => {
    try {
      data?.map(async (item) => {
        await updateFn("DELETE", item);
      });

      return { success: true };
    } catch (error: any) {
      return { message: error.message };
    }
  }, [updateFn, data]);
  return (
    <CART.context.Provider
      value={{
        addToCart,
        cart: data ?? [],
        emptyCart,
        error,
        isPending,
        removeAnItem,
        updateAnItem,
      }}
    >
      {children}
    </CART.context.Provider>
  );
};

export default CartProvider;
