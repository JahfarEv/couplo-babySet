import { Product } from "../types";
import { CustomizationDetails } from "../types/customization";

export function buildWhatsAppOrderMessage(
  product: Product,
  size?: string,
  color?: string,
  customization?: CustomizationDetails,
): string {
  const actualSize = size || (product.sizes ? product.sizes[0] : "One Size");
  const actualColor =
    color || (product.colors ? product.colors[0].name : "Default Theme");

  let message = `Hi Couplo Baby Sets! 🌸 I would love to place a *customized order*:\n\n`;
  message += `*Product:* ${product.name}\n`;
  message += `• Price: ₹${product.price.toFixed(2)}\n`;
  message += `• Size: ${actualSize}\n`;
  message += `• Color: ${actualColor}\n`;

  if (customization) {
    message += `\n✨ *Customization Details:*\n`;
    if (customization.babyName) {
      message += `• Baby's Name (to embroider): *${customization.babyName}*\n`;
    }
    if (customization.babyAge) {
      message += `• Baby's Age: ${customization.babyAge}\n`;
    }
    message += `• Font Style: ${customization.fontStyle}\n`;
    message += `• Thread Color: ${customization.embroideryColor}\n`;
    if (customization.giftWrap) {
      message += `• Gift Wrapping: Yes 🎁\n`;
      if (customization.giftMessage) {
        message += `• Gift Card Message: "${customization.giftMessage}"\n`;
      }
    }
    if (customization.specialNotes) {
      message += `• Special Instructions: ${customization.specialNotes}\n`;
    }
  }

  message += `\nPlease let me know availability and production timeline. Thank you! ✨`;
  return message;
}

/** Opens a pre-filled WhatsApp chat for ordering a single product. */
export function openWhatsAppOrder(
  product: Product,
  size?: string,
  color?: string,
  customization?: CustomizationDetails,
) {
  const message = buildWhatsAppOrderMessage(product, size, color, customization);
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encoded}`, "_blank");
}
