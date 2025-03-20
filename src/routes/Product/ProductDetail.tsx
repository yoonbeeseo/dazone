import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { db, FBCollection } from "../../lib/firebase";
import Loading from "../../shared/Loading";
import ProductItem from "../../shared/ProductItem";

const ProductDetail = () => {
  const { pid } = useParams<{ pid: string }>();

  const { data, error, isPending } = useQuery({
    queryFn: async (): Promise<null | ProductProps> => {
      if (!pid) {
        return null;
      }
      const ref = db.collection(FBCollection.PRODUCTS).doc(pid);
      const snap = await ref.get();
      const data = snap.data() as ProductProps;

      return data ?? null;
    },
    queryKey: ["product", pid],
  });

  if (isPending) {
    return <Loading className="top-0" message="상품을 가져오는 중입니다." />;
  }

  if (error || !data) {
    return <h1>존재하지 않는 상품입니다.</h1>;
  }

  return <ProductItem {...data} />;
};

export default ProductDetail;
