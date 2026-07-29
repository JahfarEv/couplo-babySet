// import { useMemo, useRef, useState, useEffect } from "react";
// import { CategoryFilter, Product, User, CartItem } from "./types";
// import { fetchProducts } from "./services/products";

// import { useToast } from "./hooks/useToast";
// import { useScrollVisibility } from "./hooks/useScrollVisibility";
// import { useQuickView } from "./hooks/useQuickView";
// import { useCustomizationFlow } from "./hooks/useCustomizationFlow";
// import { openWhatsAppOrder } from "./utils/whatsapp";
// import { CustomizationDetails } from "./types/customization";

// import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";
// import HeroBanner from "./components/home/HeroBanner";
// import CuratedCollections from "./components/home/CuratedCollections";
// import FeaturedProducts from "./components/home/FeaturedProducts";
// import WhyChooseUs from "./components/home/WhyChooseUs";
// import OurStory from "./components/home/OurStory";
// import CustomerReviews from "./components/home/CustomerReviews";
// import SearchOverlay from "./components/overlays/SearchOverlay";
// import QuickViewModal from "./components/overlays/QuickViewModal";
// import ToastContainer from "./components/overlays/ToastContainer";
// import ScrollToTopButton from "./components/overlays/ScrollToTopButton";
// import AuthPage from "./components/auth/AuthPage";
// import CartDrawer from "./components/overlays/CartDrawer";
// import CustomizationModal from "./components/overlays/CustomizationModal";

// export default function App() {
//   const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [activeView, setActiveView] = useState<"home" | "auth">("home");

//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [productsLoading, setProductsLoading] = useState(true);

//   const { toasts, showToast, dismissToast } = useToast();
//   const showScrollTop = useScrollVisibility(400);
//   const quickView = useQuickView();
//   const customizationFlow = useCustomizationFlow();

//   const featuredSectionRef = useRef<HTMLDivElement>(null);
//   const collectionsSectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let mounted = true;

//     const loadProducts = async () => {
//       setProductsLoading(true);
//       try {
//         const data = await fetchProducts();
//         if (mounted) {
//           setProducts(data);
//         }
//       } catch (error) {
//         console.error("Failed to load products", error);
//         if (mounted) {
//           setProducts([]);
//         }
//       } finally {
//         if (mounted) {
//           setProductsLoading(false);
//         }
//       }
//     };

//     loadProducts();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // Load user session from localStorage
//   useEffect(() => {
//     const session = localStorage.getItem("couplo_session");
//     if (session) {
//       try {
//         setCurrentUser(JSON.parse(session));
//       } catch (err) {
//         console.error("Failed to parse user session", err);
//       }
//     }
//   }, []);

//   // Synchronize cart when user changes or initially loads
//   useEffect(() => {
//     if (currentUser) {
//       const storedCart = localStorage.getItem(`couplo_cart_${currentUser.id}`);
//       if (storedCart) {
//         try {
//           setCart(JSON.parse(storedCart));
//         } catch (err) {
//           console.error("Failed to parse user cart", err);
//           setCart([]);
//         }
//       } else {
//         setCart([]);
//       }
//     } else {
//       setCart([]);
//       setCartOpen(false);
//     }
//   }, [currentUser]);

//   // Helper to save cart to localStorage
//   const saveCart = (newCart: CartItem[]) => {
//     setCart(newCart);
//     if (currentUser) {
//       localStorage.setItem(`couplo_cart_${currentUser.id}`, JSON.stringify(newCart));
//     }
//   };

//   const handleLogin = (user: User) => {
//     setCurrentUser(user);
//     localStorage.setItem("couplo_session", JSON.stringify(user));
//     setActiveView("auth");
//   };

//   const handleLogout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem("couplo_session");
//   };

//   const handleLogoClick = () => {
//     setActiveView("home");
//     setCategoryFilter("all");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleAddToCart = (product: Product, quantity: number, size?: string, color?: string) => {
//     if (!currentUser) {
//       showToast("Please sign in to add items to your cart", "info");
//       setActiveView("auth");
//       return;
//     }

