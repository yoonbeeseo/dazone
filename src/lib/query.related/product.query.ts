import { useQueryClient, useMutation } from "@tanstack/react-query";
import { db, FBCollection } from "../firebase";

export default function useProductQuery(user?: null | User) {
  const queryKey = ["product", user?.uid];
  const ref = db.collection(FBCollection.PRODUCTS);

  const queryFn = async (): Promise<ProductProps[]> => {
    if (user) {
      const snap = await ref.where("uid", "==", user?.uid).get();
      const data = snap.docs.map((doc) => ({
        ...(doc.data() as ProductProps),
      }));
      return data ?? [];
    }
    const snap = await ref.get();
    const data = snap.docs.map((doc) => ({ ...(doc.data() as ProductProps) }));
    return data ?? [];
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      action,
      product,
    }: {
      action: CRUDAction;
      product: ProductProps;
    }) => {
      switch (action) {
        case "CREATE":
          await ref.doc(product.id).set(product);
          return;

        case "UPDATE":
          await ref.doc(product.id).update(product);
          return;

        case "DELETE":
          await ref.doc(product.id).delete();
          return;
      }
    },

    //!side-effect
    onSuccess: (res) => {
      console.log(res);
      console.log("success");
      queryClient.invalidateQueries({
        queryKey,
      });
    },

    onError: (error: any) => {
      alert(error.message);
      console.log(error);
    },
  });

  const addProduct = async (product: ProductProps): Promise<PromiseResult> => {
    try {
      await mutation.mutateAsync({ action: "CREATE", product });
      return { success: true };
    } catch (error: any) {
      return { message: error.message };
    }
  };

  return { queryKey, queryFn, addProduct };
}
