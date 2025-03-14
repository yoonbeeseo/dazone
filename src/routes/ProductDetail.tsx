import { useParams } from "react-router-dom";
import { PRODUCT } from "../contextApi";
import { useEffect, useState, useCallback } from "react";
import pricfy from "../utils/pricfy";
import Loading from "../shared/Loading";

const ProductDetail = () => {
  const { pid } = useParams<{ pid: string }>();
  const { products } = PRODUCT.store();

  const [isPending, setIsPending] = useState(true);
  const [product, setProduct] = useState<null | ProductProps>(null);

  const fetchProduct = useCallback(
    (): Promise<ProductProps | string> =>
      new Promise((resolve) => {
        setTimeout(() => {
          if (!pid) {
            return resolve("상품 아이디가 존재하지 않습니다.");
          }

          const foundProduct = products.find((item) => item.id === pid);

          if (!foundProduct) {
            return resolve("해당 상품이 더 이상 존재하지 않습니다.");
          }

          return resolve(foundProduct);
        }, 500);
      }),
    [products, pid]
  );

  useEffect(() => {
    const fn = async () => {
      setIsPending(true);
      const res = await fetchProduct();

      if (typeof res === "string") {
        setProduct(null);
        alert(res);
      } else {
        setProduct(res);
      }
      setIsPending(false);
    };

    fn();

    return () => {
      fn();
    };
  }, [fetchProduct]);

  return !product || isPending ? (
    <Loading />
  ) : (
    <div>
      <p>{product.name}</p>
      <p>{pricfy(product.price)}원</p>
    </div>
  );
};

export default ProductDetail;
