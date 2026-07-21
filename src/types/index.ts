import type { CustomizationDetails } from "./customization";

// Make CategoryFilter a flexible string type
export type CategoryFilter = string;

// Or if you want to keep it as a union with fallback:
// export type CategoryFilter = "all" | "babyset" | "accessories" | "tshirt" | "cordset" | (string & {});

// For the Category interface
export interface Category {
  id: string;
  name: string;
  value: CategoryFilter; // Use CategoryFilter type
  label: string;
  image?: string;
  description?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryFilter; // Use CategoryFilter type
  price: number;
  rating: number;
  ratingCount: number;
  image: string;
  images: string[];
  description: string;
  isNew: boolean;
  sizes: string[];
  colors: Array<{ name: string; hex: string }>;
  stock?: number;
  status?: 'Active' | 'Draft' | 'Out of Stock';
  customizable?: boolean;
  sold?: number;
  createdAt?: any;
  updatedAt?: any;
}



export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinedDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  id: string;
  userId: string;
  productName: string;
  qty: number;
  total: string;
  status: string;
  statusColor?: string;
  notes?: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  value: string;
  label: string;
  image?: string;
  description?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  embroideredText?: string;
  customization?: CustomizationDetails & {
    embroideredText?: string;
  };
}

export interface CartData {
  userId: string;
  items: CartItem[];
  updatedAt: string;
}
