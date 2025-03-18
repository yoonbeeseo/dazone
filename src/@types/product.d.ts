interface ProductProps {
  name: string;
  quan: number;
  price: string;
  id: string;
  imgs: string[];
  desc: string;
}

interface CartProps extends ProductProps {
  createdAt: string;
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
