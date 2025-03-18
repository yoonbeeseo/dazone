import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db, FBCollection } from "../firebase";
import { getCreatedAt } from "../../utils/dayjs";

export default function useOrderQuery(uid: string) {
  const queryKey = ["cart"];

  const ref = db
    .collection(FBCollection.USERS)
    .doc(uid)
    .collection(FBCollection.CART);
  const fetchFn = async (): Promise<CartProps[]> => {
    const snap = await ref.get();

    const data = snap.docs.map((doc) => ({ ...(doc.data() as CartProps) }));

    return data ?? [];
  };

  const queryClient = useQueryClient();

  const cachingFn = () => queryClient.invalidateQueries({ queryKey });

  type CRUDAction = "CREATE" | "READ" | "UPDATE" | "DELETE";

  const mutation = useMutation({
    mutationFn: async ({
      action,
      cart,
    }: {
      action: CRUDAction;
      cart: CartProps | ProductProps;
    }) => {
      switch (action) {
        case "CREATE":
          await ref
            .doc(cart.id)
            .set({ ...cart, createdAt: getCreatedAt() } as CartProps);

          return;

        case "UPDATE":
          await ref.doc(cart.id).update(cart);
          return;

        case "DELETE":
          await ref.doc(cart.id).delete();
          return;

        default:
          return;
      }
    },

    onError: (err) => {
      console.log(err);
    },

    onSuccess: () => {
      cachingFn();
    },
  });

  const updateFn = async (action: CRUDAction, cart: CartProps) => {
    await mutation.mutateAsync({ action, cart });
  };

  return { queryKey, fetchFn, updateFn };
}
