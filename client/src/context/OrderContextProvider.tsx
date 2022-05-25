import { createContext, FC, useContext, useState } from "react";
import { FormValues } from "../components/cart-checkout/CheckoutFormContainer";
import { Address, DeliveryOption, Product } from "../Types";
import { useCart } from "./CartContextProvider";

interface OrderData {
  // orderNo: string;
  deliveryAddress: Address;
  products: Product[];
  shipmentOption: DeliveryOption;
  paymentMethod: String;
  // customer: Customer;
}

// export interface Customer {
//   name: string;
//   email: string;
// }

interface OrderContextValue {
  order: OrderData[];
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
  const [order, setOrder] = useState<OrderData[]>([]);

  /** push in everything related to the order to the order state */
  const createOrder = (formValues: FormValues) => {
    const boughtItems = [...cart];
    const deliveryAddress = {
      street: formValues.addressStreet,
      zipCode: formValues.addressZipCode,
      city: formValues.addressCity,
    };
    // const customer: Customer = {
    //   name: customerValues.name,
    //   email: customerValues.email,
    // };
    let updatedOrder: OrderData = {
      deliveryAddress: deliveryAddress,
      // customer: ,
      products: boughtItems,
      shipmentOption: shipper,
      paymentMethod: paymentMethod,
      // orderNo: generateOrderNum(),
    };
    console.log(updatedOrder);
    setOrder([updatedOrder]);
  };
  // console.log(order);

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
