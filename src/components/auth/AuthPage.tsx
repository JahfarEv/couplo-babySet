// import React, { useState, useEffect } from "react";
// import { User } from "../../types";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   Eye,
//   EyeOff,
//   User as UserIcon,
//   Mail,
//   Phone,
//   Lock,
//   ArrowLeft,
//   ClipboardList,
//   ShieldCheck,
//   LogOut,
//   Loader2,
//   Sparkles,
//   RefreshCw,
//   Trash2,
// } from "lucide-react";
// import {
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   updateProfile,
//   signOut,
// } from "firebase/auth";
// import {
//   doc,
//   setDoc,
//   getDoc,
//   collection,
//   query,
//   where,
//   getDocs,
//   orderBy,
// } from "firebase/firestore";
// import { auth, db } from "../../firebase";

// interface AuthPageProps {
//   currentUser: User | null;
//   onLogin: (user: User) => void;
//   onLogout: () => void;
//   onShowToast: (message: string, type?: "success" | "info" | "error") => void;
//   onBackToHome: () => void;
// }

// type AuthTab = "login" | "register" | "forgot";

// function getAuthErrorMessage(error: unknown) {
//   const code =
//     typeof error === "object" && error && "code" in error
//       ? String((error as { code?: string }).code)
//       : "";

//   if (
//     code === "auth/invalid-credential" ||
//     code === "auth/wrong-password" ||
//     code === "auth/user-not-found"
//   ) {
//     return "Invalid email or password";
//   }
//   if (code === "auth/email-already-in-use") return "Email already registered";
//   if (code === "auth/weak-password")
//     return "Password must be at least 6 characters";
//   if (code === "auth/invalid-email")
//     return "Please enter a valid email address";
//   if (code === "auth/too-many-requests")
//     return "Too many attempts. Please try again later";
//   if (code === "auth/network-request-failed")
//     return "Network error. Please check your connection";

//   return "Something went wrong. Please try again";
// }

// export default function AuthPage({
//   currentUser,
//   onLogin,
//   onLogout,
//   onShowToast,
//   onBackToHome,
// }: AuthPageProps) {
//   const [tab, setTab] = useState<AuthTab>("login");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Form Fields
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const [registerName, setRegisterName] = useState("");
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerPhone, setRegisterPhone] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");
//   const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

//   const [forgotEmail, setForgotEmail] = useState("");

//   // Orders state
//   const [orders, setOrders] = useState<any[]>([]);
//   const [ordersLoading, setOrdersLoading] = useState(false);

//   // Fetch orders from Firestore when user logs in
//   useEffect(() => {
//     if (currentUser) {
//       fetchUserOrders(currentUser.id);
//     } else {
//       setOrders([]);
//     }
//   }, [currentUser]);

//   // ✅ Fixed: Better logging of orders
//   useEffect(() => {
//     console.log("📊 Current orders count:", orders.length);
//     console.log("📋 Orders data:", orders);
//   }, [orders]);

//   const fetchUserOrders = async (userId: string) => {
//     try {
//       setOrdersLoading(true);
//       console.log("📦 Fetching orders for user:", userId);

//       let fetchedOrders: any[] = [];

//       // METHOD 1: Try root orders collection
//       try {
//         console.log("🔍 Querying root orders collection...");
//         const ordersRef = collection(db, "orders");
//         const q = query(
//           ordersRef,
//           where("userId", "==", userId),
//           orderBy("createdAt", "desc"),
//         );
//         const querySnapshot = await getDocs(q);

//         fetchedOrders = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         console.log("✅ Orders from root collection:", fetchedOrders.length);
//       } catch (rootError) {
//         console.warn("⚠️ Failed from root collection:", rootError);
//       }

//       // If no orders found with userId filter, try getting ALL orders and filter manually
//       if (fetchedOrders.length === 0) {
//         try {
//           console.log("🔍 Fetching ALL orders (fallback)...");
//           const ordersRef = collection(db, "orders");
//           const querySnapshot = await getDocs(ordersRef);

//           // Filter orders manually
//           const allOrders = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));

//           // Check if any order has userId that matches OR if the order might be associated with this user
//           // This is a fallback - you might want to check other fields like userEmail
//           const matchedOrders = allOrders.filter((order) => {
//             // Check if userId matches
//             if (order.userId === userId) return true;
//             // Check if userEmail matches current user's email
//             if (order.userEmail === currentUser?.email) return true;
//             // Check if userName matches current user's name
//             if (order.userName === currentUser?.name) return true;
//             return false;
//           });

//           fetchedOrders = matchedOrders;
//           console.log("✅ Orders from manual filter:", fetchedOrders.length);
//         } catch (error) {
//           console.warn("⚠️ Failed to fetch all orders:", error);
//         }
//       }

//       // If no orders in root, try user subcollection
//       if (fetchedOrders.length === 0) {
//         try {
//           console.log("🔍 Querying user subcollection...");
//           const userOrdersRef = collection(db, "users", userId, "orders");
//           const q = query(userOrdersRef, orderBy("createdAt", "desc"));
//           const querySnapshot = await getDocs(q);

//           fetchedOrders = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));

//           console.log(
//             "✅ Orders from user subcollection:",
//             fetchedOrders.length,
//           );
//         } catch (subError) {
//           console.warn("⚠️ Failed from subcollection:", subError);
//         }
//       }

//       // ✅ Fixed: Better filtering for welcome orders
//       const filteredOrders = fetchedOrders.filter((order) => {
//         // Skip if no data
//         if (!order) return false;

//         const status = order.status || "";
//         const isWelcome =
//           status === "Welcome" ||
//           status === "welcome" ||
//           status === "Welcome Order" ||
//           order.id?.includes("welcome") ||
//           order.id?.includes("Welcome") ||
//           order.productName?.toLowerCase().includes("welcome") ||
//           order.notes?.toLowerCase().includes("welcome");
//         return !isWelcome;
//       });

//       console.log("📊 Orders before filtering:", fetchedOrders.length);
//       console.log("📊 Orders after filtering:", filteredOrders.length);

//       // Log the actual orders for debugging
//       if (filteredOrders.length > 0) {
//         console.log("📋 First order:", filteredOrders[0]);
//       }

//       setOrders(filteredOrders);

//       // Save to localStorage as cache
//       if (filteredOrders.length > 0) {
//         localStorage.setItem(
//           `couplo_orders_${userId}`,
//           JSON.stringify(filteredOrders),
//         );
//         console.log("💾 Orders saved to localStorage:", filteredOrders.length);
//       } else {
//         // Clear localStorage if no orders
//         localStorage.removeItem(`couplo_orders_${userId}`);
//       }
//     } catch (error) {
//       console.error("❌ Failed to fetch orders:", error);