//     const actualSize = size || (product.sizes ? product.sizes[0] : undefined);
//     const actualColor = color || (product.colors ? product.colors[0].name : undefined);

//     const existingIndex = cart.findIndex(
//       (item) =>
//         item.product.id === product.id &&
//         item.selectedSize === actualSize &&
//         item.selectedColor === actualColor
//     );

//     let newCart = [...cart];
//     if (existingIndex > -1) {
//       newCart[existingIndex].quantity += quantity;
//     } else {
//       newCart.push({
//         product,
//         quantity,
//         selectedSize: actualSize,
//         selectedColor: actualColor,
//       });
//     }

//     saveCart(newCart);
//     showToast(`Added ${product.name} to cart!`, "success");
//     setCartOpen(true);
//   };

//   const handleRemoveFromCart = (index: number) => {
//     const item = cart[index];
//     const newCart = cart.filter((_, i) => i !== index);
//     saveCart(newCart);
//     if (item) {
//       showToast(`Removed ${item.product.name} from cart`, "info");
//     }
//   };

//   const handleUpdateCartQuantity = (index: number, quantity: number) => {
//     const newCart = [...cart];
//     if (newCart[index]) {
//       newCart[index].quantity = quantity;
//       saveCart(newCart);
//     }
//   };

//   const handleCheckoutCart = () => {
//     if (!currentUser || cart.length === 0) return;

//     // Calculate subtotal
//     const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
//     const dateOptions: Intl.DateTimeFormatOptions = { month: "long", year: "numeric", day: "numeric" };
//     const todayStr = new Date().toLocaleDateString("en-US", dateOptions);

//     // Format WhatsApp message
//     let message = `Hi Couplo Baby Sets! 🌸 I would love to place an order for the following items:\n\n`;
//     cart.forEach((item, index) => {
//       const sizeStr = item.selectedSize ? `\n   • Size: ${item.selectedSize}` : "";
//       const colorStr = item.selectedColor ? `\n   • Color: ${item.selectedColor}` : "";
//       message += `${index + 1}. *${item.product.name}* x ${item.quantity}${sizeStr}${colorStr}\n   • Price: $${(item.product.price * item.quantity).toFixed(2)}\n\n`;
//     });
//     message += `Total Amount: $${subtotal.toFixed(2)}\n`;
//     message += `Customer: ${currentUser.name} (${currentUser.email})\n\n`;
//     message += `Please let me know availability and payment details. Thank you! ✨`;

//     // Save order details dynamically to localStorage for the user dashboard
//     const orderId = `CB-${Math.floor(1000 + Math.random() * 9000)}`;
//     const newOrder = {
//       id: orderId,
//       date: todayStr,
//       productName: cart.map((item) => `${item.product.name} (x${item.quantity})`).join(", "),
//       qty: cart.reduce((sum, item) => sum + item.quantity, 0),
//       total: `$${subtotal.toFixed(2)}`,
//       status: "Pending",
//       statusColor: "bg-blue-100 text-blue-800 border-blue-200",
//       notes: "Awaiting WhatsApp confirmation from Couplo concierge.",
//     };

//     const storedOrdersKey = `couplo_orders_${currentUser.id}`;
//     const existingOrdersStr = localStorage.getItem(storedOrdersKey);
//     let orders = [];
//     if (existingOrdersStr) {
//       try {
//         orders = JSON.parse(existingOrdersStr);
//       } catch (e) {
//         console.error("Failed to parse orders history", e);
//       }
//     } else {
//       // Seed default orders if user is Emily Watson
//       if (currentUser.email === "parent@couplo.com") {
//         const defaultMock = [
//           {
//             id: "CB-8492",
//             date: "June 25, 2026",
//             productName: "Premium Newborn Gift Set (Custom Embroidery)",
//             qty: 1,
//             total: "$68.00",
//             status: "Shipped",
//             statusColor: "bg-amber-100 text-amber-800 border-amber-200",
//             notes: "WhatsApp coordination completed. Parcel in transit.",
//           },
//           {
//             id: "CB-8123",
//             date: "May 12, 2026",
//             productName: "Organic Cotton Ribbed Romper & Hat Set",
//             qty: 2,
//             total: "$85.00",
//             status: "Delivered",
//             statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
//             notes: "Delivered. WhatsApp confirmation received.",
//           },
//         ];
//         orders = [...defaultMock];
//       }
//     }
//     orders.unshift(newOrder);
//     localStorage.setItem(storedOrdersKey, JSON.stringify(orders));

