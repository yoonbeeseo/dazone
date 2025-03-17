import React from "react";
import { CART } from "../contextApi";
import pricfy from "../utils/pricfy";

const Cart = () => {
  const { cart } = CART.store();
  return (
    <div>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} {item.quan} {pricfy(item.price)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
