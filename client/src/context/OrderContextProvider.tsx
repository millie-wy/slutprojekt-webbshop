import { createContext, FC, useContext, useState } from "react";
import { FormValues } from "../components/cart-checkout/CheckoutFormContainer";
import { useCart } from "./CartContextProvider";
import type {
  Product,
  DeliveryOption,
  Address,
  Order,
} from "@server/shared/client.types";
import { makeRequest } from "../Helper";

interface OrderContextValue {
  order: Order[];
  createOrder: (formValues: FormValues) => void;
  generateOrderNum: () => string;
}

export const OrderContext = createContext<OrderContextValue>({
  order: [],
  createOrder: () => {},
  generateOrderNum: () => "",
});

const OrderProvider: FC = (props) => {
  const { cart, shipper, paymentMethod } = useCart();
  const [order, setOrder] = useState<Order[]>([]);

  /** push in everything related to the order to the order state */
  const createOrder = (formValues: FormValues) => {
    const boughtItems = [...cart];
    const deliveryAddress = {
      street: formValues.deliveryAddress.street,
      zipCode: Number(formValues.deliveryAddress.zipCode),
      city: formValues.deliveryAddress.city,
    };
    let updatedOrder: Order = {
      deliveryAddress: deliveryAddress,
      products: boughtItems,
      deliveryOption: shipper,
      paymentMethod: paymentMethod,
      phoneNumber: Number(formValues.phoneNumber),
    };
    console.log(updatedOrder);
    sendOrderToServer(updatedOrder);
  };
  // console.log(order);

  const sendOrderToServer = async (order: Order) => {
    const response = await makeRequest("/api/order", "POST", order);
    console.log(response);
  };
  /** generate an unique order numder */
  const generateOrderNum = () => {
    const yy: string = new Date().getFullYear().toString().substr(-2);
    const mm: number = new Date().getMonth() + 1;
    const dd: number = new Date().getDate();
    const formattedDate =
      yy + (mm > 9 ? "" : "0") + mm + (dd > 9 ? "" : "0") + dd;
    const randomNum: number = Math.floor(Math.random() * 100000);
    const orderNum: string = formattedDate + "-" + randomNum;
    return orderNum;
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        createOrder,
        generateOrderNum,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
export const useOrder = () => useContext(OrderContext);
