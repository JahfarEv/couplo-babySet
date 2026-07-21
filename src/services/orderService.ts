// import { doc, setDoc, getDoc, deleteDoc, collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
// import { db } from "../firebase";
// import { CartItem, User } from "../types";

// export interface Order {
//   id: string;
//   userId: string;
//   userEmail: string;
//   userName: string;
//   items: CartItem[];
//   subtotal: number;
//   total: number | string;
//   status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
//   date?: string;
//   orderDate: string;
//   whatsappMessage: string;
//   productName?: string;
//   qty?: number;
//   notes?: string;
//   statusColor?: string;
//   createdAt?: any;
//   updatedAt?: any;
// }

// export const orderService = {
//   // Create a new order
//   createOrder: async (user: User, cart: CartItem[], whatsappMessage: string, saveLocalStorage = true): Promise<Order | null> => {
//     try {
//       const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
//       const orderId = `CB-${Math.floor(1000 + Math.random() * 9000)}`;
//       const now = new Date();
//       const dateOptions: Intl.DateTimeFormatOptions = { month: "long", year: "numeric", day: "numeric" };
//       const formattedDate = now.toLocaleDateString("en-US", dateOptions);

//       const orderData: Order = {
//         id: orderId,
//         userId: user.id,
//         userEmail: user.email,
//         userName: user.name,
//         items: cart.map(item => ({
//           product: item.product,
//           quantity: item.quantity,
//           selectedSize: item.selectedSize || null,
//           selectedColor: item.selectedColor || null,
//         })),
//         productName: cart.map((item) => `${item.product.name} (x${item.quantity})`).join(", "),
//         qty: cart.reduce((sum, item) => sum + item.quantity, 0),
//         subtotal: subtotal,
//         total: subtotal,
//         status: 'pending',
//         statusColor: "bg-blue-100 text-blue-800 border-blue-200",
//         notes: "Awaiting WhatsApp confirmation from Couplo concierge.",
//         date: formattedDate,
//         orderDate: formattedDate,
//         whatsappMessage: whatsappMessage,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };

//       // Save to Firestore
//       const orderRef = await addDoc(collection(db, "orders"), orderData);
//       console.log("✅ Order created with ID:", orderRef.id);

//       // Also save to user's subcollection for easier querying
//       const userOrderRef = doc(db, "users", user.id, "orders", orderRef.id);
//       await setDoc(userOrderRef, {
//         ...orderData,
//         orderId: orderRef.id,
//       });

//       // Save to localStorage as fallback
//       if (saveLocalStorage) {
//         orderService.saveOrderToLocalStorage(user.id, {
//           ...orderData,
//           id: orderRef.id,
//           status: "pending",
//           total: `$${subtotal.toFixed(2)}`,
//         });
//       }

//       return {
//         ...orderData,
//         id: orderRef.id,
//       };
//     } catch (error) {
//       console.error("❌ Failed to create order:", error);
//       return null;
//     }
//   },

//   // Create a single item order (from customization)
//   createSingleOrder: async (user: User, product: any, quantity: number, customization: any, whatsappMessage: string, saveLocalStorage = true): Promise<Order | null> => {
//     try {
//       const total = product.price * quantity;
//       const orderId = `CB-${Math.floor(1000 + Math.random() * 9000)}`;
//       const now = new Date();
//       const dateOptions: Intl.DateTimeFormatOptions = { month: "long", year: "numeric", day: "numeric" };
//       const formattedDate = now.toLocaleDateString("en-US", dateOptions);

//       const orderData: Order = {
//         id: orderId,
//         userId: user.id,
//         userEmail: user.email,
//         userName: user.name,
//         items: [{
//           product: product,
//           quantity: quantity,
//           selectedSize: customization.selectedSize || null,
//           selectedColor: customization.selectedColor || null,
//         }],
//         productName: `${product.name} (x${quantity})`,
//         qty: quantity,
//         subtotal: total,
//         total: total,
//         status: 'pending',
//         statusColor: "bg-blue-100 text-blue-800 border-blue-200",
//         notes: "Awaiting WhatsApp confirmation from Couplo concierge.",
//         date: formattedDate,
//         orderDate: formattedDate,
//         whatsappMessage: whatsappMessage,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };

