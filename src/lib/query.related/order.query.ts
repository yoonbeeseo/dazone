import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db, FBCollection } from "../firebase";
import { v4 } from "uuid";
import { getCreatedAt } from "../../utils/dayjs";

export default function useOrderQuery(uid: string) {
  const queryKey = ["order"];

  const ref = db
    .collection(FBCollection.USERS)
    .doc(uid)
    .collection(FBCollection.ORDERS);
  const fetchFn = async (): Promise<OrderProps[]> => {
    const snap = await ref.get();

    const data = snap.docs.map((doc) => ({ ...(doc.data() as OrderProps) }));

    return data ?? [];
  };

  const queryClient = useQueryClient();

  const cachingFn = () => queryClient.invalidateQueries({ queryKey });

  type CRUDAction = "CREATE" | "READ" | "UPDATE" | "DELETE";

  const mutation = useMutation({
    mutationFn: async ({
      action,
      order,
    }: {
      action: CRUDAction;
      order: OrderProps;
    }) => {
      const orderId = v4();

      const newOrder: OrderProps = {
        ...order,
        orderId,
        createdAt: getCreatedAt(),
      };

      switch (action) {
        case "CREATE":
          await ref.doc(orderId).set(newOrder);

          return;

        case "UPDATE":
          await ref.doc(order.orderId).update(order);
          return;

        case "DELETE":
          await ref.doc(order.orderId).delete();
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

  const updateFn = async (action: CRUDAction, order: OrderProps) => {
    await mutation.mutateAsync({ action, order });
  };

  return { queryKey, fetchFn, updateFn };
}
