import { Link, useNavigate } from "react-router-dom";
import pricfy from "../utils/pricfy";
import { useCallback } from "react";
import { CART } from "../contextApi";

const ProductItem = (item: ProductProps) => {
  const { id, imgs, name, price, quan, desc } = item;

  const { addToCart } = CART.use();
  const navi = useNavigate();
  const onAdd = useCallback(async () => {
    const { success, message } = await addToCart(item);
    if (!success) {
      return alert(message);
    }

    if (confirm("장바구니에 담았습니다. 바로 결제하시겠습니까?")) {
      navi("/cart");
    }
  }, [item, addToCart, navi]);

  return (
    <div className="flex flex-col border rounded border-border">
      <img
        src={imgs[0]}
        alt={name}
        width={100}
        height={100}
        className="aspect-square object-cover w-full"
      />
      <div className="p-2.5 font-light">
        <Link
          className="h-auto p-0 items-start hover:shadow-none hover:text-theme font-normal"
          to={`/product/${id}`}
        >
          <p className="font-bold">{name}</p>
          <p className="">{desc}</p>
        </Link>

        <p className="text-2xl">₩ {pricfy(price)}</p>
        <p className="text-sm text-gray-500">{quan} 개 남았습니다.</p>
        <button className="btn text-sm mt-2" onClick={onAdd}>
          장바구니에 담기
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