//       // Save to Firestore
//       const orderRef = await addDoc(collection(db, "orders"), orderData);
//       console.log("✅ Single order created with ID:", orderRef.id);

//       // Save to user's subcollection
//       const userOrderRef = doc(db, "users", user.id, "orders", orderRef.id);
//       await setDoc(userOrderRef, {
//         ...orderData,
//         orderId: orderRef.id,
//       });

//       // Save to localStorage as fallback
//       if (saveLocalStorage) {
//         orderService.saveOrderToLocalStorage(user.id, {
//           ...orderData,
//           id: orderRef.id,
//           status: "pending",
//           total: `$${total.toFixed(2)}`,
//         });
//       }

//       return {
//         ...orderData,
//         id: orderRef.id,
//       };
//     } catch (error) {
//       console.error("❌ Failed to create single order:", error);
//       return null;
//     }
//   },

//   // Get orders for a user
//   getUserOrders: async (userId: string): Promise<Order[]> => {
//     try {
//       const ordersRef = collection(db, "orders");
//       const q = query(
//         ordersRef,
//         where("userId", "==", userId),
//         orderBy("createdAt", "desc")
//       );
//       const querySnapshot = await getDocs(q);
      
//       const orders = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Order[];
      
//       console.log(`📦 Found ${orders.length} orders for user ${userId}`);
//       return orders;
//     } catch (error) {
//       console.error("❌ Failed to get user orders:", error);
//       return [];
//     }
//   },

//   // Update order status
//   updateOrderStatus: async (orderId: string, status: Order['status']) => {
//     try {
//       const orderRef = doc(db, "orders", orderId);
//       await setDoc(orderRef, {
//         status: status,
//         updatedAt: new Date().toISOString(),
//       }, { merge: true });
//       console.log(`✅ Order ${orderId} status updated to: ${status}`);
//       return true;
//     } catch (error) {
//       console.error("❌ Failed to update order status:", error);
//       return false;
//     }
//   },

//   // Get single order
//   getOrder: async (orderId: string): Promise<Order | null> => {
//     try {
//       const orderRef = doc(db, "orders", orderId);
//       const orderDoc = await getDoc(orderRef);
//       if (orderDoc.exists()) {
//         return { id: orderDoc.id, ...orderDoc.data() } as Order;
//       }
//       return null;
//     } catch (error) {
//       console.error("❌ Failed to get order:", error);
//       return null;
//     }
//   },

//   // Save order to localStorage as fallback
//   saveOrderToLocalStorage: (userId: string, order: Order) => {
//     try {
//       const storedOrdersKey = `couplo_orders_${userId}`;
//       const existingOrdersStr = localStorage.getItem(storedOrdersKey);
//       let orders = [];
//       if (existingOrdersStr) {
//         try {
//           orders = JSON.parse(existingOrdersStr);
//         } catch (e) {
//           orders = [];
//         }
//       }
//       orders.unshift(order);
//       localStorage.setItem(storedOrdersKey, JSON.stringify(orders));
//       console.log("✅ Order saved to localStorage as fallback");
//     } catch (error) {
//       console.error("❌ Failed to save order to localStorage:", error);
//     }
//   },

//   // Clear all orders for a user (admin only)
//   clearUserOrders: async (userId: string) => {
//     try {
//       const ordersRef = collection(db, "orders");
//       const q = query(ordersRef, where("userId", "==", userId));
//       const querySnapshot = await getDocs(q);
      
//       for (const doc of querySnapshot.docs) {
//         await deleteDoc(doc.ref);
//       }
//       console.log(`✅ Cleared all orders for user ${userId}`);
//       return true;
//     } catch (error) {
//       console.error("❌ Failed to clear orders:", error);
//       return false;
//     }
//   }
// };


