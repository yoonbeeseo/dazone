import React, { useMemo } from "react";
import { PRODUCT } from "../contextApi";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../shared/ProductItem";

const Product = () => {
  const { products } = PRODUCT.store();
  const productId = useSearchParams()[0].get("productId");

  const product = useMemo<null | ProductProps>(() => {
    const foundItem = products.find((item) => item.id === productId);
    if (!foundItem) {
      return null;
    }
    return foundItem;
  }, [products, productId]);
  return !product ? null : <ProductItem {...product} />;
};

export default Product;
