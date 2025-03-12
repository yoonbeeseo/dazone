import React from "react";

const ProductItem = ({ id, imgs, name, price, quan }: ProductProps) => {
  return (
    <div>
      <p>{name}</p>
      <img src={imgs[0]} alt={name} />
      <div>
        <p>가격: {price}원</p>
        <p>재고수량: {quan} 개 남았습니다.</p>
      </div>
    </div>
  );
};

export default ProductItem;