//     // Clear cart and close drawer
//     saveCart([]);
//     setCartOpen(false);

//     // Redirect to WhatsApp
//     const encoded = encodeURIComponent(message);
//     window.open(`https://wa.me/?text=${encoded}`, "_blank");

//     showToast("Checkout initiated! WhatsApp chat opened and order saved.", "success");
//     setActiveView("auth");
//   };

//   const handleOpenCart = () => {
//     if (!currentUser) {
//       showToast("Please sign in to access your shopping bag", "info");
//       setActiveView("auth");
//     } else {
//       setCartOpen(true);
//     }
//   };

//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const matchesCategory =
//         categoryFilter === "all" || product.category === categoryFilter;
//       const matchesSearch =
//         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesCategory && matchesSearch;
//     });
//   }, [categoryFilter, searchQuery]);

//   const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
//     ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   const handleCategoryBlockClick = (cat: CategoryFilter) => {
//     setCategoryFilter(cat);
//     scrollToSection(featuredSectionRef);
//   };

//   /** Opens customization modal before ordering via WhatsApp */
//   const handleOrder = (product: Product, size?: string, color?: string) => {
//     customizationFlow.openCustomization(product, "order", { size, color });
//   };

//   /** Opens customization modal before adding to bag */
//   const handleAddToCartWithCustomization = (
//     product: Product,
//     quantity: number,
//     size?: string,
//     color?: string,
//   ) => {
//     if (!currentUser) {
//       showToast("Please sign in to add items to your cart", "info");
//       setActiveView("auth");
//       return;
//     }
//     customizationFlow.openCustomization(product, "cart", { size, color, quantity });
//   };

//   /** Called when user confirms customization — routes to WhatsApp or bag */
//   const handleCustomizationConfirm = (customization: CustomizationDetails) => {
//     const { product, intent, selectedSize, selectedColor, quantity } = customizationFlow.state;
//     if (!product || !intent) return;
//     customizationFlow.closeCustomization();

//     if (intent === "order") {
//       openWhatsAppOrder(product, selectedSize, selectedColor, customization);
//     } else {
//       handleAddToCart(product, quantity, selectedSize, selectedColor);
//       showToast(`✨ Customized ${product.name} added to your bag!`, "success");
//     }
//   };

//   return (
//     <div
//       id="couplo-baby-sets-root"
//       className="min-h-screen bg-background text-on-surface font-sans flex flex-col relative selection:bg-primary/20 selection:text-primary"
//     >
//       <SearchOverlay
//         open={searchOpen}
//         onClose={() => setSearchOpen(false)}
//         searchQuery={searchQuery}
//         onSearchQueryChange={setSearchQuery}
//         results={filteredProducts}
//         onSelectProduct={quickView.openQuickView}
//       />

//       <QuickViewModal
//         product={quickView.selectedProduct}
//         size={quickView.size}
//         onSizeChange={quickView.setSize}
//         color={quickView.color}
//         onColorChange={quickView.setColor}
//         quantity={quickView.quantity}
//         onQuantityChange={quickView.setQuantity}
//         onClose={quickView.closeQuickView}
//         onOrder={(product, size, color) => {
//           quickView.closeQuickView();
//           handleOrder(product, size, color);
//         }}
//         onAddToCart={(product, quantity, size, color) => {
//           quickView.closeQuickView();
//           handleAddToCartWithCustomization(product, quantity, size, color);
//         }}
//       />

//       <CustomizationModal
//         open={customizationFlow.state.open}
//         product={customizationFlow.state.product}
//         intent={customizationFlow.state.intent}
//         customization={customizationFlow.state.customization}
//         selectedSize={customizationFlow.state.selectedSize}
//         selectedColor={customizationFlow.state.selectedColor}
//         quantity={customizationFlow.state.quantity}
//         onChange={customizationFlow.updateCustomization}
//         onClose={customizationFlow.closeCustomization}
//         onConfirm={handleCustomizationConfirm}
//       />

