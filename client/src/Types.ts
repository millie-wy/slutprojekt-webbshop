export interface Product {
  title: string;
  description: string;
  category: string[];
  price: number;
  quantity: number;
  image: string; // string for now...
  id: string;
}

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