// import { doc, setDoc, getDoc, deleteDoc, collection, addDoc, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
// import { db } from "../firebase";
// import { CartItem, User } from "../types";

// export interface Order {
//   id: string;
//   orderId?: string;   // add this line
//   userId: string;
//   userEmail: string;
//   userName: string;
//   items: CartItem[];
//   subtotal: number;
//   total: number | string;
//   status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
//   date?: string;
//   orderDate: string;
//   whatsappMessage: string;
//   productName?: string;
//   qty?: number;
//   notes?: string;
//   statusColor?: string;
//   createdAt?: any;
//   updatedAt?: any;
//   embroideryText?: string;
//   babyName?: string;
//   fontStyle?: string;
//   embroideryColor?: string;
//   giftWrap?: boolean;
//   giftMessage?: string;
//   specialNotes?: string;
// }

// export const orderService = {
//   // Create a new order from cart
//   createOrder: async (user: User, cart: CartItem[], whatsappMessage: string, saveLocalStorage = true): Promise<Order | null> => {
//     try {
//       console.log("🚀 Starting createOrder with:", { user, cartLength: cart.length, whatsappMessage });

//       if (!user || !user.id) {
//         console.error("❌ Invalid user data");
//         return null;
//       }

//       if (!cart || cart.length === 0) {
//         console.error("❌ Cart is empty");
//         return null;
//       }

//       const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
//       const now = new Date();
//       const formattedDate = now.toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric" });

//       // Extract embroidery details from first cart item
//     const firstItem = cart[0];
// const customization = firstItem?.customization;

// const embroideryText =
//   customization?.embroideredText ?? customization?.babyName ?? null;

// const babyName = customization?.babyName ?? null;
// const fontStyle = customization?.fontStyle ?? null;
// const embroideryColor = customization?.embroideryColor ?? null;
// const giftWrap = customization?.giftWrap ?? false;
// const giftMessage = customization?.giftMessage ?? null;
// const specialNotes = customization?.specialNotes ?? null;

//       console.log("📝 Extracted customization:", { embroideryText, babyName, fontStyle, embroideryColor });

//       // Prepare items
//       const items = cart.map(item => ({
//         product: item.product,
//         quantity: item.quantity,
//         selectedSize: item.selectedSize || null,
//         selectedColor: item.selectedColor || null,
//         customization: item.customization || null,
//         embroideredText: item.customization?.embroideredText || item.customization?.babyName || null,
//       }));

//       // Create order object
//       const orderData = {
//         userId: user.id,
//         userEmail: user.email || '',
//         userName: user.name || '',
//         items: items,
//         productName: cart.map((item) => `${item.product.name} (x${item.quantity})`).join(", "),
//         qty: cart.reduce((sum, item) => sum + item.quantity, 0),
//         subtotal: subtotal,
//         total: subtotal,
//         status: 'pending',
//         statusColor: "bg-blue-100 text-blue-800 border-blue-200",
//         notes: "Awaiting WhatsApp confirmation from Couplo concierge.",
//         date: formattedDate,
//         orderDate: formattedDate,
//         whatsappMessage: whatsappMessage || '',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         // Embroidery fields
//         embroideryText: embroideryText,
//         babyName: babyName,
//         fontStyle: fontStyle,
//         embroideryColor: embroideryColor,
//         giftWrap: giftWrap,
//         giftMessage: giftMessage,
//         specialNotes: specialNotes,
//       };

//       console.log("💾 Saving order data:", orderData);

//       // Save to Firestore
//       const docRef = await addDoc(collection(db, "orders"), orderData);
//       console.log("✅ Order created with ID:", docRef.id);

//       const completeOrder: Order = {
//         id: docRef.id,
//         ...orderData,
//         orderId: docRef.id,
//       };

