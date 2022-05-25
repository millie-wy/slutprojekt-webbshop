import { Order as ServerOrder, User as ServerUser, Product as ServerProduct } from "../resources";

/** Client type of an order with the customer field populated */
export type Order = Omit<ServerOrder, "customer"> & {
  _id: string;
  /** Normally an id, has been populated */ customer: User;
};

/** Client type of a product object */
export type Product = ServerProduct & { _id: string };

/** Client type of a user object */
export type User = ServerUser & { _id: string };