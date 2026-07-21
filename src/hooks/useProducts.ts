import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Product } from '../types'
import { normalizeCategoryValue } from '../utils/categoryUtils'

export function useUserProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log("📦 User products loaded:", snapshot.size);

        const items = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(`📄 Product ${doc.id}:`, data);
          
          return {
            id: doc.id,
            name: data.name || "Untitled Product",
            category: normalizeCategoryValue(data.category || "babyset"),
            price: Number(data.price) || 0,
            rating: Number(data.rating) || 0,
            ratingCount: Number(data.ratingCount) || 0,
            image: data.image || data.images?.[0] || "",
            images: data.images || [],
            description: data.description || "",
            isNew: Boolean(data.isNew),
            sizes: data.sizes || [],
            colors: data.colors || [],
            stock: Number(data.stock) || 0,
            status: data.status || "Draft",
            customizable: Boolean(data.customizable),
            sold: Number(data.sold) || 0,
          } as Product;
        });

        console.log("✅ Final products:", items);
        setProducts(items);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("❌ Firestore Error:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return {
    products,
    loading,
    error,
  };
}
