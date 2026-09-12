import { useMemo, useRef, useState, useEffect } from "react";
import { CategoryFilter, Product, User, CartItem } from "./types";
import { useUserProducts, ProductPriceRange } from "./hooks/useProducts"; // ✅ Import the hook
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
import { useCompletedOrderCounts } from "./hooks/useCompletedOrderCounts";
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
  const [priceRange, setPriceRange] = useState<ProductPriceRange>("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<"home" | "auth">("home");
  const [productToShowAfterLogin, setProductToShowAfterLogin] = useState<Product | null>(null);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<"featured" | "collections" | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // ✅ Use the same approach as admin - real-time updates
  const {
    products,
    loading: productsLoading,
    loadingPage: productsLoadingPage,
    currentPage: productsCurrentPage,
    totalPages: productsTotalPages,
    goToPage: goToProductsPage,
  } = useUserProducts(priceRange, categoryFilter);
  const completedOrderCounts = useCompletedOrderCounts();
  const { categories, loading: categoriesLoading } = useCategories();

  const { toasts, showToast, dismissToast } = useToast();
  const showScrollTop = useScrollVisibility(400);
  const quickView = useQuickView();
  const customizationFlow = useCustomizationFlow();

  const featuredSectionRef = useRef<HTMLDivElement>(null);
  const collectionsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeView !== "home" || !pendingScrollTarget) return;

    const targetRef =
      pendingScrollTarget === "featured"
        ? featuredSectionRef
        : collectionsSectionRef;

    requestAnimationFrame(() => {
      scrollToSection(targetRef);
      setPendingScrollTarget(null);
    });
  }, [activeView, pendingScrollTarget]);

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
  showToast("You're not registered yet. Please create an account or log in if you already have one", "info");
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

    // Save order first to get the real Firebase document ID
    const savedOrder = await orderService.createOrder(currentUser, cart, "", false);
    if (!savedOrder) {
      showToast("Could not save your order to Firebase. Please try again.", "info");
      return;
    }

    const orderId = savedOrder.orderId || savedOrder.id || "N/A";

    // Build the formatted WhatsApp message with the real order ID
    let message = `Hi Couplo Baby Sets! 🌸\n\n`;
    message += `🆔 *Order ID:* ${orderId}\n\n`;
    cart.forEach((item, index) => {
      message += `📦 *Product ${index + 1}:* ${item.product.name}\n`;
      message += `💰 *Price:* ₹${(item.product.price * item.quantity).toFixed(2)} (x${item.quantity})\n`;
      if (item.selectedSize) message += `📏 *Size:* ${item.selectedSize}\n`;
      if (item.selectedColor) message += `🎨 *Color:* ${item.selectedColor}\n`;
      const c = item.customization;
      if (c) {
        message += `\n✨ *Customization Details*\n`;
        if (c.contactNumber) message += `• Customer WhatsApp: *${c.contactNumber}*\n`;
        if (c.babyName) message += `• Baby's Name: ${c.babyName}\n`;
        if (c.babyAge) message += `• Baby's Age: ${c.babyAge}\n`;
        if (c.romperName) message += `• Name in Romper: ${c.romperName}\n`;
        if (c.capName) message += `• Name in Cap: ${c.capName}\n`;
        if (c.bow) message += `• Bow: ${c.bow}\n`;
        if (c.designImageName) {
          message += `• Design Image: ${c.designImageName}\n`;
          if (c.designImageUrl) message += `  🔗 Link: ${c.designImageUrl}\n`;
        }
        if (c.embroideryText || c.embroideredText) message += `• Embroidery Text: ${c.embroideryText || c.embroideredText}\n`;
        if (c.giftWrap) {
          message += `• Gift Wrapping: Yes 🎁\n`;
          if (c.giftMessage) message += `• Gift Card Message: "${c.giftMessage}"\n`;
        }
        if (c.specialNotes) message += `• Special Instructions: ${c.specialNotes}\n`;
      }
      message += `\n`;
    });
    message += `💵 *Total Amount:* ₹${subtotal.toFixed(2)}\n`;
    message += `👤 *Customer:* ${currentUser.name} (${currentUser.email})\n\n`;
    message += `Please let me know availability and production timeline.\nThank you! ✨`;

    saveCart([]);
    setCartOpen(false);

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918590288151?text=${encoded}`, "_blank");

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
    if (activeView === "home") {
      scrollToSection(featuredSectionRef);
    } else {
      setActiveView("home");
      setPendingScrollTarget("featured");
    }
  };

  const handleOrder = (product: Product, quantity = 1, size?: string, color?: string) => {
    if (!currentUser) {
  showToast("You're not registered yet. Please create an account or log in if you already have one", "info");
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
      showToast("You're not registered yet. Please create an account or log in if you already have one", "info");
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

      // Save order first to get the real Firebase document ID
      const savedOrder = await orderService.createSingleOrder(currentUser, product, quantity, {
        ...customization,
        selectedSize,
        selectedColor,
      }, "", false);
      if (!savedOrder) {
        showToast("Could not save your order to Firebase. Please try again.", "info");
        return;
      }

      const orderId = savedOrder.orderId || savedOrder.id || "N/A";

      // Build the formatted WhatsApp message with the real Firebase order ID
      let message = `Hi Couplo Baby Sets! 🌸\n\n`;
      message += `🆔 *Order ID:* ${orderId}\n\n`;
      message += `📦 *Product:* ${product.name}\n`;
      message += `💰 *Price:* ₹${total.toFixed(2)}\n`;
      if (selectedSize) message += `📏 *Size:* ${selectedSize}\n`;
      if (selectedColor) message += `🎨 *Color:* ${selectedColor}\n`;
      if (customization) {
        message += `\n✨ *Customization Details*\n`;
        if (customization.contactNumber) message += `• Customer WhatsApp: *${customization.contactNumber}*\n`;
        if (customization.babyName) message += `• Baby's Name: ${customization.babyName}\n`;
        if (customization.babyAge) message += `• Baby's Age: ${customization.babyAge}\n`;
        if (customization.romperName) message += `• Name in Romper: ${customization.romperName}\n`;
        if (customization.capName) message += `• Name in Cap: ${customization.capName}\n`;
        if (customization.bow) message += `• Bow: ${customization.bow}\n`;
        if (customization.designImageName) {
          message += `• Design Image: ${customization.designImageName}\n`;
          if (customization.designImageUrl) message += `  🔗 Link: ${customization.designImageUrl}\n`;
        }
        if (customization.embroideryText || (customization as any).embroideredText) message += `• Embroidery Text: ${customization.embroideryText || (customization as any).embroideredText}\n`;
        if (customization.giftWrap) {
          message += `• Gift Wrapping: Yes 🎁\n`;
          if (customization.giftMessage) message += `• Gift Card Message: "${customization.giftMessage}"\n`;
        }
        if (customization.specialNotes) message += `• Special Instructions: ${customization.specialNotes}\n`;
      }
      message += `\n💵 *Total Amount:* ₹${total.toFixed(2)}\n`;
      message += `👤 *Customer:* ${currentUser.name} (${currentUser.email})\n\n`;
      message += `Please let me know availability and production timeline.\nThank you! ✨`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/918590288151?text=${encoded}`, "_blank");

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
            onBackToHome={() => {
              setActiveView("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
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
              completedOrderCounts={completedOrderCounts}
              categoryFilter={categoryFilter}
              categoryTabs={["all", ...categories.map((item) => item.value)]}
              getCategoryLabel={(cat) => getCategoryLabel(cat, categories)}
              onCategoryChange={setCategoryFilter}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onQuickView={quickView.openQuickView}
              onOrder={(product) => handleOrder(product)}
              onAddToCart={(product) => handleAddToCartWithCustomization(product, 1)}
              currentPage={productsCurrentPage}
              totalPages={productsTotalPages}
              onPageChange={goToProductsPage}
              loadingPage={productsLoadingPage}
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

      {/* <Footer
        onCategoryClick={(cat) => {
          handleCategoryBlockClick(cat);
        }}
        categories={categories}
        categoriesLoading={categoriesLoading}
      /> */}
      {activeView !== "auth" && (
  <Footer
    onCategoryClick={(cat) => {
      handleCategoryBlockClick(cat);
    }}
    categories={categories}
    categoriesLoading={categoriesLoading}
  />
)}

      <ScrollToTopButton visible={showScrollTop} />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918590288151"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>
    </div>
  );
}



// import { motion } from "motion/react";
// import { Baby, Heart, Sparkles, Clock, ArrowRight } from "lucide-react";
// import { useState, useEffect } from "react";

// function App() {
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);
//   const words = ["Beautiful", "Premium", "Adorable", "Custom", "Magical"];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentWordIndex((prev) => (prev + 1) % words.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FFF5F7] via-[#FFF0F5] to-[#FFE4E9] flex items-center justify-center p-4">
//       {/* Animated Background Particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(30)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 rounded-full"
//             style={{
//               background: i % 2 === 0 ? '#FFB6C1' : '#FF69B4',
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -30, 0],
//               opacity: [0, 1, 0],
//               scale: [0, 1, 0],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 4,
//               repeat: Infinity,
//               delay: Math.random() * 3,
//             }}
//           />
//         ))}
//       </div>

//       {/* Floating Decorations */}
//       <motion.div
//         className="absolute top-10 left-10 text-6xl opacity-20"
//         animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
//         transition={{ duration: 4, repeat: Infinity }}
//       >
//         👶
//       </motion.div>
//       <motion.div
//         className="absolute bottom-10 right-10 text-6xl opacity-20"
//         animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }}
//         transition={{ duration: 4, repeat: Infinity, delay: 1 }}
//       >
//         🎀
//       </motion.div>
//       <motion.div
//         className="absolute top-1/4 right-10 text-5xl opacity-15"
//         animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
//         transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
//       >
//         ✨
//       </motion.div>
//       <motion.div
//         className="absolute bottom-1/4 left-10 text-5xl opacity-15"
//         animate={{ y: [0, 15, 0], scale: [1, 1.2, 1] }}
//         transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
//       >
//         🌟
//       </motion.div>

//       {/* Main Content */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, type: "spring" }}
//         className="relative z-10 max-w-3xl w-full text-center"
//       >
//         {/* Animated Icon */}
//         <motion.div
//           initial={{ scale: 0, rotate: -180 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ duration: 0.8, type: "spring" }}
//           className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 shadow-2xl mb-8 relative"
//         >
//           <Baby className="w-16 h-16 text-white" />
//           <motion.div
//             className="absolute -top-2 -right-2 text-2xl"
//             animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             ✨
//           </motion.div>
//         </motion.div>

//         {/* Coming Soon Badge with Pulse */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-2.5 rounded-full text-pink-500 text-xs font-bold uppercase tracking-wider shadow-lg border border-pink-100 mb-6"
//         >
//           <motion.div
//             animate={{ scale: [1, 1.3, 1] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//           >
//             <Clock className="w-4 h-4" />
//           </motion.div>
//           Coming Soon
//           <motion.div
//             animate={{ scale: [1, 1.3, 1] }}
//             transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
//           >
//             <Sparkles className="w-4 h-4" />
//           </motion.div>
//         </motion.div>

//         {/* Main Animated Heading */}
//         <div className="mb-4">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800"
//           >
//             Something
//           </motion.h1>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.4, type: "spring" }}
//             className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-1"
//           >
//             <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
//               {words[currentWordIndex]}
//             </span>
//             <span className="text-gray-800"> Is Coming</span>
//           </motion.div>
//         </div>

//         {/* Animated Underline */}
//         <motion.div
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//           className="h-0.5 w-24 mx-auto bg-gradient-to-r from-pink-300 to-rose-300 rounded-full mb-6"
//         />

//         {/* Description with Typewriter Effect */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="text-gray-500 text-base md:text-lg max-w-lg mx-auto leading-relaxed"
//         >
//           We're crafting the perfect collection for your little ones.
//           <br />
//           <span className="text-pink-400 font-medium">Get ready for something special! ✨</span>
//         </motion.p>

//         {/* Animated Feature Icons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7 }}
//           className="flex justify-center gap-6 mt-8"
//         >
//           {[
//             { icon: "🎨", label: "Custom Designs" },
//             { icon: "🤍", label: "Baby Soft" },
//             { icon: "⭐", label: "Premium Quality" },
//           ].map((item, index) => (
//             <motion.div
//               key={item.label}
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
//               className="flex flex-col items-center gap-1 group cursor-default"
//               whileHover={{ y: -5 }}
//             >
//               <div className="w-12 h-12 rounded-full bg-white/80 shadow-md flex items-center justify-center text-2xl group-hover:shadow-lg transition-all border border-pink-100">
//                 {item.icon}
//               </div>
//               <span className="text-[10px] text-gray-400 font-medium">{item.label}</span>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Decorative */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.9 }}
//           className="mt-8 flex items-center justify-center gap-3"
//         >
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//             className="text-pink-300"
//           >
//             <Heart className="w-4 h-4 fill-pink-300" />
//           </motion.div>
//           <span className="text-xs text-gray-300">•</span>
//           <span className="text-xs text-gray-300 font-medium">Made with love</span>
//           <span className="text-xs text-gray-300">•</span>
//           <motion.div
//             animate={{ rotate: -360 }}
//             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//             className="text-pink-300"
//           >
//             <Heart className="w-4 h-4 fill-pink-300" />
//           </motion.div>
//         </motion.div>

//         {/* Animated Border Ring */}
//         <motion.div
//           className="absolute -inset-4 rounded-3xl border-2 border-pink-200/20 pointer-events-none"
//           animate={{
//             scale: [1, 1.02, 1],
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       </motion.div>
//     </div>
//   );
// }

// export default App;
