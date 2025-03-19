import { useTransition } from "react";
import pricfy from "../utils/pricfy";
import { CheckBox, Quan } from "../ui";
import { CART } from "../contextApi";
import Loading from "../shared/Loading";

const CartItem = (item: CartProps) => {
  const { name, desc, imgs, price, quan, isOnBasket } = item;

  const { updateAnItem, removeAnItem } = CART.use();

  const [isCbPending, startCb] = useTransition();
  const [isQPending, startQ] = useTransition();

  return (
    <div className="flex p-2.5 border-border border rounded dark:border-darkBorder relative">
      {isCbPending && <Loading className="absolute h-full bg-white/80" />}
      <CheckBox
        state={isOnBasket}
        onClick={() =>
          startCb(async () => {
            const { success, message } = await updateAnItem({
              ...item,
              isOnBasket: !isOnBasket,
            });
            if (!success) {
              return alert(message);
            }
          })
        }
      />

      <div className="flex-1 flex gap-x-2.5">
        <div className="overflow-hidden aspect-square w-30 sm:w-40">
          <img
            src={imgs[0]}
            alt={name}
            className="aspect-square object-cover hover:scale-105 transition"
          />
        </div>
        <div className="flex flex-col gap-y-1 flex-1 w-2">
          <p className="font-bold truncate">{name}</p>
          <p className="font-light line-clamp-4 leading-5">{desc}</p>
          <div className="flex gap-x-2.5">
            <Quan
              quan={quan}
              onChange={(newQuan) => {
                if (newQuan === 0) {
                  return;
                }
                const newItem: CartProps = { ...item, quan: newQuan };
                startQ(async () => {
                  const { success, message } = await updateAnItem({
                    ...newItem,
                  });
                  if (!success) {
                    return alert(message);
                  }
                });
              }}
              isPending={isQPending}
            />
            <button
              className="h-8 text-warning hover:shadow-none hover:bg-white dark:hover:bg-darkBg"
              onClick={() =>
                startCb(async () => {
                  const { success, message } = await removeAnItem(item);
                  if (!success) {
                    return alert(message);
                  }
                  alert("장바구니에서 삭제되었습니다.");
                })
              }
            >
              삭제
            </button>
          </div>
        </div>
        <p>₩{pricfy(price)}</p>
      </div>
    </div>
  );
};

export default CartItem;
