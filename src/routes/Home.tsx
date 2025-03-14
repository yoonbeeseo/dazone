// import { useEffect } from "react";
import { PRODUCT } from "../contextApi";
import ProductItem from "../shared/ProductItem";
// import { db } from "../lib/firebase";

const Home = () => {
  // useEffect(() => {
  //   const subscribe = db.collection("products").onSnapshot((snap) => {
  //     const data = snap.docs.map((doc) => ({ ...doc.data() }));

  //     console.log(data);
  //   });

  //   return subscribe;
  // }, []);

  const { products } = PRODUCT.store();
  return (
    <div className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-300 mx-auto p-2.5">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Home;
