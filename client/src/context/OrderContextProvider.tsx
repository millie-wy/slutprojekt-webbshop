import type { Order } from "@server/shared/client.types";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { FormValues } from "../components/cart-checkout/CheckoutFormContainer";
import { makeRequest } from "../Helper";
import { useCart } from "./CartContextProvider";

interface OrderContextValue {
  orderIsLoading: boolean;
  setOrderIsLoading: Dispatch<SetStateAction<boolean>>;
  processOrder: (formValues: FormValues) => void;
  setOrder: Dispatch<SetStateAction<Order | undefined>>;
  order: Order | undefined;
}

export const OrderContext = createContext<OrderContextValue>({
  orderIsLoading: false,
  setOrderIsLoading: () => {},
  processOrder: () => {},
  setOrder: () => {},
  order: {
    customer: {
      email: "",
      password: "",
    },
    deliveryAddress: {
      street: "",
      zipCode: 0,
      city: "",
    },
    deliveryOption: {
      provider: "",
      cost: 0,
      estTime: "",
    },
    paymentMethod: "",
    phoneNumber: 0,
    products: [],
  },
});

const OrderProvider: FC = (props) => {
  const [orderIsLoading, setOrderIsLoading] = useState<boolean>(false);
  const { cart, shipper, paymentMethod } = useCart();
  const [order, setOrder] = useState<Order | undefined>();
  const navigate = useNavigate();
  const { emptyCart, isSwish, isCreditCard, isInvoice } = useCart();

  /** process formValues and shape the order object */
  const processOrder = async (formValues: FormValues) => {
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
    await sendOrderToServer(updatedOrder);
  };

  /** send order object to server in order to create order */
  const sendOrderToServer = async (order: Order) => {
    const response = await makeRequest("/api/order", "POST", order);
    setOrder(response);
    if (order) {
      navigate("/confirmation");
      setOrderIsLoading(false);
      emptyCart();
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orderIsLoading,
        setOrderIsLoading,
        processOrder,
        setOrder,
        order,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
export const useOrder = () => useContext(OrderContext);
