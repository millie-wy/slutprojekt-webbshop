import { Order, User } from "./resources";

// remove custmoer from order and add it again with type User
export type ClientOrder = Omit<Order, "customer"> & {
  _id: string;
  customer: User;
};

const order: ClientOrder = {} as any;

//  order.customer.address.city
//  order._id

export type ClientUser = User & { _id: string };

// export type ClientUser = User & { _id: string };
// export type ClientUser = User & { _id: string };
