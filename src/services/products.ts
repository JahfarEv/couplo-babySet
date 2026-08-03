// In your user-side component
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import type { Product } from "../types";
import { products as fallbackProducts } from "../data";
import { normalizeCategoryValue } from "../utils/categoryUtils";

// Option 1: Real-time updates (like admin)
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((doc) => {
            const data = doc.data() as Partial<Product> & {
              createdAt?: unknown;
              images?: string[];
              colors?: Array<{ name: string; hex: string }>;
              sizes?: string[];
              includes?: string[];
              tags?: string[];
            };

            return {
              id: doc.id,
              name: data.name ?? "Untitled Product",
              category: normalizeCategoryValue(data.category ?? "babyset"),
              price: Number(data.price ?? 0),
              rating: Number(data.rating ?? 0),
              ratingCount: Number(data.ratingCount ?? 0),
              image: data.image ?? data.images?.[0] ?? fallbackProducts[0]?.image ?? "",
              images: data.images ?? [],
              description: data.description ?? "",
              includes: data.includes ?? [],
              tags: data.tags ?? [],
              isNew: Boolean(data.isNew),
              sizes: data.sizes ?? [],
              colors: data.colors ?? [],
            } satisfies Product;
          });

          setProducts(items);
        } else {
          setProducts([]);
        }
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Firestore Error:", error);
        setError(error);
        setProducts(fallbackProducts);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { products, loading, error };
}

