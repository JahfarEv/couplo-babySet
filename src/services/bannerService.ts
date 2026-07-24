import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export interface Banner {
  id: string;
  imageUrl: string;
  title?: string;
  alt?: string;
}

export const bannerService = {
  /**
   * Fetch the primary "home" banner from Firestore.
   * Collection: "banners" / Document: "home"
   * Fields used:
   *   - image: string   (required) — the image URL
   *   - title: string   (optional) — banner title
   *   - alt:   string   (optional) — image alt text
   */
  async getPrimaryBanner(): Promise<Banner | null> {
    try {
      const docRef = doc(db, "banners", "home");
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        console.warn("No 'home' document found in 'banners' collection.");
        return null;
      }

      const data = snapshot.data();
      const imageUrl = data.image || data.imageUrl || null;

      if (!imageUrl) {
        console.warn("Banner document found but has no 'image' field.");
        return null;
      }

      return {
        id: snapshot.id,
        imageUrl,
        title: data.title || "",
        alt: data.alt || data.title || "Couplo Baby Sets banner",
      };
    } catch (error) {
      console.error("Error fetching primary banner:", error);
      return null;
    }
  },

  /**
   * Fetch all banner documents from the "banners" collection.
   * Useful if you later add multiple banners (e.g. "home", "sale", etc.)
   */
  async getBanners(): Promise<Banner[]> {
    try {
      const snapshot = await getDocs(collection(db, "banners"));
      const banners: Banner[] = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const imageUrl = data.image || data.imageUrl || null;
        if (!imageUrl) return;
        banners.push({
          id: docSnap.id,
          imageUrl,
          title: data.title || "",
          alt: data.alt || data.title || "Couplo Baby Sets banner",
        });
      });

      return banners;
    } catch (error) {
      console.error("Error fetching banners:", error);
      return [];
    }
  },
};