//       // Save to user's subcollection
//       try {
//         const userOrderRef = doc(db, "users", user.id, "orders", docRef.id);
//         await setDoc(userOrderRef, completeOrder);
//         console.log("✅ Order saved to user subcollection");
//       } catch (error) {
//         console.warn("⚠️ Failed to save to user subcollection:", error);
//       }

//       // Save to localStorage
//       if (saveLocalStorage) {
//         try {
//           const storedOrdersKey = `couplo_orders_${user.id}`;
//           const existingOrdersStr = localStorage.getItem(storedOrdersKey);
//           let orders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
//           orders.unshift(completeOrder);
//           localStorage.setItem(storedOrdersKey, JSON.stringify(orders));
//           console.log("✅ Order saved to localStorage");
//         } catch (error) {
//           console.warn("⚠️ Failed to save to localStorage:", error);
//         }
//       }

//       return completeOrder;
//     } catch (error) {
//       console.error("❌ Failed to create order:", error);
//       return null;
//     }
//   },

//   // Create a single item order (direct order)
//   createSingleOrder: async (user: User, product: any, quantity: number, customization: any, whatsappMessage: string, saveLocalStorage = true): Promise<Order | null> => {
//     try {
//       console.log("🚀 Starting createSingleOrder with:", { 
//         user, 
//         productName: product?.name, 
//         quantity, 
//         customization,
//         whatsappMessage 
//       });

//       if (!user || !user.id) {
//         console.error("❌ Invalid user data");
//         return null;
//       }

//       if (!product) {
//         console.error("❌ Product is required");
//         return null;
//       }

//       const total = product.price * quantity;
//       const now = new Date();
//       const formattedDate = now.toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric" });

//       // Extract embroidery details
//       const embroideryText = customization?.embroideredText || customization?.babyName || null;
//       const babyName = customization?.babyName || null;
//       const fontStyle = customization?.fontStyle || null;
//       const embroideryColor = customization?.embroideryColor || null;
//       const giftWrap = customization?.giftWrap || false;
//       const giftMessage = customization?.giftMessage || null;
//       const specialNotes = customization?.specialNotes || null;

//       console.log("📝 Extracted customization:", { embroideryText, babyName, fontStyle, embroideryColor });

//       // Create cart item
//       const cartItem = {
//         product: product,
//         quantity: quantity,
//         selectedSize: customization?.selectedSize || null,
//         selectedColor: customization?.selectedColor || null,
//         customization: customization || null,
//         embroideredText: embroideryText,
//       };

//       // Create order object
//       const orderData = {
//         userId: user.id,
//         userEmail: user.email || '',
//         userName: user.name || '',
//         items: [cartItem],
//         productName: `${product.name} (x${quantity})`,
//         qty: quantity,
//         subtotal: total,
//         total: total,
//         status: 'pending',
//         statusColor: "bg-blue-100 text-blue-800 border-blue-200",
//         notes: "Awaiting WhatsApp confirmation from Couplo concierge.",
//         date: formattedDate,
//         orderDate: formattedDate,
//         whatsappMessage: whatsappMessage || '',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         // Embroidery fields
//         embroideryText: embroideryText,
//         babyName: babyName,
//         fontStyle: fontStyle,
//         embroideryColor: embroideryColor,
//         giftWrap: giftWrap,
//         giftMessage: giftMessage,
//         specialNotes: specialNotes,
//       };

//       console.log("💾 Saving order data:", orderData);

//       // Save to Firestore
//       const docRef = await addDoc(collection(db, "orders"), orderData);
//       console.log("✅ Single order created with ID:", docRef.id);

//       const completeOrder: Order = {
//         id: docRef.id,
//         ...orderData,
//         orderId: docRef.id,
//       };

//       // Save to user's subcollection
//       try {
//         const userOrderRef = doc(db, "users", user.id, "orders", docRef.id);
//         await setDoc(userOrderRef, completeOrder);
//         console.log("✅ Order saved to user subcollection");
//       } catch (error) {
//         console.warn("⚠️ Failed to save to user subcollection:", error);
//       }

