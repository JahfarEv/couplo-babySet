import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { ProductReview } from "../types/index";

const REVIEWS_COLLECTION = "reviews";

// Helper to remove all undefined fields recursively so Firestore doesn't reject document
const cleanForFirestore = <T>(obj: T): T => {
  if (obj === null || obj === undefined) return obj;
  return JSON.parse(JSON.stringify(obj));
};


export const reviewService = {
  /**
   * Fetch all reviews for a specific product
   */
  async getReviewsByProduct(productId: string): Promise<ProductReview[]> {
    try {
      const q = query(
        collection(db, REVIEWS_COLLECTION),
        where("productId", "==", productId),
        orderBy("createdAt", "desc")
      );
      
      const snapshot = await getDocs(q);
      
      const reviews: ProductReview[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        reviews.push({
          id: doc.id,
          productId: data.productId,
          userId: data.userId,
          userName: data.userName,
          rating: data.rating,
          comment: data.comment,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        });
      });
      
      return reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Fallback if index is not created yet (orderBy sometimes requires composite index)
      try {
        console.log("Attempting fallback fetch without orderBy...");
        const fallbackQ = query(
          collection(db, REVIEWS_COLLECTION),
          where("productId", "==", productId)
        );
        const fallbackSnapshot = await getDocs(fallbackQ);
        const fallbackReviews: ProductReview[] = [];
        fallbackSnapshot.forEach((doc) => {
          const data = doc.data();
          fallbackReviews.push({
            id: doc.id,
            productId: data.productId,
            userId: data.userId,
            userName: data.userName,
            rating: data.rating,
            comment: data.comment,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          });
        });
        // Sort manually
        return fallbackReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } catch (fallbackError) {
        console.error("Fallback fetch also failed:", fallbackError);
        return [];
      }
    }
  },

  /**
   * Add a new review for a product
   */
  async addReview(reviewData: Omit<ProductReview, "id" | "createdAt">): Promise<ProductReview | null> {
    try {
      const cleanData = cleanForFirestore(reviewData);
      const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), {
        ...cleanData,
        createdAt: serverTimestamp(),
      });
      
      return {
        id: docRef.id,
        ...reviewData,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error adding review:", error);
      return null;
    }
  },

  /**
   * Fetch most recent reviews across all products
   */
  async getRecentReviews(limitCount: number = 10): Promise<ProductReview[]> {
    try {
      const q = query(
        collection(db, REVIEWS_COLLECTION),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );
      
      const snapshot = await getDocs(q);
      
      const reviews: ProductReview[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        reviews.push({
          id: doc.id,
          productId: data.productId,
          userId: data.userId,
          userName: data.userName,
          rating: data.rating,
          comment: data.comment,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        });
      });
      
      return reviews;
    } catch (error) {
      console.error("Error fetching recent reviews:", error);
      
      // Fallback if index isn't ready
      try {
        console.log("Attempting fallback fetch for recent reviews without orderBy...");
        const fallbackQ = query(collection(db, REVIEWS_COLLECTION), limit(limitCount * 2));
        const fallbackSnapshot = await getDocs(fallbackQ);
        const fallbackReviews: ProductReview[] = [];
        fallbackSnapshot.forEach((doc) => {
          const data = doc.data();
          fallbackReviews.push({
            id: doc.id,
            productId: data.productId,
            userId: data.userId,
            userName: data.userName,
            rating: data.rating,
            comment: data.comment,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          });
        });
        
        return fallbackReviews
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, limitCount);
      } catch (fallbackError) {
        console.error("Fallback fetch for recent reviews also failed:", fallbackError);
        return [];
      }
    }
  }
};
