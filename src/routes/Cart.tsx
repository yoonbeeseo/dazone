import { useState, useMemo, useCallback } from "react";
import { AUTH, CART } from "../contextApi";
import CartItem from "./CartItem";
import pricfy from "../utils/pricfy";
import Toss, {
  loadTossPayments,
  TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";
import { v4 } from "uuid";
import { db, FBCollection } from "../lib/firebase";

const Cart = () => {
  const { cart, placeOrder } = CART.store();
  const [basket, setBasket] = useState(cart);

  const subTotal = useMemo(
    () =>
      basket.reduce(
        (accumulatedValue: number, item: ProductProps) =>
          accumulatedValue + item.quan * Number(item.price),
        0
      ),
    [basket]
  );

  const { user } = AUTH.use();
  const onPay = useCallback(async () => {
    try {
      if (!user) {
        return alert("로그인 해주세요.");
      }

      const toss = await loadTossPayments(import.meta.env.VITE_CLIENT_KEY!);

      const orderId = v4();

      const newPayment = {
        amount: {
          currency: "KRW",
          value: subTotal,
        },
        method: "CARD",
        orderId,
        orderName:
          basket.length > 1
            ? `${basket[0].name} 등 ${basket.length}개의 상품`
            : basket[0].name,
      };

      const ref = db
        .collection(FBCollection.USERS)
        .doc(user.uid)
        .collection(FBCollection.ORDERS)
        .doc(orderId);

      await toss
        .payment({ customerKey: user.uid })
        .requestPayment(newPayment as any);

      await ref.set(newPayment);

      placeOrder(basket);
      setBasket([]);
      alert("결제가 완료되었습니다.");
    } catch (error: any) {
      return alert(error.message);
    }
  }, [basket, subTotal, user, placeOrder]);

  return (
    <div className="flex flex-col gap-y-2.5 p-5">
      <h1 className="font-black text-2xl">장바구니</h1>
      <ul className="flex flex-col gap-y-2.5">
        {cart.map((item) => (
          <li key={item.id} className="hover:bg-bg dark:hover:bg-darkBorder">
            <CartItem
              item={item}
              basket={basket}
              onSelect={(cartItem, isDelete) =>
                setBasket((prev) => {
                  const index = prev.findIndex(
                    (item) => item.id === cartItem.id
                  );

                  if (index >= 0) {
                    if (isDelete) {
                      return prev.filter((item) => item.id !== cartItem.id);
                    }
                    return prev.map((item) =>
                      item.id === cartItem.id ? cartItem : item
                    );
                  }

                  return [...prev, cartItem];
                })
              }
            />
          </li>
        ))}
      </ul>
      {basket.length > 0 && (
        <>
          <div className="text-right text-xl my-5">
            합계 ({basket.reduce((a, b) => a + b.quan, 0)}개의 상품):{" "}
            <b> {pricfy(subTotal)}원</b>
          </div>
          <button onClick={onPay} className="btn">
            결제하기
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
