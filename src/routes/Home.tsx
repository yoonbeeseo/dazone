import { PRODUCT } from "../contextApi";
import ProductItem from "../shared/ProductItem";

const Home = () => {
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
