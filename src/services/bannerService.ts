import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export interface Banner {
  id: string;
  imageUrl: string;
  title?: string;
  alt?: string;
}

const toBannerItems = (id: string, data: Record<string, any>): Banner[] => {
  const imageValues = [
    data.image,
    data.imageUrl,
    ...(Array.isArray(data.images) ? data.images : []),
    ...(Array.isArray(data.imageUrls) ? data.imageUrls : []),
  ];

  return imageValues
    .map((value, index): Banner | null => {
      const imageUrl = typeof value === "string" ? value : value?.url || value?.imageUrl || value?.image;
      if (!imageUrl) return null;

      return {
        id: index === 0 ? id : `${id}-${index}`,
        imageUrl,
        title: value?.title || data.title || "",
        alt: value?.alt || data.alt || value?.title || data.title || "Couplo Baby Sets banner",
      };
    })
    .filter((banner): banner is Banner => Boolean(banner));
};

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
      const banners = toBannerItems(snapshot.id, data);

      if (!banners.length) {
        console.warn("Banner document found but has no 'image' field.");
        return null;
      }

      return banners[0];
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
      const homeSnap = await getDoc(doc(db, "banners", "home"));
      const banners: Banner[] = [];

      if (homeSnap.exists()) {
        banners.push(...toBannerItems(homeSnap.id, homeSnap.data()));
      }

      const snapshot = await getDocs(collection(db, "banners"));
      snapshot.forEach((docSnap) => {
        if (docSnap.id === "home") return;
        const data = docSnap.data();
        banners.push(...toBannerItems(docSnap.id, data));
      });

      return banners;
    } catch (error) {
      console.error("Error fetching banners:", error);
      return [];
    }
  },
};
