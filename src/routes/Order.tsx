import useOrderQuery from "../lib/query.related/order.query";
import { useQuery } from "@tanstack/react-query";
import Loading from "../shared/Loading";

const Order = (user: User) => {
  const { fetchFn, queryKey } = useOrderQuery(user.uid);

  const { data, isPending, error } = useQuery({ queryKey, queryFn: fetchFn });

  if (isPending) {
    return <Loading />;
  }

  if (error || !data) {
    return (
      <h1>
        {error.message} {error.name}
      </h1>
    );
  }

  return (
    <div>
      {data.map((order) => (
        <div key={order.orderId}>{order.orderName}</div>
      ))}
    </div>
  );
};

export default Order;
