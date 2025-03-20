import { useSearchParams } from "react-router-dom";
import ProductItem from "../../shared/ProductItem";
import { useQuery } from "@tanstack/react-query";
import { db, FBCollection } from "../../lib/firebase";
import Loading from "../../shared/Loading";

const Product = () => {
  const keyword = useSearchParams()[0].get("keyword");

  // const { keyword } = PRODUCT.store();
  const { data, isPending, error } = useQuery({
    queryFn: async (): Promise<ProductProps[]> => {
      const ref = db
        .collection(FBCollection.PRODUCTS)
        .where("name", "in", keyword?.split(" "));
      // .where("name", "array-contains", [keyword]);
      const snap = await ref.get();
      const data = snap.docs.map((doc) => ({
        ...(doc.data() as ProductProps),
      }));
      return data ?? [];
    },
    queryKey: ["product", "searching", keyword],
  });

  if (isPending) {
    return <Loading className="top-0" />;
  }

  if (error || !data) {
    return <h1> Error : {error.message}</h1>;
  }

  return data.length === 0 ? (
    <h1 className="mt-5 text-center">검색된 아이템이 없습니다.</h1>
  ) : (
    <ul className="grid gap-2.5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-300 mx-auto p-2.5">
      {data.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ul>
  );
};

export default Product;
