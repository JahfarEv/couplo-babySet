import { useState, useCallback } from "react";
import { Product } from "../types";
import { CustomizationDetails, EMPTY_CUSTOMIZATION } from "../types/customization";

export interface CustomizationFlowState {
  open: boolean;
  product: Product | null;
  intent: "order" | "cart" | null;
  customization: CustomizationDetails;
  /** Pre-selected size/color passed in from the quick-view */
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}

const INITIAL: CustomizationFlowState = {
  open: false,
  product: null,
  intent: null,
  customization: EMPTY_CUSTOMIZATION,
  selectedSize: undefined,
  selectedColor: undefined,
  quantity: 1,
};

export function useCustomizationFlow() {
  const [state, setState] = useState<CustomizationFlowState>(INITIAL);

  const openCustomization = useCallback(
    (
      product: Product,
      intent: "order" | "cart",
      options?: {
        size?: string;
        color?: string;
        quantity?: number;
      }
    ) => {
      setState({
        open: true,
        product,
        intent,
        customization: EMPTY_CUSTOMIZATION,
        selectedSize: options?.size,
        selectedColor: options?.color,
        quantity: options?.quantity ?? 1,
      });
    },
    []
  );

  const closeCustomization = useCallback(() => {
    setState(INITIAL);
  }, []);

  const updateCustomization = useCallback(
    (patch: Partial<CustomizationDetails>) => {
      setState((s) => ({
        ...s,
        customization: { ...s.customization, ...patch },
      }));
    },
    []
  );

  return { state, openCustomization, closeCustomization, updateCustomization };
}
