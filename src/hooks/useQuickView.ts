import { useState } from "react";
import { Product } from "../types";

/** Manages the state behind the Quick View product modal. */
export function useQuickView() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setSize(product.sizes ? product.sizes[0] : "One Size");
    setColor(product.colors ? product.colors[0].name : "Natural");
    setQuantity(1);
  };

  const closeQuickView = () => setSelectedProduct(null);

  return {
    selectedProduct,
    size,
    setSize,
    color,
    setColor,
    quantity,
    setQuantity,
    openQuickView,
    closeQuickView,
  };
}
