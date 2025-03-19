import { useQuery } from "@tanstack/react-query";
import useProductQuery from "../lib/query.related/product.query";
import ProductItem from "../shared/ProductItem";
import Loading from "../shared/Loading";
// import { useEffect } from "react";
// import { db, FBCollection } from "../lib/firebase";
// import { products } from "../lib/dummy";

const Home = () => {
  const { queryFn, queryKey } = useProductQuery();
  const { data, error, isPending } = useQuery({ queryFn, queryKey });

  // useEffect(() => {
  //! 최초 1회만 실행해서 데이터베이스에 상품 등록하기
  //   const fn = async () => {
  //     const ref = db.collection(FBCollection.PRODUCTS);
  //     for (const product of products) {
  //       await ref.doc(product.id).set(product);
  //     }
  //     console.log("products init");
  //   };
  //   fn();
  // }, []);
  return (
    <div className="grid gap-2.5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-300 mx-auto p-2.5">
      {isPending && <Loading className="top-0" />}
      {error || !data ? (
        <h1>Error: {error?.message}</h1>
      ) : (
        data.map((product) => <ProductItem key={product.id} {...product} />)
      )}
    </div>
  );
};

export default Home;
