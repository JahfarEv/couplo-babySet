import type { CustomizationDetails } from "./types/customization";

export interface Product {
  id: string;
  name: string;
  category: CategoryFilter;
  price: number;
  rating: number;
  ratingCount: number;
  image: string;
  images?: string[];
  description: string;
  isNew?: boolean;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  stock?: number;
  status?: "Active" | "Draft" | "Out of Stock";
  customizable?: boolean;
  sold?: number;
  createdAt?: unknown;
  updatedAt?: unknown;
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

export interface Customization {
  embroideredText?: string;
  babyName?: string;
  fontStyle?: string;
  embroideryColor?: string;
  giftWrap?: boolean;
  giftMessage?: string;
  specialNotes?: string;
  selectedSize?: string;
  selectedColor?: string;
}

export type CategoryFilter = string;

export interface Category {
  image: string;
  name: string;
  id: string;
  value: CategoryFilter;
  label: string;
  description?: string;
  order?: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinedDate?: string;
}
export interface Order {
  id: string;
  orderId?: string;
  userId: string;
  userEmail: string;
  userName: string;
  // ...
}