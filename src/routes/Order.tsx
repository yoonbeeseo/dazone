import { useQuery } from "@tanstack/react-query";
import useOrderQuery from "../lib/query.related/order.query";
import Loading from "../shared/Loading";
import OrderItem from "./OrderItem";

const Order = (user: User) => {
  const { fetchFn, queryKey } = useOrderQuery(user.uid);
  const { data, isPending, error } = useQuery({ queryKey, queryFn: fetchFn });

  if (isPending) {
    return <Loading className="top-0 bg-white/80 dark:bg-darkBorder/80" />;
  }

  if (error || !data) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="flex flex-col gap-y-2.5 p-5">
      <h1 className="font-black text-2xl">주문내역</h1>
      <ul className="flex flex-col gap-y-2.5">
        {data.map((order) => (
          <li key={order.orderId}>
            <OrderItem {...order} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
