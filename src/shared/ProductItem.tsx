import { Link } from "react-router-dom";
import pricfy from "../utils/pricfy";

const ProductItem = ({ id, imgs, name, price, quan, desc }: ProductProps) => {
  return (
    <div
      className="flex flex-col border rounded border-border"
      onClick={() => pricfy(1234.22, true)}
    >
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
        <button className="btn text-sm mt-2">장바구니에 담기</button>
      </div>
    </div>
  );
};

export default ProductItem;
