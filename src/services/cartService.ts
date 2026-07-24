import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CartItem } from "../types";

export const cartService = {
  // Save cart to Firestore
  saveCart: async (userId: string, items: CartItem[]) => {
    try {
      const cartRef = doc(db, "carts", userId);
      const cartData = JSON.parse(
        JSON.stringify({
          userId: userId,
          items: items.map((item) => ({
            productId: item.product.id,
            product: item.product,
            quantity: item.quantity,
            selectedSize: item.selectedSize || null,
            selectedColor: item.selectedColor || null,
            customization: item.customization || null,
          })),
          updatedAt: new Date().toISOString(),
        })
      );
      await setDoc(cartRef, cartData);
      return true;
    } catch (error) {
      console.error("Failed to save cart:", error);
      return false;
    }
  },

  // Load cart from Firestore
  loadCart: async (userId: string): Promise<CartItem[] | null> => {
    try {
      const cartRef = doc(db, "carts", userId);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        const data = cartDoc.data();
        if (data.items && data.items.length > 0) {
          return data.items.map((item: any) => ({
            product: item.product,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
            customization: item.customization || undefined,
          }));
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to load cart:", error);
      return null;
    }
  },

  // Clear cart from Firestore
  clearCart: async (userId: string) => {
    try {
      const cartRef = doc(db, "carts", userId);
      await deleteDoc(cartRef);
      return true;
    } catch (error) {
      console.error("Failed to clear cart:", error);
      return false;
    }
  },

  // Sync cart (save and load)
  syncCart: async (userId: string, items: CartItem[]) => {
    await cartService.saveCart(userId, items);
    return await cartService.loadCart(userId);
  },
};