//       <ToastContainer toasts={toasts} onDismiss={dismissToast} />

//       <Header
//         mobileMenuOpen={mobileMenuOpen}
//         onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
//         onCloseMobileMenu={() => setMobileMenuOpen(false)}
//         onOpenSearch={() => setSearchOpen(true)}
//         onCategoryClick={(cat) => {
//           setActiveView("home");
//           handleCategoryBlockClick(cat);
//         }}
//         activeView={activeView}
//         currentUser={currentUser}
//         onAccountClick={() => setActiveView(activeView === "auth" ? "home" : "auth")}
//         onLogoClick={handleLogoClick}
//         cart={cart}
//         onOpenCart={handleOpenCart}
//       />

//       <CartDrawer
//         open={cartOpen}
//         onClose={() => setCartOpen(false)}
//         cart={cart}
//         onRemoveItem={handleRemoveFromCart}
//         onUpdateQuantity={handleUpdateCartQuantity}
//         onCheckout={handleCheckoutCart}
//       />

//       <main className="flex-grow">
//         {activeView === "auth" ? (
//           <AuthPage
//             currentUser={currentUser}
//             onLogin={handleLogin}
//             onLogout={handleLogout}
//             onShowToast={showToast}
//             onBackToHome={() => setActiveView("home")}
//           />
//         ) : (
//           <>
//             <HeroBanner
//               onShopCollection={() => scrollToSection(featuredSectionRef)}
//               onExploreCategories={() => scrollToSection(collectionsSectionRef)}
//             />

//             <CuratedCollections
//               ref={collectionsSectionRef}
//               onCategoryClick={handleCategoryBlockClick}
//             />

//             <FeaturedProducts
//               ref={featuredSectionRef}
//               products={filteredProducts}
//               categoryFilter={categoryFilter}
//               onCategoryChange={setCategoryFilter}
//               onQuickView={quickView.openQuickView}
//               onOrder={(product) => handleOrder(product)}
//               onAddToCart={(product) => handleAddToCartWithCustomization(product, 1)}
//               loading={productsLoading}
//             />

//             <WhyChooseUs />
//             <CustomerReviews />
//             <OurStory />
//           </>
//         )}
//       </main>

//       <Footer
//         onCategoryClick={(cat) => {
//           setActiveView("home");
//           handleCategoryBlockClick(cat);
//         }}
//         onShowToast={showToast}
//       />

//       <ScrollToTopButton visible={showScrollTop} />
//     </div>
//   );
// }





import { useMemo, useRef, useState, useEffect } from "react";
import { CategoryFilter, Product, User, CartItem } from "./types";
import { useUserProducts } from "./hooks/useProducts"; // ✅ Import the hook
import { useCategories } from "./hooks/useCategories";
import { categoryMatches, getCategoryLabel } from "./utils/categoryUtils";
import { orderService } from "./services/orderService";
import { cartService } from "./services/cartService";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { useToast } from "./hooks/useToast";
import { useScrollVisibility } from "./hooks/useScrollVisibility";
import { useQuickView } from "./hooks/useQuickView";
import { useCustomizationFlow } from "./hooks/useCustomizationFlow";
import { CustomizationDetails } from "./types/customization";
import PremiumCustomization from "./components/home/PremiumCustomization";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroBanner from "./components/home/HeroBanner";
import CuratedCollections from "./components/home/CuratedCollections";
import FeaturedProducts from "./components/home/FeaturedProducts";
import WhyChooseUs from "./components/home/WhyChooseUs";
import OurStory from "./components/home/OurStory";
import CustomerReviews from "./components/home/CustomerReviews";
import ReturnClaims from "./components/home/ReturnClaims";
import SearchOverlay from "./components/overlays/SearchOverlay";
import QuickViewModal from "./components/overlays/QuickViewModal";
import ToastContainer from "./components/overlays/ToastContainer";
import ScrollToTopButton from "./components/overlays/ScrollToTopButton";
import AuthPage from "./components/auth/AuthPage";
import CartDrawer from "./components/overlays/CartDrawer";
import CustomizationModal from "./components/overlays/CustomizationModal";

