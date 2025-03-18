import { useMemo } from "react";
import pricfy from "../utils/pricfy";
import { CheckBox, Quan } from "../ui";
import { CART } from "../contextApi";

interface Props {
  item: CartProps;
  basket: CartProps[];
  onSelect: (item: CartProps, isDelete?: boolean) => void;
}

const CartItem = ({ item, basket, onSelect }: Props) => {
  const { name, desc, imgs, id, price, quan } = item;

  const isSelected = useMemo(() => {
    const foundItem = basket.find((basketItem) => basketItem.id === id);
    return foundItem ? true : false;
  }, [id, basket]);

  const { updateAnItem } = CART.use();
  return (
    <div className="flex p-2.5 border-border border rounded dark:border-darkBorder">
      <CheckBox state={isSelected} onClick={() => onSelect(item, isSelected)} />

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
          <Quan
            quan={quan}
            onChange={async (newQuan) => {
              if (newQuan === 0) {
                return;
              }
              const newItem: CartProps = { ...item, quan: newQuan };
              await updateAnItem([newItem]);
              onSelect(newItem);
            }}
          />
        </div>
        <p>₩{pricfy(price)}</p>
      </div>
    </div>
  );
};

export default CartItem;
