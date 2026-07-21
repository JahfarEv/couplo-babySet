// import { useEffect, useState } from "react";
// import { collection, onSnapshot, query } from "firebase/firestore";
// import { db } from "../firebase";
// import type { Category } from "../types";

// const defaultCategories: Category[] = [
//   { id: "babyset", value: "babyset", label: "Baby Sets", order: 1 },
//   { id: "accessories", value: "accessories", label: "Accessories", order: 2 },
//   { id: "tshirt", value: "tshirt", label: "T-Shirts", order: 3 },
//   { id: "cordset", value: "cordset", label: "Cord Sets", order: 4 },
// ];

// export function useCategories() {
//   const [categories, setCategories] = useState<Category[]>(defaultCategories);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const categoriesRef = collection(db, "categories");
//     const q = query(categoriesRef);

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         if (!snapshot.empty) {
//           const items = snapshot.docs
//             .map((doc) => {
//               const data = doc.data() as Partial<Category> & {
//                 value?: string;
//                 label?: string;
//                 order?: number;
//               };

//               const value = (data.value ?? doc.id) as Category["value"];
//               const label =
//                 data.label ??
//                 String(value)
//                   .replace(/([A-Z])/g, " $1")
//                   .replace(/^./, (char) => char.toUpperCase());

//               return {
//                 id: doc.id,
//                 value,
//                 label,
//                 order: data.order ?? 0,
//               } as Category;
//             })
//             .filter((category) => category.value !== "all")
//             .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

//           setCategories(items.length ? items : defaultCategories);
//         } else {
//           setCategories(defaultCategories);
//         }

//         setLoading(false);
//         setError(null);
//       },
//       (error) => {
//         console.error("Firestore categories snapshot failed:", error);
//         setError(error);
//         setCategories(defaultCategories);
//         setLoading(false);
//       }
//     );

//     return unsubscribe;
//   }, []);

//   return { categories, loading, error };
// }

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import type { Category, CategoryFilter } from "../types";
import { normalizeCategoryValue } from "../utils/categoryUtils";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("🚀 Fetching categories from Firebase...");
    
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log("📦 Categories loaded:", snapshot.size);
        
        if (snapshot.empty) {
          console.warn("⚠️ No categories found in Firestore");
          setCategories([]);
          setLoading(false);
          return;
        }

        const items = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(`📄 Category ${doc.id}:`, data);
          
          const rawValue =
            data.value ??
            data.slug ??
            data.category ??
            data.name ??
            doc.id;
          const value = normalizeCategoryValue(rawValue);
          
          return {
            id: doc.id,
            name: data.name || "Unnamed Category",
            value: value as CategoryFilter,
            label: data.name || "Unnamed Category",
            image: data.image || "",
            description: data.description || "",
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          } as Category;
        });

        console.log("✅ Final categories:", items);
        setCategories(items);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("❌ Firestore Error (Categories):", error);
        setError(error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { categories, loading, error };
}
