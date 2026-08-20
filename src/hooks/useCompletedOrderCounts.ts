import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

type OrderItem = { product?: { id?: string } };
type OrderDocument = { items?: OrderItem[] };

export function useCompletedOrderCounts() {
  const [completedOrderCounts, setCompletedOrderCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const counts: Record<string, number> = {};

      snapshot.docs.forEach((orderDoc) => {
        const order = orderDoc.data() as OrderDocument;

        const productIds = new Set(
          (order.items || [])
            .map((item) => item.product?.id)
            .filter((productId): productId is string => Boolean(productId)),
        );

        productIds.forEach((productId) => {
          counts[productId] = (counts[productId] || 0) + 1;
        });
      });

      setCompletedOrderCounts(counts);
    }, (error) => {
      console.error("Failed to load completed order counts:", error);
      setCompletedOrderCounts({});
    });

    return unsubscribe;
  }, []);

  return completedOrderCounts;
}
