import { useState, useEffect } from "react";

/** Tracks whether the page has been scrolled past `threshold` pixels. */
export function useScrollVisibility(threshold = 400) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isVisible;
}
