import { useCart } from "./context/CartContextProvider";
import { DeliveryOption } from "./Types";
import type { Product } from "@server/shared/client.types";

// make data fetching request
export const makeRequest = async (
  url: string,
  method: string,
  body?: object
) => {
  let response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return await response.json();
  }
  return alert(await response.json());
};

export const sumQuantity = (itemData: Product[]) => {
  let sum = 0;
  for (let i = 0; i < itemData.length; i++) {
    sum += itemData[i].quantity!;
  }
  return sum;
};

export const UseSumTotal = (itemData: Product[], includeShipping: boolean) => {
  const { shipper } = useCart();
  let sum = 0;
  for (let i = 0; i < itemData.length; i++) {
    sum += itemData[i].price * itemData[i].quantity!;
  }

  if (includeShipping) {
    sum += shipper.cost;
  }
  return sum;
};

export const calculateVat = (itemData: Product[]) => {
  const vatRate = 0.25;
  let sum = 0;
  sum = Math.round(UseSumTotal(itemData, false) * vatRate);
  return sum;
};

export const sumProductPrice = (product: Product) => {
  let sum = 0;
  sum += product.price * product.quantity!;
  return sum;
};

export const numWithSpaces = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const sumDeliveryCost = (
  itemData: Product[],
  provider: DeliveryOption
) => {
  let sum = 0;
  sum = UseSumTotal(itemData, true) + provider.cost;
  console.log(sum);
  return sum;
};
