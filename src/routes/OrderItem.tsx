import { useState } from "react";
import { getFromNow } from "../utils/dayjs";
import pricfy from "../utils/pricfy";
import { IoChevronDown } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const OrderItem = (order: OrderProps) => {
  const { amount, createdAt, items, orderId, orderName } = order;
  const [isFull, setIsFull] = useState(false);
  return (
    <div className="border border-border dark:border-darkBorder p-2.5 rounded">
      <div className="flex gap-x-2.5">
        <div className="w-40 aspect-square">
          <img
            src={items[0].imgs[0]}
            alt={items[0].name}
            className="object-cover h-full"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-xl">{orderName}</h2>
            <p>주문번호: {orderId}</p>
            <p>
              구매날짜: {createdAt} <span>{getFromNow(createdAt)}</span>
            </p>
            <p>{pricfy(amount.value)} 원</p>
          </div>
          <button
            onClick={() => setIsFull((prev) => !prev)}
            className="flex h-auto p-1 flex-row gap-x-2.5 hover:shadow-none"
          >
            {isFull ? "접기" : "펼쳐보기"}
            <IoChevronDown
              className={twMerge(
                "transition duration-500",
                isFull && "rotate-180"
              )}
            />
          </button>
        </div>
      </div>
      {isFull && (
        <ul className="flex flex-wrap gap-1 mt-2.5">
          {items.map((item) => (
            <li key={item.id}>
              <div className="flex gap-x-1 border rounded p-1 px-2 border-border dark:border-darkBorder">
                <p>{item.name}</p>
                <p>구매수량: {item.quan}개</p>
                <p>{pricfy(item.quan * Number(item.price))} 원</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderItem;
