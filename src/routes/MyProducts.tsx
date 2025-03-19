import { useQuery } from "@tanstack/react-query";
import ProductItem from "../shared/ProductItem";
import useProductQuery from "../lib/query.related/product.query";
import Loading from "../shared/Loading";

const MyProducts = (user: User) => {
  const { queryFn, queryKey } = useProductQuery(user);
  const { data, error, isPending } = useQuery({ queryFn, queryKey });

  if (isPending) {
    return <Loading />;
  }

  if (error || !data) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div>
      <ul className="grid grid-cols-2 gap-2.5">
        {data.map((product) => (
          <li key={product.id}>
            <ProductItem {...product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProducts;
