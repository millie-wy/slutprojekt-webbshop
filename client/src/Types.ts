// import mongoose, { Types, orderSchema } from "mongoose";
// export interface Product {
//   title: string;
//   description: string;
//   category: string[];
//   price: number;
//   quantity: number;
//   image: string; // string for now...
//   id: string;
// }
// export interface Order {
//   customer: User;
//   deliveryAddress: {
//     street: stricng;
//     zipCode: number;
//     city: string;
//   };
//   deliveryOption: string;
//   phoneNumber: number;
//   products: Product[];
//   isShipped?: boolean;
//   paymentMethod: string;
//   createdAt: Date;
// }

/* export interface Order {
  customer: string,
  deliveryAddress: {
    street: string,
    zipCode: string,
    city: string
  },
  deliveryOption: string,
  phoneNumber: number,
  products: string[],
  paymentMethod: string
}
*/

// export {} //för att slippa errorför nu

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}
export interface UserSignOut {
  email: string;
  password: string;
}
export interface DeliveryOption {
  provider: string;
  cost: number;
  estTime: string;
  logoId?: string;
  id: string;
  logoUrl?: string;
}