//       // Try localStorage as fallback
//       try {
//         const storedOrders = localStorage.getItem(`couplo_orders_${userId}`);
//         if (storedOrders) {
//           const parsedOrders = JSON.parse(storedOrders);
//           console.log("📦 Orders from localStorage:", parsedOrders.length);
//           setOrders(parsedOrders);
//         } else {
//           setOrders([]);
//         }
//       } catch (localError) {
//         console.warn("⚠️ No orders in localStorage:", localError);
//         setOrders([]);
//       }
//     } finally {
//       setOrdersLoading(false);
//     }
//   };
//   const refreshOrders = () => {
//     if (currentUser) {
//       fetchUserOrders(currentUser.id);
//       onShowToast("Refreshing orders...", "info");
//     }
//   };

//   const clearCache = () => {
//     if (currentUser) {
//       try {
//         localStorage.removeItem(`couplo_orders_${currentUser.id}`);
//         onShowToast("Cache cleared", "success");
//         fetchUserOrders(currentUser.id);
//       } catch (error) {
//         console.error("❌ Failed to clear cache:", error);
//         onShowToast("Failed to clear cache", "error");
//       }
//     }
//   };

//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!loginEmail || !loginPassword) {
//       onShowToast("Please fill in all fields", "info");
//       return;
//     }

//     try {
//       setLoading(true);
//       const credential = await signInWithEmailAndPassword(
//         auth,
//         loginEmail,
//         loginPassword,
//       );
//       const firebaseUser = credential.user;

//       const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
//       let userData = userDoc.data() as User | undefined;

//       const loggedUser: User = {
//         id: firebaseUser.uid,
//         name:
//           userData?.name ||
//           firebaseUser.displayName ||
//           firebaseUser.email?.split("@")[0] ||
//           "Customer",
//         email: firebaseUser.email || loginEmail,
//         phone: userData?.phone || firebaseUser.phoneNumber || undefined,
//         joinedDate:
//           userData?.joinedDate ||
//           (firebaseUser.metadata.creationTime
//             ? new Date(firebaseUser.metadata.creationTime).toLocaleDateString(
//                 "en-US",
//                 { month: "long", year: "numeric", day: "numeric" },
//               )
//             : undefined),
//       };

//       onLogin(loggedUser);
//       onShowToast(`Welcome back, ${loggedUser.name}!`, "success");

//       setLoginEmail("");
//       setLoginPassword("");
//     } catch (error) {
//       onShowToast(getAuthErrorMessage(error), "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegisterSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (
//       !registerName ||
//       !registerEmail ||
//       !registerPassword ||
//       !registerConfirmPassword
//     ) {
//       onShowToast("Please fill in all required fields", "info");
//       return;
//     }

//     if (registerPassword.length < 6) {
//       onShowToast("Password must be at least 6 characters", "info");
//       return;
//     }

//     if (registerPassword !== registerConfirmPassword) {
//       onShowToast("Passwords do not match", "info");
//       return;
//     }

//     try {
//       setLoading(true);
//       const today = new Date();
//       const options: Intl.DateTimeFormatOptions = {
//         month: "long",
//         year: "numeric",
//         day: "numeric",
//       };
//       const formattedDate = today.toLocaleDateString("en-US", options);

//       const credential = await createUserWithEmailAndPassword(
//         auth,
//         registerEmail,
//         registerPassword,
//       );
//       const firebaseUser = credential.user;

//       await updateProfile(firebaseUser, { displayName: registerName });

//       const loggedUser: User = {
//         id: firebaseUser.uid,
//         name: registerName,
//         email: registerEmail,
//         phone: registerPhone || "Not provided",
//         joinedDate: formattedDate,
//       };

//       await setDoc(doc(db, "users", firebaseUser.uid), {
//         ...loggedUser,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       });

//       onLogin(loggedUser);
//       onShowToast("Account created successfully! 🎉", "success");

//       setRegisterName("");
//       setRegisterEmail("");
//       setRegisterPhone("");
//       setRegisterPassword("");
//       setRegisterConfirmPassword("");
//     } catch (error) {
//       onShowToast(getAuthErrorMessage(error), "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!forgotEmail) {
//       onShowToast("Please enter your email address", "info");
//       return;
//     }

//     try {
//       setLoading(true);
//       await sendPasswordResetEmail(auth, forgotEmail);
//       onShowToast("Password reset instructions sent to your email", "success");
//       setForgotEmail("");
//       setTab("login");
//     } catch (error) {
//       onShowToast(getAuthErrorMessage(error), "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogoutUser = async () => {
//     try {
//       await signOut(auth);
//       onLogout();
//       onShowToast("Logged out successfully", "success");
//       onBackToHome();
//     } catch (error) {
//       onShowToast("Failed to log out", "error");
//     }
//   };

//   const formatTotal = (order: any) => {
//     if (typeof order.total === "number") {
//       return `$${order.total.toFixed(2)}`;
//     }
//     if (
//       order.total &&
//       typeof order.total === "string" &&
//       order.total.startsWith("$")
//     ) {
//       return order.total;
//     }
//     if (order.subtotal && typeof order.subtotal === "number") {
//       return `$${order.subtotal.toFixed(2)}`;
//     }
//     return "$0.00";
//   };

//   return (
//     <div
//       id="auth-page-root"
//       className="min-h-[80vh] flex flex-col md:flex-row items-stretch bg-background"
//     >
//       {currentUser ? (
//         // User Dashboard
//         <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16">
//           <div className="flex flex-col md:flex-row gap-8">
//             {/* Left Column: Profile Card */}
//             <div className="w-full md:w-1/3">
//               <div className="bg-white rounded-3xl p-8 shadow-xl border border-primary/5 space-y-6">
//                 <div className="flex flex-col items-center text-center pb-6 border-b border-primary/10">
//                   <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 font-serif text-3xl font-bold">
//                     {currentUser.name?.charAt(0).toUpperCase() || "U"}
//                   </div>
//                   <h2 className="text-2xl font-serif font-bold text-gray-900">
//                     {currentUser.name}
//                   </h2>
//                   <p className="text-sm text-outline mt-1">Valued Customer</p>
//                 </div>

