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
  processOrder: (formValues: FormValues) => void;
  generateOrderNum: () => string;
}

export const OrderContext = createContext<OrderContextValue>({
  processOrder: () => {},
  generateOrderNum: () => "",
});

const OrderProvider: FC = (props) => {
  const { cart, shipper, paymentMethod } = useCart();

  /** process formValues and shape the order object */
  const processOrder = (formValues: FormValues) => {
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
    sendOrderToServer(updatedOrder);
  };

  /** send order object to server in order to create order */
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
        processOrder,
        generateOrderNum,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
export const useOrder = () => useContext(OrderContext);
