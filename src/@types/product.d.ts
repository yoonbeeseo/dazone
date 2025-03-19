interface ProductProps {
  name: string;
  quan: number;
  price: string;
  id: string;
  imgs: string[];
  desc: string;
  type?: ProductType;
  uid?: string;
}

type ProductType = "의류" | "식자재" | "가구" | "문구류" | "애완동물";

interface CartProps extends ProductProps {
  createdAt: string;
  isOnBasket: boolean;
}

interface OrderProps {
  amount: OrderAmount;
  method: OrderMethod;
  orderId: string;
  orderName: string;
  items: ProductProps[];
  createdAt: string;
}

interface OrderAmount {
  currency: "KRW" | "";
  value: number;
}

type OrderMethod = "CARD" | "";
