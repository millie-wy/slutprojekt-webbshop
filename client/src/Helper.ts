import type { DeliveryOption, Product } from "@server/shared/client.types";
import { useCart } from "./context/CartContextProvider";

// make data fetching request
export const makeRequest = async (
  url: string,
  method: string,
  body?: object,
  headers?: RequestInit["headers"]
) => {
  let response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  const ok = response.ok;
  const result = await response.json();
  return { ok, result };
};

// sum quantity of the same product
export const sumQuantity = (itemData: Product[]) => {
  let sum = 0;
  for (let i = 0; i < itemData.length; i++) {
    sum += itemData[i].quantity!;
  }
  return sum;
};

// sum of all product prices, with or without shipping
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

// calculate the 25% VAT based on the total price
export const calculateVat = (itemData: Product[]) => {
  const vatRate = 0.25;
  let sum = 0;
  sum = Math.round(UseSumTotal(itemData, false) * vatRate);
  return sum;
};

// sum price of the same product
export const sumProductPrice = (product: Product) => {
  let sum = 0;
  sum += product.price * product.quantity!;
  return sum;
};

// format price
export const numWithSpaces = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const sumDeliveryCost = (
  itemData: Product[],
  provider: DeliveryOption
) => {
  let sum = 0;
  sum = UseSumTotal(itemData, true) + provider.cost;
  return sum;
};