//                 <div className="space-y-4 text-sm">
//                   <div className="flex justify-between py-1 border-b border-primary/5">
//                     <span className="text-outline">Email Address</span>
//                     <span className="font-semibold text-gray-800">
//                       {currentUser.email}
//                     </span>
//                   </div>
//                   <div className="flex justify-between py-1 border-b border-primary/5">
//                     <span className="text-outline">WhatsApp / Phone</span>
//                     <span className="font-semibold text-gray-800">
//                       {currentUser.phone || "Not specified"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between py-1 border-b border-primary/5">
//                     <span className="text-outline">Member Since</span>
//                     <span className="font-semibold text-gray-800">
//                       {currentUser.joinedDate || "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between py-1 border-b border-primary/5">
//                     <span className="text-outline">Total Orders</span>
//                     <span className="font-semibold text-gray-800">
//                       {orders.length}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="pt-4 flex flex-col gap-3">
//                   <button
//                     onClick={onBackToHome}
//                     className="w-full py-3 bg-primary/10 hover:bg-primary/15 text-primary text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
//                   >
//                     <ArrowLeft className="w-4 h-4" />
//                     Back to Shopping
//                   </button>
//                   <button
//                     onClick={clearCache}
//                     className="w-full py-3 bg-orange-50 text-orange-600 hover:bg-orange-100 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Clear Cache
//                   </button>
//                   <button
//                     onClick={handleLogoutUser}
//                     className="w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     Sign Out
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column: Order History */}
//             <div className="w-full md:w-2/3 space-y-6">
//               <div className="bg-white rounded-3xl p-8 shadow-xl border border-primary/5">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-2">
//                     <Sparkles className="w-5 h-5 text-primary" />
//                     <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900">
//                       Welcome Back, {currentUser.name?.split(" ")[0] || "User"}!
//                     </h3>
//                   </div>
//                   <button
//                     onClick={refreshOrders}
//                     disabled={ordersLoading}
//                     className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-all cursor-pointer disabled:opacity-50"
//                     title="Refresh orders"
//                   >
//                     <RefreshCw
//                       className={`w-4 h-4 ${ordersLoading ? "animate-spin" : ""}`}
//                     />
//                   </button>
//                 </div>
//                 <p className="text-sm md:text-base text-gray-600 leading-relaxed">
//                   Welcome to your Couplo Baby Sets dashboard. Here you can
//                   review your custom clothing configurations, check order
//                   details, or initiate instant support via our WhatsApp
//                   concierge service.
//                 </p>
//               </div>

//               {/* Order history */}
//               <div className="bg-white rounded-3xl p-8 shadow-xl border border-primary/5">
//                 <div className="flex items-center gap-3 mb-6">
//                   <ClipboardList className="w-5 h-5 text-primary" />
//                   <h3 className="text-lg md:text-xl font-serif font-bold text-gray-900">
//                     Order History {orders.length > 0 && `(${orders.length})`}
//                   </h3>
//                 </div>

//                 {ordersLoading ? (
//                   <div className="py-10 text-center flex flex-col items-center justify-center gap-3">
//                     <Loader2 className="w-8 h-8 text-primary animate-spin" />
//                     <p className="text-sm text-outline">
//                       Loading your orders...
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-6">
//                     {orders.length === 0 ? (
//                       <div className="py-10 text-center flex flex-col items-center justify-center gap-3">
//                         <p className="text-sm text-outline">
//                           You haven't placed any orders yet.
//                         </p>
//                         <button
//                           onClick={onBackToHome}
//                           className="text-xs font-semibold text-primary hover:underline cursor-pointer bg-transparent border-none"
//                         >
//                           Start Shopping
//                         </button>
//                       </div>
//                     ) : (
//                       orders.map((order) => (
//                         <div
//                           key={order.id}
//                           className="border border-primary/10 rounded-2xl p-5 hover:shadow-md transition-shadow space-y-4"
//                         >
//                           <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-primary/5">
//                             <div>
//                               <span className="text-xs text-outline block">
//                                 Order Reference
//                               </span>
//                               <span className="font-bold text-sm font-serif text-primary">
//                                 {order.id}
//                               </span>
//                             </div>
//                             <div>
//                               <span className="text-xs text-outline block">
//                                 Date Placed
//                               </span>
//                               <span className="font-semibold text-xs text-gray-800">
//                                 {order.date || order.orderDate || "N/A"}
//                               </span>
//                             </div>
//                             <div>
//                               <span
//                                 className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${order.statusColor || "bg-gray-100 text-gray-800 border-gray-200"}`}
//                               >
//                                 {order.status || "Pending"}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="flex justify-between items-start gap-4">
//                             <div>
//                               <h4 className="font-serif font-bold text-sm text-gray-900">
//                                 {order.productName || "Baby Set"}
//                               </h4>
//                               <span className="text-xs text-outline block mt-0.5">
//                                 Quantity: {order.qty || 1}
//                               </span>

//                               {/* Display embroidery details */}
//                               {order.embroideryText && (
//                                 <div className="mt-2 text-xs text-primary/80">
//                                   <span className="font-semibold">
//                                     Embroidered:{" "}
//                                   </span>
//                                   <span className="italic">
//                                     "{order.embroideryText}"
//                                   </span>
//                                   {order.fontStyle && (
//                                     <span className="ml-2 text-outline">
//                                       • {order.fontStyle}
//                                     </span>
//                                   )}
//                                   {order.embroideryColor && (
//                                     <span className="ml-2 text-outline">
//                                       • {order.embroideryColor}
//                                     </span>
//                                   )}
//                                 </div>
//                               )}
//                               {order.babyName &&
//                                 order.babyName !== order.embroideryText && (
//                                   <div className="text-xs text-outline">
//                                     <span className="font-semibold">
//                                       Baby:{" "}
//                                     </span>
//                                     {order.babyName}
//                                   </div>
//                                 )}
//                             </div>
//                             <div className="text-right">
//                               <span className="text-xs text-outline block">
//                                 Order Value
//                               </span>
//                               <span className="font-bold text-sm text-gray-900">
//                                 {formatTotal(order)}
//                               </span>
//                             </div>
//                           </div>

//                           {order.giftWrap && (
//                             <div className="flex items-center gap-2 text-xs text-primary/70 bg-primary/5 rounded-lg px-3 py-1.5">
//                               <span>🎁</span>
//                               <span>Gift Wrapped</span>
//                               {order.giftMessage && (
//                                 <span className="text-outline">
//                                   • "{order.giftMessage}"
//                                 </span>
//                               )}
//                             </div>
//                           )}

