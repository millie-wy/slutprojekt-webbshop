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