export default function App() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<"home" | "auth">("home");
  const [productToShowAfterLogin, setProductToShowAfterLogin] = useState<Product | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // ✅ Use the same approach as admin - real-time updates
  const { products, loading: productsLoading } = useUserProducts();
  const { categories, loading: categoriesLoading } = useCategories();

  const { toasts, showToast, dismissToast } = useToast();
  const showScrollTop = useScrollVisibility(400);
  const quickView = useQuickView();
  const customizationFlow = useCustomizationFlow();

  const featuredSectionRef = useRef<HTMLDivElement>(null);
  const collectionsSectionRef = useRef<HTMLDivElement>(null);

  // Keep user session synchronized with Firebase Authentication.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setCurrentUser(null);
        localStorage.removeItem("couplo_session");
        return;
      }

      let profile: Partial<User> = {};
      try {
        const profileSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        profile = profileSnap.exists() ? profileSnap.data() as Partial<User> : {};
      } catch (err) {
        console.error("Failed to load user profile", err);
      }

      const user: User = {
        id: firebaseUser.uid,
        name: profile.name || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Customer",
        email: firebaseUser.email || profile.email || "",
        phone: profile.phone || firebaseUser.phoneNumber || undefined,
        joinedDate: profile.joinedDate || undefined,
      };

      setCurrentUser(user);
      localStorage.setItem("couplo_session", JSON.stringify(user));
    });

    return unsubscribe;
  }, []);

  // Synchronize cart when user changes or initially loads
  useEffect(() => {
    if (currentUser) {
      const storedCart = localStorage.getItem(`couplo_cart_${currentUser.id}`);
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (err) {
          console.error("Failed to parse user cart", err);
          setCart([]);
        }
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
      setCartOpen(false);
    }
  }, [currentUser]);

  // Helper to save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    if (currentUser) {
      localStorage.setItem(`couplo_cart_${currentUser.id}`, JSON.stringify(newCart));
      cartService.saveCart(currentUser.id, newCart).catch((error) => {
        console.error("Failed to save cart to Firebase:", error);
      });
    }
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("couplo_session", JSON.stringify(user));

    if (productToShowAfterLogin) {
      const product = productToShowAfterLogin;
      setProductToShowAfterLogin(null);
      setActiveView("home");
      requestAnimationFrame(() => {
        scrollToSection(featuredSectionRef);
        quickView.openQuickView(product);
      });
      return;
    }

    setActiveView("auth");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("couplo_session");
    signOut(auth).catch((error) => {
      console.error("Firebase sign out failed:", error);
    });
  };

  const handleLogoClick = () => {
    setActiveView("home");
    setCategoryFilter("all");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (
    product: Product,
    quantity: number,
    size?: string,
    color?: string,
    customization?: CustomizationDetails,
  ) => {
    if (!currentUser) {
      showToast("Please sign in to add items to your cart", "info");
      setActiveView("auth");
      return;
    }

    const actualSize = size;
    const actualColor = color;
    const cartCustomization = customization
      ? {
          ...customization,
          embroideredText: customization.babyName,
        }
      : undefined;
    const customizationKey = JSON.stringify(cartCustomization || null);

    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === actualSize &&
        item.selectedColor === actualColor &&
        JSON.stringify(item.customization || null) === customizationKey
    );

    let newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({
        product,
        quantity,
        selectedSize: actualSize,
        selectedColor: actualColor,
        customization: cartCustomization,
      });
    }

    saveCart(newCart);
    showToast(`Added ${product.name} to cart!`, "success");
    setCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    const item = cart[index];
    const newCart = cart.filter((_, i) => i !== index);
    saveCart(newCart);
    if (item) {
      showToast(`Removed ${item.product.name} from cart`, "info");
    }
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    const newCart = [...cart];
    if (newCart[index]) {
      newCart[index].quantity = quantity;
      saveCart(newCart);
    }
  };

  const handleCheckoutCart = async () => {
    if (!currentUser || cart.length === 0) return;

    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const dateOptions: Intl.DateTimeFormatOptions = { month: "long", year: "numeric", day: "numeric" };
    const todayStr = new Date().toLocaleDateString("en-US", dateOptions);

    let message = `Hi Couplo Baby Sets! 🌸 I would love to place an order for the following items:\n\n`;
    cart.forEach((item, index) => {
      const sizeStr = item.selectedSize ? `\n   • Size: ${item.selectedSize}` : "";
      const colorStr = item.selectedColor ? `\n   • Color: ${item.selectedColor}` : "";
      message += `${index + 1}. *${item.product.name}* x ${item.quantity}${sizeStr}${colorStr}\n   • Price: ₹${(item.product.price * item.quantity).toFixed(2)}\n\n`;
    });
    message += `Total Amount: ₹${subtotal.toFixed(2)}\n`;
    message += `Customer: ${currentUser.name} (${currentUser.email})\n\n`;
    message += `Please let me know availability and payment details. Thank you! ✨`;

    const savedOrder = await orderService.createOrder(currentUser, cart, message, false);
    if (!savedOrder) {
      showToast("Could not save your order to Firebase. Please try again.", "info");
      return;
    }

    saveCart([]);
    setCartOpen(false);

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");

    showToast("Checkout initiated! WhatsApp chat opened and order saved.", "success");
    setActiveView("auth");
  };

  const handleOpenCart = () => {
    if (!currentUser) {
      showToast("Please sign in to access your shopping bag", "info");
      setActiveView("auth");
    } else {
      setCartOpen(true);
    }
  };