//                           <div className="bg-background/50 rounded-xl p-3 border border-primary/5 flex items-start gap-2">
//                             <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                             <p className="text-xs text-on-surface-variant leading-relaxed">
//                               {order.notes ||
//                                 "Order placed successfully. We'll update you on the status."}
//                             </p>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         // Auth Forms - keeping the same as before
//         <>
//           <div className="hidden md:flex w-1/2 relative bg-primary-container overflow-hidden items-center justify-center">
//             <img
//               src="/baby.jpg"
//               alt="Baby styling details"
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75" />
//             <div className="relative z-10 max-w-md p-10 text-white space-y-6">
//               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
//                 <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
//                 <span className="text-[10px] tracking-widest uppercase font-bold text-white">
//                   Join the Couplo Baby Club
//                 </span>
//               </div>
//               <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-tight drop-shadow-md">
//                 Handcrafted Occasions For Your Baby
//               </h2>
//               <p className="text-sm text-white/90 leading-relaxed font-sans drop-shadow">
//                 Create an account to review custom embroidery orders, track
//                 shipments seamlessly via WhatsApp, and access exclusive new
//                 season drops early.
//               </p>
//               <div className="border-t border-white/20 pt-6">
//                 <span className="text-xs text-white/80 block italic">
//                   "Loved by 500+ happy families across the country."
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:py-16">
//             <div className="max-w-md w-full bg-white md:bg-transparent rounded-3xl p-6 md:p-0 shadow-xl md:shadow-none border border-primary/5 md:border-none">
//               <button
//                 onClick={onBackToHome}
//                 className="mb-8 group flex items-center gap-2 text-sm text-outline hover:text-primary transition-colors cursor-pointer"
//               >
//                 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//                 Back to Store
//               </button>

//               <AnimatePresence mode="wait">
//                 {tab === "login" && (
//                   <motion.div
//                     key="login"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-6"
//                   >
//                     <div>
//                       <h2 className="text-3xl font-serif font-bold text-gray-900">
//                         Welcome back
//                       </h2>
//                     </div>

//                     <form onSubmit={handleLoginSubmit} className="space-y-4">
//                       <div className="space-y-1.5">
//                         <label
//                           htmlFor="login-email"
//                           className="text-xs font-semibold text-on-surface-variant block"
//                         >
//                           Email Address
//                         </label>
//                         <div className="relative">
//                           <Mail className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
//                           <input
//                             type="email"
//                             id="login-email"
//                             placeholder="you@example.com"
//                             value={loginEmail}
//                             onChange={(e) => setLoginEmail(e.target.value)}
//                             className="w-full py-3 pl-11 pr-4 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
//                             required
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-1.5">
//                         <div className="flex justify-between items-center">
//                           <label
//                             htmlFor="login-password"
//                             className="text-xs font-semibold text-on-surface-variant"
//                           >
//                             Password
//                           </label>
//                           <button
//                             type="button"
//                             onClick={() => setTab("forgot")}
//                             className="text-xs font-semibold text-primary hover:underline cursor-pointer"
//                           >
//                             Forgot Password?
//                           </button>
//                         </div>
//                         <div className="relative">
//                           <Lock className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
//                           <input
//                             type={showPassword ? "text" : "password"}
//                             id="login-password"
//                             placeholder="Enter password"
//                             value={loginPassword}
//                             onChange={(e) => setLoginPassword(e.target.value)}
//                             className="w-full py-3 pl-11 pr-11 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
//                             required
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
//                           >
//                             {showPassword ? (
//                               <EyeOff className="w-4 h-4" />
//                             ) : (
//                               <Eye className="w-4 h-4" />
//                             )}
//                           </button>
//                         </div>
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-primary hover:bg-primary/95 disabled:bg-primary/70 text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
//                       >
//                         {loading ? (
//                           <>
//                             <Loader2 className="w-4.5 h-4.5 animate-spin" />
//                             Signing In...
//                           </>
//                         ) : (
//                           "Sign In"
//                         )}
//                       </button>
//                     </form>

//                     <div className="text-center pt-4 border-t border-primary/10">
//                       <p className="text-sm text-outline">
//                         Don't have an account yet?{" "}
//                         <button
//                           onClick={() => setTab("register")}
//                           className="font-bold text-primary hover:underline cursor-pointer"
//                         >
//                           Sign Up
//                         </button>
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}

//                 {tab === "register" && (
//                   <motion.div
//                     key="register"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-6"
//                   >
//                     <div>
//                       <h2 className="text-3xl font-serif font-bold text-gray-900">
//                         Create account
//                       </h2>
//                       <p className="text-sm text-outline mt-1.5">
//                         Register a new account to personalise your experience.
//                       </p>
//                     </div>

//                     <form onSubmit={handleRegisterSubmit} className="space-y-4">
//                       <div className="space-y-1.5">
//                         <label
//                           htmlFor="reg-name"
//                           className="text-xs font-semibold text-on-surface-variant block"
//                         >
//                           Full Name *
//                         </label>
//                         <div className="relative">
//                           <UserIcon className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
//                           <input
//                             type="text"
//                             id="reg-name"
//                             placeholder="e.g. Jane Doe"
//                             value={registerName}
//                             onChange={(e) => setRegisterName(e.target.value)}
//                             className="w-full py-3 pl-11 pr-4 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
//                             required
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-1.5">
//                         <label
//                           htmlFor="reg-email"
//                           className="text-xs font-semibold text-on-surface-variant block"
//                         >
//                           Email Address *
//                         </label>
//                         <div className="relative">
//                           <Mail className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
//                           <input
//                             type="email"
//                             id="reg-email"
//                             placeholder="jane@example.com"
//                             value={registerEmail}
//                             onChange={(e) => setRegisterEmail(e.target.value)}
//                             className="w-full py-3 pl-11 pr-4 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
//                             required
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-1.5">
//                         <label
//                           htmlFor="reg-phone"
//                           className="text-xs font-semibold text-on-surface-variant block"
//                         >
//                           Phone Number / WhatsApp (Optional)
//                         </label>
//                         <div className="relative">
//                           <Phone className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
//                           <input
//                             type="tel"
//                             id="reg-phone"
//                             placeholder="e.g. +1 (555) 123-4567"
//                             value={registerPhone}
//                             onChange={(e) => setRegisterPhone(e.target.value)}
//                             className="w-full py-3 pl-11 pr-4 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-1.5">
//                         <label
//                           htmlFor="reg-password"
//                           className="text-xs font-semibold text-on-surface-variant block"
//                         >
//                           Password *
//                         </label>
//                         <div className="relative">
//                           <Lock className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
//                           <input
//                             type={showPassword ? "text" : "password"}
//                             id="reg-password"
//                             placeholder="Min. 6 characters"
//                             value={registerPassword}
//                             onChange={(e) =>
//                               setRegisterPassword(e.target.value)
//                             }
//                             className="w-full py-3 pl-11 pr-11 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
//                             required
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
//                           >
//                             {showPassword ? (
//                               <EyeOff className="w-4 h-4" />
//                             ) : (
//                               <Eye className="w-4 h-4" />
//                             )}
//                           </button>
//                         </div>
//                       </div>

