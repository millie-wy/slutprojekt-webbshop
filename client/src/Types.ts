export interface Product {
  title: string;
  description: string;
  category: string[];
  price: number;
  quantity?: number;
  stock?: number;
  imageUrl: string;
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
export interface DeliveryOption {
  provider: string;
  cost: number;
  estTime: string;
  logoId?: string;
  id: string;
  logoUrl?: string;
}

export interface Address {
  street: string;
  zipCode: number | string;
  city: string;
}
