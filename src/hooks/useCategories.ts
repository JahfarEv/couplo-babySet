import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import type { Category, CategoryFilter } from "../types";
import { formatCategoryName, normalizeCategoryValue } from "../utils/categoryUtils";

function getSortTime(value: unknown): number {
  if (!value) return 0;

  if (
    typeof value === "object" &&
    value !== null &&
    "toMillis" in value &&
    typeof value.toMillis === "function"
  ) {
    return value.toMillis();
  }

  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          setCategories([]);
          setLoading(false);
          setError(null);
          return;
        }

        const items = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            const rawValue =
              data.value ??
              data.slug ??
              data.category ??
              data.name ??
              data.label ??
              doc.id;
            const value = normalizeCategoryValue(rawValue);
            const label = String(
              data.label ?? data.name ?? formatCategoryName(value)
            ).trim();

            return {
              id: doc.id,
              name: String(data.name ?? label).trim(),
              value: value as CategoryFilter,
              label,
              image: data.image ?? "",
              description: data.description ?? "",
              order: Number(data.order ?? 0),
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            } as Category;
          })
          .filter((category) => category.value && category.value !== "all")
          .sort((a, b) => {
            const orderDiff = (a.order ?? 0) - (b.order ?? 0);
            if (orderDiff !== 0) return orderDiff;

            return getSortTime(b.createdAt) - getSortTime(a.createdAt);
          });

        setCategories(items);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Firestore Error (Categories):", error);
        setError(error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { categories, loading, error };
}