//                       <div className="space-y-1.5">
//                         <label
//                           htmlFor="reg-confirm"
//                           className="text-xs font-semibold text-on-surface-variant block"
//                         >
//                           Confirm Password *
//                         </label>
//                         <div className="relative">
//                           <Lock className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
//                           <input
//                             type={showPassword ? "text" : "password"}
//                             id="reg-confirm"
//                             placeholder="Retype password"
//                             value={registerConfirmPassword}
//                             onChange={(e) =>
//                               setRegisterConfirmPassword(e.target.value)
//                             }
//                             className="w-full py-3 pl-11 pr-11 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
//                             required
//                           />
//                         </div>
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-primary hover:bg-primary/95 disabled:bg-primary/70 text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
//                       >
//                         {loading ? (
//                           <>
//                             <Loader2 className="w-4.5 h-4.5 animate-spin" />
//                             Registering...
//                           </>
//                         ) : (
//                           "Create Account"
//                         )}
//                       </button>
//                     </form>

//                     <div className="text-center pt-4 border-t border-primary/10">
//                       <p className="text-sm text-outline">
//                         Already have an account?{" "}
//                         <button
//                           onClick={() => setTab("login")}
//                           className="font-bold text-primary hover:underline cursor-pointer"
//                         >
//                           Sign In
//                         </button>
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}

//                 {tab === "forgot" && (
//                   <motion.div
//                     key="forgot"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-6"
//                   >
//                     <div>
//                       <h2 className="text-3xl font-serif font-bold text-gray-900">
//                         Forgot Password
//                       </h2>
//                       <p className="text-sm text-outline mt-1.5">
//                         Enter your email address and we'll send you instructions
//                         to reset your password.
//                       </p>
//                     </div>

//                     <form onSubmit={handleForgotSubmit} className="space-y-4">
//                       <div className="space-y-1.5">
//                         <label
//                           htmlFor="forgot-email"
//                           className="text-xs font-semibold text-on-surface-variant block"
//                         >
//                           Email Address
//                         </label>
//                         <div className="relative">
//                           <Mail className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
//                           <input
//                             type="email"
//                             id="forgot-email"
//                             placeholder="you@example.com"
//                             value={forgotEmail}
//                             onChange={(e) => setForgotEmail(e.target.value)}
//                             className="w-full py-3 pl-11 pr-4 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
//                             required
//                           />
//                         </div>
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-primary hover:bg-primary/95 disabled:bg-primary/70 text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
//                       >
//                         {loading ? (
//                           <>
//                             <Loader2 className="w-4.5 h-4.5 animate-spin" />
//                             Sending...
//                           </>
//                         ) : (
//                           "Reset Password"
//                         )}
//                       </button>
//                     </form>

//                     <div className="text-center pt-4 border-t border-primary/10">
//                       <p className="text-sm text-outline">
//                         Remembered your details?{" "}
//                         <button
//                           onClick={() => setTab("login")}
//                           className="font-bold text-primary hover:underline cursor-pointer"
//                         >
//                           Back to Sign In
//                         </button>
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }







import React, { useState, useEffect } from "react";
import { User } from "../../types";
import { motion, AnimatePresence } from "motion/react";
import {
  Eye,
  EyeOff,
  User as UserIcon,
  Mail,
  Phone,
  Lock,
  ArrowLeft,
  ClipboardList,
  ShieldCheck,
  PackageCheck,
  Truck,
  CheckCircle2,
  LogOut,
  Loader2,
  Sparkles,
  RefreshCw,
  Trash2,
} from "lucide-react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { orderService } from "../../services/orderService";

interface AuthPageProps {
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  onShowToast: (message: string, type?: "success" | "info" | "error") => void;
  onBackToHome: () => void;
}

type AuthTab = "login" | "register" | "forgot";

// Define the order type locally to avoid import issues
interface OrderData {
  id: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  status?: string;
  productName?: string;
  notes?: string;
  createdAt?: string;
  [key: string]: any; // Allow any other fields
}

const trackingSteps = [
  { key: "pending", label: "Placed", icon: ClipboardList },
  { key: "confirmed", label: "Confirmed", icon: PackageCheck },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const getOrderImage = (order: OrderData) => {
  const firstItem = Array.isArray(order.items) ? order.items[0] : undefined;
  return (
    firstItem?.product?.image ||
    firstItem?.product?.images?.[0] ||
    order.productImage ||
    order.image ||
    "/babyset/more.png"
  );
};

const getTrackingBarcodeImage = (order: OrderData) => {
  return order.trackingBarcodeImageUrl || order.trackingImageUrl || "";
};

const getTrackingIndex = (status?: string) => {
  const normalizedStatus = (status || "pending").toLowerCase();
  if (normalizedStatus === "cancelled") return -1;
  const index = trackingSteps.findIndex((step) => step.key === normalizedStatus);
  return index >= 0 ? index : 0;
};

function getAuthErrorMessage(error: unknown) {
  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code?: string }).code)
      : "";

  if (
    code === "auth/invalid-credential" ||
    code === "auth/wrong-password" ||
    code === "auth/user-not-found"
  ) {
    return "Invalid email or password";
  }
  if (code === "auth/email-already-in-use") return "Email already registered";
  if (code === "auth/weak-password")
    return "Password must be at least 6 characters";
  if (code === "auth/invalid-email")
    return "Please enter a valid email address";
  if (code === "auth/too-many-requests")
    return "Too many attempts. Please try again later";
  if (code === "auth/network-request-failed")
    return "Network error. Please check your connection";

  return "Something went wrong. Please try again";
}