//       // Save to localStorage
//       if (saveLocalStorage) {
//         try {
//           const storedOrdersKey = `couplo_orders_${user.id}`;
//           const existingOrdersStr = localStorage.getItem(storedOrdersKey);
//           let orders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
//           orders.unshift(completeOrder);
//           localStorage.setItem(storedOrdersKey, JSON.stringify(orders));
//           console.log("✅ Order saved to localStorage");
//         } catch (error) {
//           console.warn("⚠️ Failed to save to localStorage:", error);
//         }
//       }

//       return completeOrder;
//     } catch (error) {
//       console.error("❌ Failed to create single order:", error);
//       return null;
//     }
//   },

//   // Get orders for a user
//   getUserOrders: async (userId: string): Promise<Order[]> => {
//     try {
//       if (!userId) {
//         console.error("❌ User ID is required");
//         return [];
//       }

//       // First try to get from Firestore
//       try {
//         const ordersRef = collection(db, "orders");
//         const q = query(
//           ordersRef,
//           where("userId", "==", userId),
//           orderBy("createdAt", "desc")
//         );
//         const querySnapshot = await getDocs(q);
        
//         if (!querySnapshot.empty) {
//           const orders = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           })) as Order[];
//           console.log(`📦 Found ${orders.length} orders in Firestore for user ${userId}`);
//           return orders;
//         }
//       } catch (error) {
//         console.warn("⚠️ Failed to get orders from Firestore:", error);
//       }

//       // Fallback to localStorage
//       try {
//         const storedOrdersKey = `couplo_orders_${userId}`;
//         const ordersStr = localStorage.getItem(storedOrdersKey);
//         if (ordersStr) {
//           const orders = JSON.parse(ordersStr);
//           console.log(`📦 Found ${orders.length} orders in localStorage for user ${userId}`);
//           return orders;
//         }
//       } catch (error) {
//         console.warn("⚠️ Failed to get orders from localStorage:", error);
//       }

//       return [];
//     } catch (error) {
//       console.error("❌ Failed to get user orders:", error);
//       return [];
//     }
//   },

//   // Update order status
//   updateOrderStatus: async (orderId: string, status: Order['status']) => {
//     try {
//       if (!orderId) {
//         console.error("❌ Order ID is required");
//         return false;
//       }

//       const orderRef = doc(db, "orders", orderId);
//       await setDoc(orderRef, {
//         status: status,
//         updatedAt: new Date().toISOString(),
//       }, { merge: true });
//       console.log(`✅ Order ${orderId} status updated to: ${status}`);
//       return true;
//     } catch (error) {
//       console.error("❌ Failed to update order status:", error);
//       return false;
//     }
//   },

//   // Get single order
//   getOrder: async (orderId: string): Promise<Order | null> => {
//     try {
//       if (!orderId) {
//         console.error("❌ Order ID is required");
//         return null;
//       }

//       const orderRef = doc(db, "orders", orderId);
//       const orderDoc = await getDoc(orderRef);
//       if (orderDoc.exists()) {
//         const data = orderDoc.data();
//         return { id: orderDoc.id, ...data } as Order;
//       }
//       return null;
//     } catch (error) {
//       console.error("❌ Failed to get order:", error);
//       return null;
//     }
//   },

//   // Delete a single order
//   deleteOrder: async (orderId: string): Promise<boolean> => {
//     try {
//       if (!orderId) {
//         console.error("❌ Order ID is required");
//         return false;
//       }

//       const orderRef = doc(db, "orders", orderId);
//       await deleteDoc(orderRef);
//       console.log(`✅ Order ${orderId} deleted successfully`);
//       return true;
//     } catch (error) {
//       console.error("❌ Failed to delete order:", error);
//       return false;
//     }
//   }
// };








