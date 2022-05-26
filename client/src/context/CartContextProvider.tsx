import type { DeliveryOption, Product } from "@server/shared/client.types";
import { createContext, FC, useContext, useState } from "react";
import { useLocalStorageState } from "../components/hooks/useLocalStorageState";
import { makeRequest } from "../Helper";

interface CartContextValue {
  cart: Product[];
  shipper: DeliveryOption;
  paymentMethod: string;
  isSwish?: Boolean;
  isCreditCard?: Boolean;
  isInvoice?: Boolean;
  selectSwish: () => void;
  selectCreditCard: () => void;
  selectInvoice: () => void;
  addToCart: (product: Product) => void;
  onAddQuantity: (product: Product) => void;
  onReduceQuantity: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  emptyCart: () => void;
  selectShippment: (provider: DeliveryOption) => void;
  selectPaymentMethod: (method: string) => void;
  getDeliveryOptions: () => void;
  deliveryOptions: DeliveryOption[];
}

export const CartContext = createContext<CartContextValue>({
  cart: [],
  shipper: {
    provider: "",
    cost: 0,
    estTime: "",
  },
  paymentMethod: "",
  selectSwish: () => {},
  selectCreditCard: () => {},
  selectInvoice: () => {},
  addToCart: () => {},
  onAddQuantity: () => {},
  onReduceQuantity: () => {},
  removeFromCart: () => {},
  emptyCart: () => {},
  selectShippment: () => {},
  selectPaymentMethod: () => "",
  getDeliveryOptions: () => {},
  deliveryOptions: [],
});

const CartProvider: FC = (props) => {
  const [cart, setCart] = useLocalStorageState<Product[]>([], "cc-cart");
  const [shipper, setShipper] = useState<DeliveryOption>({
    provider: "Postnord",
    cost: 495,
    estTime: "3-5 Weekdays",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");
  const [isCreditCard, setIsCreditCard] = useState<Boolean>(true);
  const [isSwish, setIsSwish] = useState<Boolean>(false);
  const [isInvoice, setIsInvoice] = useState<Boolean>(false);
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);

  /** add items to cart: if the item does not exist in the cart, add; otherwise increase quantity by 1 */
  const addToCart = async (product: Product) => {
    if (cart.some((item) => item._id === product._id)) {
      const updatedCart = cart.map((item) => {
        if (product._id !== item._id) return item;
        return { ...item, quantity: item.quantity! + 1 };
      });
      setCart(updatedCart);
    } else {
      const cartItem: Product = { ...product, quantity: 1 };
      setCart([...cart, cartItem]);
    }
  };

  /** add item quantity by 1 in shopping cart */
  const onAddQuantity = (product: Product) => {
    const updatedQuantity = cart.map((item) => {
      if (product._id !== item._id) return item;
      return { ...item, quantity: item.quantity! + 1 };
    });
    setCart(updatedQuantity);
  };

  /** reduce item quantity by 1 in shopping cart */
  const onReduceQuantity = (product: Product) => {
    const updatedQuantity = cart.map((item) => {
      if (product._id === item._id && item.quantity! > 1)
        return { ...item, quantity: item.quantity! - 1 };
      return item;
    });
    setCart(updatedQuantity);
  };

  /** remove item from from the cart */
  const removeFromCart = (product: Product) => {
    if (cart.find((item) => item._id === product._id)) {
      const updatedCart = cart.filter((item) => item._id !== product._id);
      setCart(updatedCart);
    }
  };

  /** set cart to empty array */
  const emptyCart = () => {
    setCart([]);
  };

  /** set state when a shipper is selected */
  const selectShippment = (provider: DeliveryOption) => {
    setShipper(provider);
  };

  /** set state when a payment method is selected */
  const selectPaymentMethod = (method: string) => {
    setPaymentMethod(method);
  };

  /** the below 3 function are for changing the state of the specific payment method when it is being selected,
   *  solely for the form's conditional validation */
  const selectSwish = () => {
    setIsSwish(true);
    setIsCreditCard(false);
    setIsInvoice(false);
  };

  const selectCreditCard = () => {
    setIsSwish(false);
    setIsCreditCard(true);
    setIsInvoice(false);
  };

  const selectInvoice = () => {
    setIsSwish(false);
    setIsCreditCard(false);
    setIsInvoice(true);
  };

  /** get all delivery options from the delivery options collection in db */
  const getDeliveryOptions = async () => {
    const response = await makeRequest("/api/deliveryOption", "GET");
    setDeliveryOptions(response);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        shipper,
        paymentMethod,
        isSwish,
        isCreditCard,
        isInvoice,
        selectSwish,
        selectCreditCard,
        selectInvoice,
        addToCart,
        onAddQuantity,
        onReduceQuantity,
        removeFromCart,
        emptyCart,
        selectShippment,
        selectPaymentMethod,
        getDeliveryOptions,
        deliveryOptions,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