export default function AuthPage({
  currentUser,
  onLogin,
  onLogout,
  onShowToast,
  onBackToHome,
}: AuthPageProps) {
  const [tab, setTab] = useState<AuthTab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);


  // Form Fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const [forgotEmail, setForgotEmail] = useState("");

  // Orders state
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Fetch orders from Firestore when user logs in
  useEffect(() => {
    if (currentUser) {
      fetchUserOrders(currentUser.id);
    } else {
      setOrders([]);
    }
  }, [currentUser]);

  // Fixed: Better logging of orders
  useEffect(() => {
    console.log("📊 Current orders count:", orders.length);
    console.log("📋 Orders data:", orders);
  }, [orders]);

  const fetchUserOrders = async (userId: string) => {
    try {
      setOrdersLoading(true);
      console.log("📦 Fetching orders for user:", userId);

      const userOrders = await orderService.getUserOrders(userId);

      const filteredOrders = userOrders.filter((order) => {
        if (!order) return false;
        const status = (order.status || "") as string;
        const isWelcome =
          status === "Welcome" ||
          status === "welcome" ||
          status === "Welcome Order" ||
          (order.id && order.id.includes("welcome")) ||
          (order.id && order.id.includes("Welcome")) ||
          (order.productName && order.productName.toLowerCase().includes("welcome")) ||
          (order.notes && order.notes.toLowerCase().includes("welcome"));
        return !isWelcome;
      });

      console.log("📊 Loaded user orders count:", filteredOrders.length);
      setOrders(filteredOrders);
    } catch (error) {
      console.error("❌ Failed to fetch orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const refreshOrders = () => {
    if (currentUser) {
      fetchUserOrders(currentUser.id);
      onShowToast("Refreshing orders...", "info");
    }
  };

  const clearCache = () => {
    if (currentUser) {
      try {
        localStorage.removeItem(`couplo_orders_${currentUser.id}`);
        onShowToast("Cache cleared", "success");
        fetchUserOrders(currentUser.id);
      } catch (error) {
        console.error("❌ Failed to clear cache:", error);
        onShowToast("Failed to clear cache", "error");
      }
    }
  };

  // Debug function to check Firestore directly
  const debugFirestore = async () => {
    if (!currentUser) {
      onShowToast("Please login first", "info");
      return;
    }

    console.log("🔍 DEBUG: Checking Firestore for orders...");
    onShowToast("Checking Firestore...", "info");

    try {
      // Check root orders collection
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", currentUser.id));
      const snapshot = await getDocs(q);

      console.log(`📊 Root orders collection: ${snapshot.size} orders found`);
      snapshot.forEach((doc) => {
        console.log(`  - Order ID: ${doc.id}`, doc.data());
      });

      // Check user subcollection
      const userOrdersRef = collection(db, "users", currentUser.id, "orders");
      const userSnapshot = await getDocs(userOrdersRef);

      console.log(`📊 User subcollection: ${userSnapshot.size} orders found`);
      userSnapshot.forEach((doc) => {
        console.log(`  - Order ID: ${doc.id}`, doc.data());
      });

      // Check localStorage
      const stored = localStorage.getItem(`couplo_orders_${currentUser.id}`);
      const storedOrders = stored ? JSON.parse(stored) : [];
      console.log(`📦 localStorage: ${storedOrders.length} orders found`);

      onShowToast(`Found ${snapshot.size} orders in Firestore`, "success");
      refreshOrders();
    } catch (error) {
      console.error("❌ Debug error:", error);
      onShowToast(`Debug error: ${error}`, "error");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      onShowToast("Please fill in all fields", "info");
      return;
    }

    try {
      setLoading(true);
      const credential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
      );
      const firebaseUser = credential.user;

      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      let userData = userDoc.data() as User | undefined;

      const loggedUser: User = {
        id: firebaseUser.uid,
        name:
          userData?.name ||
          firebaseUser.displayName ||
          firebaseUser.email?.split("@")[0] ||
          "Customer",
        email: firebaseUser.email || loginEmail,
        phone: userData?.phone || firebaseUser.phoneNumber || undefined,
        joinedDate:
          userData?.joinedDate ||
          (firebaseUser.metadata.creationTime
            ? new Date(firebaseUser.metadata.creationTime).toLocaleDateString(
                "en-US",
                { month: "long", year: "numeric", day: "numeric" },
              )
            : undefined),
      };

      onLogin(loggedUser);
      onShowToast(`Welcome back, ${loggedUser.name}!`, "success");

      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      onShowToast(getAuthErrorMessage(error), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !registerName ||
      !registerEmail ||
      !registerPassword ||
      !registerConfirmPassword
    ) {
      onShowToast("Please fill in all required fields", "info");
      return;
    }

    if (registerPassword.length < 6) {
      onShowToast("Password must be at least 6 characters", "info");
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      onShowToast("Passwords do not match", "info");
      return;
    }

    try {
      setLoading(true);
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        year: "numeric",
        day: "numeric",
      };
      const formattedDate = today.toLocaleDateString("en-US", options);

      const credential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );
      const firebaseUser = credential.user;

      await updateProfile(firebaseUser, { displayName: registerName });

      const loggedUser: User = {
        id: firebaseUser.uid,
        name: registerName,
        email: registerEmail,
        phone: registerPhone || "Not provided",
        joinedDate: formattedDate,
      };

      await setDoc(doc(db, "users", firebaseUser.uid), {
        ...loggedUser,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      onLogin(loggedUser);
      onShowToast("Account created successfully! 🎉", "success");

      setRegisterName("");
      setRegisterEmail("");
      setRegisterPhone("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");
    } catch (error) {
      onShowToast(getAuthErrorMessage(error), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotEmail) {
      onShowToast("Please enter your email address", "info");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, forgotEmail);
      onShowToast("Password reset instructions sent to your email", "success");
      setForgotEmail("");
      setTab("login");
    } catch (error) {
      onShowToast(getAuthErrorMessage(error), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutUser = async () => {
    try {
      await signOut(auth);
      onLogout();
      onShowToast("Logged out successfully", "success");
      onBackToHome();
    } catch (error) {
      onShowToast("Failed to log out", "error");
    }
  };

  const formatTotal = (order: any) => {
    if (typeof order.total === "number") {
      return `₹${order.total.toFixed(2)}`;
    }
    if (
      order.total &&
      typeof order.total === "string" &&
      order.total.startsWith("₹")
    ) {
      return order.total;
    }
    if (order.subtotal && typeof order.subtotal === "number") {
      return `₹${order.subtotal.toFixed(2)}`;
    }
    return "₹0.00";
  };

  return (
    <div
      id="auth-page-root"
      className="min-h-[80vh] flex flex-col md:flex-row items-stretch bg-background"
    >
      {currentUser ? (
        // User Dashboard
        <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column: Profile Card */}
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-primary/5 space-y-6">
                <div className="flex flex-col items-center text-center pb-6 border-b border-primary/10">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 font-serif text-3xl font-bold">
                    {currentUser.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900">
                    {currentUser.name}
                  </h2>
                  <p className="text-sm text-outline mt-1">Valued Customer</p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-1 border-b border-primary/5">
                    <span className="text-outline">Email Address</span>
                    <span className="font-semibold text-gray-800">
                      {currentUser.email}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-primary/5">
                    <span className="text-outline">WhatsApp / Phone</span>
                    <span className="font-semibold text-gray-800">
                      {currentUser.phone || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-primary/5">
                    <span className="text-outline">Member Since</span>
                    <span className="font-semibold text-gray-800">
                      {currentUser.joinedDate || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-primary/5">
                    <span className="text-outline">Total Orders</span>
                    <span className="font-semibold text-gray-800">
                      {orders.length}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={onBackToHome}
                    className="w-full py-3 bg-primary/10 hover:bg-primary/15 text-primary text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Shopping
                  </button>
                
                  <button
                    onClick={handleLogoutUser}
                    className="w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Order History */}
            <div className="w-full md:w-2/3 space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-primary/5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900">
                      Welcome Back, {currentUser.name?.split(" ")[0] || "User"}!
                    </h3>
                  </div>
                  <button
                    onClick={refreshOrders}
                    disabled={ordersLoading}
                    className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-all cursor-pointer disabled:opacity-50"
                    title="Refresh orders"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${ordersLoading ? "animate-spin" : ""}`}
                    />
                  </button>
                </div>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Welcome to your Couplo Baby Sets dashboard. Here you can
                  review your custom clothing configurations, check order
                  details, or initiate instant support via our WhatsApp
                  concierge service.
                </p>
              </div>

              {/* Order history */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-primary/5">
                <div className="flex items-center gap-3 mb-6">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  <h3 className="text-lg md:text-xl font-serif font-bold text-gray-900">
                    Order History {orders.length > 0 && `(${orders.length})`}
                  </h3>
                </div>

                {ordersLoading ? (
                  <div className="py-10 text-center flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-sm text-outline">
                      Loading your orders...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.length === 0 ? (
                      <div className="py-10 text-center flex flex-col items-center justify-center gap-3">
                        <p className="text-sm text-outline">
                          You haven't placed any orders yet.
                        </p>
                        <button
                          onClick={onBackToHome}
                          className="text-xs font-semibold text-primary hover:underline cursor-pointer bg-transparent border-none"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      orders.map((order) => {
                        const trackingIndex = getTrackingIndex(order.status);
                        const isCancelled =
                          (order.status || "").toLowerCase() === "cancelled";
                        const trackingBarcodeImage =
                          getTrackingBarcodeImage(order);

                        return (
                        <div
                          key={order.id}
                          className="border border-primary/10 rounded-2xl p-5 hover:shadow-md transition-shadow space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-primary/5">
                            <div>
                              <span className="text-xs text-outline block">
                                Order Reference
                              </span>
                              <span className="font-bold text-sm font-serif text-primary">
                                {order.orderId || order.id}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-outline block">
                                Date Placed
                              </span>
                              <span className="font-semibold text-xs text-gray-800">
                                {order.date || order.orderDate || "N/A"}
                              </span>
                            </div>
                            <div>
                              <span
                                className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${order.statusColor || "bg-gray-100 text-gray-800 border-gray-200"}`}
                              >
                                {order.status || "Pending"}
                              </span>
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-[92px_1fr_auto] items-start">
                            <div className="w-full sm:w-[92px] aspect-square rounded-xl overflow-hidden bg-primary/5 border border-primary/10">
                              <img
                                src={getOrderImage(order)}
                                alt={`${order.productName || "Order"} tracking`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-serif font-bold text-sm text-gray-900 break-words">
                                {order.productName || "Baby Set"}
                              </h4>
                              <span className="text-xs text-outline block mt-0.5">
                                Quantity: {order.qty || 1}
                              </span>

                              {/* Display embroidery details */}
                              {order.embroideryText && (
                                <div className="mt-2 text-xs text-primary/80">
                                  <span className="font-semibold">
                                    Embroidered:{" "}
                                  </span>
                                  <span className="italic">
                                    "{order.embroideryText}"
                                  </span>
                                  {order.fontStyle && (
                                    <span className="ml-2 text-outline">
                                      • {order.fontStyle}
                                    </span>
                                  )}
                                  {order.embroideryColor && (
                                    <span className="ml-2 text-outline">
                                      • {order.embroideryColor}
                                    </span>
                                  )}
                                </div>
                              )}
                              {order.babyName &&
                                order.babyName !== order.embroideryText && (
                                  <div className="text-xs text-outline">
                                    <span className="font-semibold">
                                      Baby:{" "}
                                    </span>
                                    {order.babyName}
                                  </div>
                                )}
                            </div>
                            <div className="text-left sm:text-right">
                              <span className="text-xs text-outline block">
                                Order Value
                              </span>
                              <span className="font-bold text-sm text-gray-900">
                                {formatTotal(order)}
                              </span>
                            </div>
                          </div>

                          <div className="rounded-xl bg-surface-container-low/70 border border-primary/5 p-4">
                            <div className="flex items-center justify-between gap-2">
                              {trackingSteps.map((step, index) => {
                                const StepIcon = step.icon;
                                const isActive =
                                  !isCancelled && index <= trackingIndex;

                                return (
                                  <React.Fragment key={step.key}>
                                    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
                                      <div
                                        className={`h-9 w-9 rounded-full border flex items-center justify-center transition-colors ${
                                          isActive
                                            ? "bg-primary text-white border-primary"
                                            : "bg-white text-outline border-primary/10"
                                        }`}
                                      >
                                        <StepIcon className="w-4 h-4" />
                                      </div>
                                      <span
                                        className={`text-[10px] font-semibold ${
                                          isActive ? "text-primary" : "text-outline"
                                        }`}
                                      >
                                        {step.label}
                                      </span>
                                    </div>
                                    {index < trackingSteps.length - 1 && (
                                      <div
                                        className={`hidden sm:block h-px w-8 -mx-2 ${
                                          !isCancelled && index < trackingIndex
                                            ? "bg-primary"
                                            : "bg-primary/10"
                                        }`}
                                      />
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                            {isCancelled && (
                              <p className="mt-3 text-xs font-semibold text-red-600 text-center">
                                This order has been cancelled.
                              </p>
                            )}
                          </div>

                          {trackingBarcodeImage && (
                            <div className="rounded-xl bg-white border border-primary/10 p-4">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs text-outline block">
                                    Tracking Barcode
                                  </span>
                                  <p className="text-xs text-on-surface-variant mt-1">
                                    Scan or save this image for shipment tracking.
                                  </p>
                                </div>
                                <div className="w-full sm:w-52 rounded-lg overflow-hidden bg-background border border-primary/5">
                                  <img
                                    src={trackingBarcodeImage}
                                    alt={`Tracking barcode for order ${order.id}`}
                                    className="w-full h-auto object-contain"
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {order.giftWrap && (
                            <div className="flex items-center gap-2 text-xs text-primary/70 bg-primary/5 rounded-lg px-3 py-1.5">
                              <span>🎁</span>
                              <span>Gift Wrapped</span>
                              {order.giftMessage && (
                                <span className="text-outline">
                                  • "{order.giftMessage}"
                                </span>
                              )}
                            </div>
                          )}

                          <div className="bg-background/50 rounded-xl p-3 border border-primary/5 flex items-start gap-2">
                            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                              {order.notes ||
                                "Order placed successfully. We'll update you on the status."}
                            </p>
                          </div>
                        </div>
                      );
                    })
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Auth Forms - keeping the same as before
        <>
          <div className="hidden md:flex w-1/2 relative bg-primary-container overflow-hidden items-center justify-center">
            <img
              src="/baby.jpg"
              alt="Baby styling details"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75" />
            <div className="relative z-10 max-w-md p-10 text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
                <span className="text-[10px] tracking-widest uppercase font-bold text-white">
                  Join the Couplo Baby Club
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-tight drop-shadow-md">
                Handcrafted Occasions For Your Baby
              </h2>
              <p className="text-sm text-white/90 leading-relaxed font-sans drop-shadow">
                Create an account to review custom embroidery orders, track
                shipments seamlessly via WhatsApp, and access exclusive new
                season drops early.
              </p>
              <div className="border-t border-white/20 pt-6">
                <span className="text-xs text-white/80 block italic">
                  "Loved by 500+ happy families across the country."
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:py-16">
            <div className="max-w-md w-full bg-white md:bg-transparent rounded-3xl p-6 md:p-0 shadow-xl md:shadow-none border border-primary/5 md:border-none">
              <button
                onClick={onBackToHome}
                className="mb-8 group flex items-center gap-2 text-sm text-outline hover:text-primary transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Store
              </button>

              <AnimatePresence mode="wait">
                {tab === "login" && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-gray-900">
                        Welcome back
                      </h2>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="login-email"
                          className="text-xs font-semibold text-on-surface-variant block"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            id="login-email"
                            placeholder="you@example.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="w-full py-3 pl-11 pr-4 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="login-password"
                            className="text-xs font-semibold text-on-surface-variant"
                          >
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() => setTab("forgot")}
                            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type={showPassword ? "text" : "password"}
                            id="login-password"
                            placeholder="Enter password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full py-3 pl-11 pr-11 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/95 disabled:bg-primary/70 text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4.5 h-4.5 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </form>

                    <div className="text-center pt-4 border-t border-primary/10">
                      <p className="text-sm text-outline">
                        Don't have an account yet?{" "}
                        <button
                          onClick={() => setTab("register")}
                          className="font-bold text-primary hover:underline cursor-pointer"
                        >
                          Sign Up
                        </button>
                      </p>
                    </div>
                  </motion.div>
                )}

                {tab === "register" && (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-gray-900">
                        Create account
                      </h2>
                      <p className="text-sm text-outline mt-1.5">
                        Register a new account to personalise your experience.
                      </p>
                    </div>

                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="reg-name"
                          className="text-xs font-semibold text-on-surface-variant block"
                        >
                          Full Name *
                        </label>
                        <div className="relative">
                          <UserIcon className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            id="reg-name"
                            placeholder="e.g. Jane Doe"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            className="w-full py-3 pl-11 pr-4 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="reg-email"
                          className="text-xs font-semibold text-on-surface-variant block"
                        >
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            id="reg-email"
                            placeholder="jane@example.com"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            className="w-full py-3 pl-11 pr-4 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="reg-phone"
                          className="text-xs font-semibold text-on-surface-variant block"
                        >
                          Phone Number / WhatsApp (Optional)
                        </label>
                        <div className="relative">
                          <Phone className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            id="reg-phone"
                            placeholder="e.g. +1 (555) 123-4567"
                            value={registerPhone}
                            onChange={(e) => setRegisterPhone(e.target.value)}
                            className="w-full py-3 pl-11 pr-4 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="reg-password"
                          className="text-xs font-semibold text-on-surface-variant block"
                        >
                          Password *
                        </label>
                        <div className="relative">
                          <Lock className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type={showPassword ? "text" : "password"}
                            id="reg-password"
                            placeholder="Min. 6 characters"
                            value={registerPassword}
                            onChange={(e) =>
                              setRegisterPassword(e.target.value)
                            }
                            className="w-full py-3 pl-11 pr-11 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="reg-confirm"
                          className="text-xs font-semibold text-on-surface-variant block"
                        >
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <Lock className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type={showPassword ? "text" : "password"}
                            id="reg-confirm"
                            placeholder="Retype password"
                            value={registerConfirmPassword}
                            onChange={(e) =>
                              setRegisterConfirmPassword(e.target.value)
                            }
                            className="w-full py-3 pl-11 pr-11 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/95 disabled:bg-primary/70 text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4.5 h-4.5 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </form>

                    <div className="text-center pt-4 border-t border-primary/10">
                      <p className="text-sm text-outline">
                        Already have an account?{" "}
                        <button
                          onClick={() => setTab("login")}
                          className="font-bold text-primary hover:underline cursor-pointer"
                        >
                          Sign In
                        </button>
                      </p>
                    </div>
                  </motion.div>
                )}

                {tab === "forgot" && (
                  <motion.div
                    key="forgot"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-gray-900">
                        Forgot Password
                      </h2>
                      <p className="text-sm text-outline mt-1.5">
                        Enter your email address and we'll send you instructions
                        to reset your password.
                      </p>
                    </div>

                    <form onSubmit={handleForgotSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="forgot-email"
                          className="text-xs font-semibold text-on-surface-variant block"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4.5 h-4.5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            id="forgot-email"
                            placeholder="you@example.com"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            className="w-full py-3 pl-11 pr-4 bg-background border border-primary/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl text-sm transition-all focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/95 disabled:bg-primary/70 text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4.5 h-4.5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                    </form>

                    <div className="text-center pt-4 border-t border-primary/10">
                      <p className="text-sm text-outline">
                        Remembered your details?{" "}
                        <button
                          onClick={() => setTab("login")}
                          className="font-bold text-primary hover:underline cursor-pointer"
                        >
                          Back to Sign In
                        </button>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