import { doc, setDoc, getDoc, deleteDoc, collection, addDoc, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { CartItem, User } from "../types";

export interface Order {
  id: string;
  orderId?: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  subtotal: number;
  total: number | string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date?: string;
  orderDate: string;
  whatsappMessage: string;
  productName?: string;
  qty?: number;
  notes?: string;
  statusColor?: string;
  createdAt?: any;
  updatedAt?: any;
  embroideryText?: string;
  babyName?: string;
  fontStyle?: string;
  embroideryColor?: string;
  giftWrap?: boolean;
  giftMessage?: string;
  specialNotes?: string;
}

// Helper function to convert null to undefined
const nullToUndefined = <T>(value: T | null | undefined): T | undefined => {
  return value === null ? undefined : value;
};

// Helper to safely get embroidery text
const getEmbroideryText = (customization: any): string | undefined => {
  if (!customization) return undefined;
  return nullToUndefined(customization.embroideredText || customization.babyName);
};

export const orderService = {
  // Create a new order from cart
  createOrder: async (user: User, cart: CartItem[], whatsappMessage: string, saveLocalStorage = true): Promise<Order | null> => {
    try {
      console.log("🚀 Starting createOrder with:", { user, cartLength: cart.length, whatsappMessage });

      if (!user || !user.id) {
        console.error("❌ Invalid user data");
        return null;
      }

      if (!cart || cart.length === 0) {
        console.error("❌ Cart is empty");
        return null;
      }

      const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric" });

      // Extract embroidery details from first cart item with proper null handling
      const firstItem = cart[0];
      const customization = firstItem?.customization;

      const embroideryText = getEmbroideryText(customization);
      const babyName = nullToUndefined(customization?.babyName);
      const fontStyle = nullToUndefined(customization?.fontStyle);
      const embroideryColor = nullToUndefined(customization?.embroideryColor);
      const giftWrap = customization?.giftWrap ?? false;
      const giftMessage = nullToUndefined(customization?.giftMessage);
      const specialNotes = nullToUndefined(customization?.specialNotes);

      console.log("📝 Extracted customization:", { embroideryText, babyName, fontStyle, embroideryColor });

      // Prepare items with proper null handling - convert null to undefined
      const items: CartItem[] = cart.map(item => ({
        product: item.product,
        quantity: item.quantity,
        selectedSize: nullToUndefined(item.selectedSize),
        selectedColor: nullToUndefined(item.selectedColor),
        customization: item.customization ? {
          ...item.customization,
          embroideredText: getEmbroideryText(item.customization),
        } : undefined,
        embroideredText: getEmbroideryText(item.customization),
      }));

      // Create order object with proper types (all optional fields as undefined, not null)
      const orderData = {
        userId: user.id,
        userEmail: user.email || '',
        userName: user.name || '',
        items: items,
        productName: cart.map((item) => `${item.product.name} (x${item.quantity})`).join(", "),
        qty: cart.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: subtotal,
        total: subtotal,
        status: 'pending' as const,
        statusColor: "bg-blue-100 text-blue-800 border-blue-200",
        notes: "Awaiting WhatsApp confirmation from Couplo concierge.",
        date: formattedDate,
        orderDate: formattedDate,
        whatsappMessage: whatsappMessage || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // All optional fields should be undefined, not null
        embroideryText: embroideryText,
        babyName: babyName,
        fontStyle: fontStyle,
        embroideryColor: embroideryColor,
        giftWrap: giftWrap,
        giftMessage: giftMessage,
        specialNotes: specialNotes,
      };

      console.log("💾 Saving order data:", orderData);

      // Save to Firestore
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("✅ Order created with ID:", docRef.id);

      // Create complete order with proper type
      const completeOrder: Order = {
        id: docRef.id,
        ...orderData,
        orderId: docRef.id,
        status: orderData.status,
      };

      // Save to user's subcollection
      try {
        const userOrderRef = doc(db, "users", user.id, "orders", docRef.id);
        await setDoc(userOrderRef, completeOrder);
        console.log("✅ Order saved to user subcollection");
      } catch (error) {
        console.warn("⚠️ Failed to save to user subcollection:", error);
      }

      // Save to localStorage
      if (saveLocalStorage) {
        try {
          const storedOrdersKey = `couplo_orders_${user.id}`;
          const existingOrdersStr = localStorage.getItem(storedOrdersKey);
          let orders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
          orders.unshift(completeOrder);
          localStorage.setItem(storedOrdersKey, JSON.stringify(orders));
          console.log("✅ Order saved to localStorage");
        } catch (error) {
          console.warn("⚠️ Failed to save to localStorage:", error);
        }
      }

      return completeOrder;
    } catch (error) {
      console.error("❌ Failed to create order:", error);
      return null;
    }
  },

  // Create a single item order (direct order)
  createSingleOrder: async (user: User, product: any, quantity: number, customization: any, whatsappMessage: string, saveLocalStorage = true): Promise<Order | null> => {
    try {
      console.log("🚀 Starting createSingleOrder with:", { 
        user: user?.id, 
        productName: product?.name, 
        quantity, 
        customization,
        whatsappMessage 
      });

      if (!user || !user.id) {
        console.error("❌ Invalid user data");
        return null;
      }

      if (!product) {
        console.error("❌ Product is required");
        return null;
      }

      const total = product.price * quantity;
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric" });

      // Extract embroidery details with proper null handling
      const embroideryText = getEmbroideryText(customization);
      const babyName = nullToUndefined(customization?.babyName);
      const fontStyle = nullToUndefined(customization?.fontStyle);
      const embroideryColor = nullToUndefined(customization?.embroideryColor);
      const giftWrap = customization?.giftWrap ?? false;
      const giftMessage = nullToUndefined(customization?.giftMessage);
      const specialNotes = nullToUndefined(customization?.specialNotes);

      console.log("📝 Extracted customization:", { embroideryText, babyName, fontStyle, embroideryColor });

      // Create cart item with proper null handling
      const cartItem: CartItem = {
        product: product,
        quantity: quantity,
        selectedSize: nullToUndefined(customization?.selectedSize),
        selectedColor: nullToUndefined(customization?.selectedColor),
        customization: customization ? {
          ...customization,
          embroideredText: embroideryText,
          babyName: babyName,
          fontStyle: fontStyle,
          embroideryColor: embroideryColor,
          giftWrap: giftWrap,
          giftMessage: giftMessage,
          specialNotes: specialNotes,
        } : undefined,
        embroideredText: embroideryText,
      };

      // Create order object with proper types (all optional fields as undefined, not null)
      const orderData = {
        userId: user.id,
        userEmail: user.email || '',
        userName: user.name || '',
        items: [cartItem],
        productName: `${product.name} (x${quantity})`,
        qty: quantity,
        subtotal: total,
        total: total,
        status: 'pending' as const,
        statusColor: "bg-blue-100 text-blue-800 border-blue-200",
        notes: "Awaiting WhatsApp confirmation from Couplo concierge.",
        date: formattedDate,
        orderDate: formattedDate,
        whatsappMessage: whatsappMessage || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // All optional fields should be undefined, not null
        embroideryText: embroideryText,
        babyName: babyName,
        fontStyle: fontStyle,
        embroideryColor: embroideryColor,
        giftWrap: giftWrap,
        giftMessage: giftMessage,
        specialNotes: specialNotes,
      };

      console.log("💾 Saving order data:", orderData);

      // Save to Firestore
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("✅ Single order created with ID:", docRef.id);

      // Create complete order with proper type
      const completeOrder: Order = {
        id: docRef.id,
        ...orderData,
        orderId: docRef.id,
        status: orderData.status,
      };

      // Save to user's subcollection
      try {
        const userOrderRef = doc(db, "users", user.id, "orders", docRef.id);
        await setDoc(userOrderRef, completeOrder);
        console.log("✅ Order saved to user subcollection");
      } catch (error) {
        console.warn("⚠️ Failed to save to user subcollection:", error);
      }

      // Save to localStorage
      if (saveLocalStorage) {
        try {
          const storedOrdersKey = `couplo_orders_${user.id}`;
          const existingOrdersStr = localStorage.getItem(storedOrdersKey);
          let orders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
          orders.unshift(completeOrder);
          localStorage.setItem(storedOrdersKey, JSON.stringify(orders));
          console.log("✅ Order saved to localStorage");
        } catch (error) {
          console.warn("⚠️ Failed to save to localStorage:", error);
        }
      }

      return completeOrder;
    } catch (error) {
      console.error("❌ Failed to create single order:", error);
      return null;
    }
  },

  // Get orders for a user
  getUserOrders: async (userId: string): Promise<Order[]> => {
    try {
      if (!userId) {
        console.error("❌ User ID is required");
        return [];
      }

      // First try to get from Firestore
      try {
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", userId),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const orders = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              orderId: doc.id,
              status: data.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
              // Convert null to undefined for optional fields
              embroideryText: nullToUndefined(data.embroideryText),
              babyName: nullToUndefined(data.babyName),
              fontStyle: nullToUndefined(data.fontStyle),
              embroideryColor: nullToUndefined(data.embroideryColor),
              giftMessage: nullToUndefined(data.giftMessage),
              specialNotes: nullToUndefined(data.specialNotes),
            } as Order;
          });
          console.log(`📦 Found ${orders.length} orders in Firestore for user ${userId}`);
          return orders;
        }
      } catch (error) {
        console.warn("⚠️ Failed to get orders from Firestore:", error);
      }

      // Fallback to localStorage
      try {
        const storedOrdersKey = `couplo_orders_${userId}`;
        const ordersStr = localStorage.getItem(storedOrdersKey);
        if (ordersStr) {
          const orders = JSON.parse(ordersStr);
          console.log(`📦 Found ${orders.length} orders in localStorage for user ${userId}`);
          return orders;
        }
      } catch (error) {
        console.warn("⚠️ Failed to get orders from localStorage:", error);
      }

      return [];
    } catch (error) {
      console.error("❌ Failed to get user orders:", error);
      return [];
    }
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: Order['status']) => {
    try {
      if (!orderId) {
        console.error("❌ Order ID is required");
        return false;
      }

      const orderRef = doc(db, "orders", orderId);
      await setDoc(orderRef, {
        status: status,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      console.log(`✅ Order ${orderId} status updated to: ${status}`);
      return true;
    } catch (error) {
      console.error("❌ Failed to update order status:", error);
      return false;
    }
  },

  // Get single order
  getOrder: async (orderId: string): Promise<Order | null> => {
    try {
      if (!orderId) {
        console.error("❌ Order ID is required");
        return null;
      }

      const orderRef = doc(db, "orders", orderId);
      const orderDoc = await getDoc(orderRef);
      if (orderDoc.exists()) {
        const data = orderDoc.data();
        return { 
          id: orderDoc.id, 
          ...data,
          orderId: orderDoc.id,
          status: data.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
          // Convert null to undefined for optional fields
          embroideryText: nullToUndefined(data.embroideryText),
          babyName: nullToUndefined(data.babyName),
          fontStyle: nullToUndefined(data.fontStyle),
          embroideryColor: nullToUndefined(data.embroideryColor),
          giftMessage: nullToUndefined(data.giftMessage),
          specialNotes: nullToUndefined(data.specialNotes),
        } as Order;
      }
      return null;
    } catch (error) {
      console.error("❌ Failed to get order:", error);
      return null;
    }
  },

  // Delete a single order
  deleteOrder: async (orderId: string): Promise<boolean> => {
    try {
      if (!orderId) {
        console.error("❌ Order ID is required");
        return false;
      }

      const orderRef = doc(db, "orders", orderId);
      await deleteDoc(orderRef);
      console.log(`✅ Order ${orderId} deleted successfully`);
      return true;
    } catch (error) {
      console.error("❌ Failed to delete order:", error);
      return false;
    }
  }
};