// In your App.tsx, add this after the hook:
console.log("🔍 Products from Firebase:", products);
console.log("⏳ Loading state:", productsLoading);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categoryMatches(product.category, categoryFilter);
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery, products]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCategoryBlockClick = (cat: CategoryFilter) => {
    setCategoryFilter(cat);
    scrollToSection(featuredSectionRef);
  };

  const handleOrder = (product: Product, quantity = 1, size?: string, color?: string) => {
    if (!currentUser) {
      showToast("Please sign in to place a direct order", "info");
      setProductToShowAfterLogin(product);
      setActiveView("auth");
      return;
    }

    customizationFlow.openCustomization(product, "order", { size, color, quantity });
  };

  const handleAddToCartWithCustomization = (
    product: Product,
    quantity: number,
    size?: string,
    color?: string,
  ) => {
    if (!currentUser) {
      showToast("Please sign in to add items to your cart", "info");
      setProductToShowAfterLogin(product);
      setActiveView("auth");
      return;
    }
    customizationFlow.openCustomization(product, "cart", { size, color, quantity });
  };

  const handleCustomizationConfirm = async (customization: CustomizationDetails) => {
    const { product, intent, selectedSize, selectedColor, quantity } = customizationFlow.state;
    if (!product || !intent) return;
    customizationFlow.closeCustomization();

    if (intent === "order") {
      if (!currentUser) return;

      const total = product.price * quantity;
      const dateOptions: Intl.DateTimeFormatOptions = { month: "long", year: "numeric", day: "numeric" };
      const todayStr = new Date().toLocaleDateString("en-US", dateOptions);
      const sizeStr = selectedSize ? `\n   - Size: ${selectedSize}` : "";
      const colorStr = selectedColor ? `\n   - Color: ${selectedColor}` : "";
      const babyNameStr = customization.babyName ? `\n   - Baby's Name: ${customization.babyName}` : "";
      const babyAgeStr = customization.babyAge ? `\n   - Baby's Age: ${customization.babyAge}` : "";

      let message = `Hi Couplo Baby Sets! I would love to place an order for the following item:\n\n`;
      message += `1. *${product.name}* x ${quantity}${sizeStr}${colorStr}${babyNameStr}${babyAgeStr}\n`;
      message += `   - Price: ₹${total.toFixed(2)}\n\n`;
      message += `Total Amount: ₹${total.toFixed(2)}\n`;
      message += `Customer: ${currentUser.name} (${currentUser.email})\n\n`;
      message += `Please let me know availability and payment details. Thank you!`;

      const savedOrder = await orderService.createSingleOrder(currentUser, product, quantity, {
        ...customization,
        selectedSize,
        selectedColor,
      }, message, false);
      if (!savedOrder) {
        showToast("Could not save your order to Firebase. Please try again.", "info");
        return;
      }

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/?text=${encoded}`, "_blank");

      showToast("Direct order initiated! WhatsApp chat opened and order saved.", "success");
      setActiveView("auth");
    } else {
      handleAddToCart(product, quantity, selectedSize, selectedColor, customization);
      showToast(`✨ Customized ${product.name} added to your bag!`, "success");
    }
  };

  return (
    <div
      id="couplo-baby-sets-root"
      className="min-h-screen bg-background text-on-surface font-sans flex flex-col relative selection:bg-primary/20 selection:text-primary"
    >
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        results={filteredProducts}
        onSelectProduct={quickView.openQuickView}
      />

      <QuickViewModal
        product={quickView.selectedProduct}
        quantity={quickView.quantity}
        onQuantityChange={quickView.setQuantity}
        onClose={quickView.closeQuickView}
        onOrder={(product, quantity) => {
          quickView.closeQuickView();
          handleOrder(product, quantity);
        }}
        onAddToCart={(product, quantity) => {
          quickView.closeQuickView();
          handleAddToCartWithCustomization(product, quantity);
        }}
        currentUser={currentUser}
      />
      
      <CustomizationModal
        open={customizationFlow.state.open}
        product={customizationFlow.state.product}
        intent={customizationFlow.state.intent}
        customization={customizationFlow.state.customization}
        selectedSize={customizationFlow.state.selectedSize}
        selectedColor={customizationFlow.state.selectedColor}
        quantity={customizationFlow.state.quantity}
        onChange={customizationFlow.updateCustomization}
        onClose={customizationFlow.closeCustomization}
        onConfirm={handleCustomizationConfirm}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <Header
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
        onCategoryClick={(cat) => {
          setActiveView("home");
          handleCategoryBlockClick(cat);
        }}
        activeView={activeView}
        currentUser={currentUser}
        onAccountClick={() => setActiveView(activeView === "auth" ? "home" : "auth")}
        onLogoClick={handleLogoClick}
        cart={cart}
        onOpenCart={handleOpenCart}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCheckout={handleCheckoutCart}
        currentUser={currentUser}  // ✅ Pass current user
  onShowToast={showToast}    
      />

      <main className="flex-grow">
        {activeView === "auth" ? (
          <AuthPage
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onShowToast={showToast}
            onBackToHome={() => setActiveView("home")}
          />
        ) : (
          <>
            <HeroBanner
              onShopCollection={() => scrollToSection(featuredSectionRef)}
              onExploreCategories={() => scrollToSection(collectionsSectionRef)}
            />

            <CuratedCollections
              ref={collectionsSectionRef}
              onCategoryClick={handleCategoryBlockClick}
            />

            <FeaturedProducts
              ref={featuredSectionRef}
              products={filteredProducts}
              categoryFilter={categoryFilter}
              categoryTabs={["all", ...categories.map((item) => item.value)]}
              getCategoryLabel={(cat) => getCategoryLabel(cat, categories)}
              onCategoryChange={setCategoryFilter}
              onQuickView={quickView.openQuickView}
              onOrder={(product) => handleOrder(product)}
              onAddToCart={(product) => handleAddToCartWithCustomization(product, 1)}
              loading={productsLoading || categoriesLoading}
            />

            <WhyChooseUs />
            <PremiumCustomization />
            <CustomerReviews />
            <OurStory />
            <ReturnClaims />
          </>
        )}
      </main>

      <Footer
        onCategoryClick={(cat) => {
          setActiveView("home");
          handleCategoryBlockClick(cat);
        }}
        categories={categories}
        categoriesLoading={categoriesLoading}
      />

      <ScrollToTopButton visible={showScrollTop} />
    </div>
  );
}
