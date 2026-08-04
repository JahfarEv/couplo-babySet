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

  let message = `Hi Couplo Baby Sets! ðŸŒ¸ I would love to place a *customized order*:\n\n`;
  message += `*Product:* ${product.name}\n`;
  message += `â€¢ Price: â‚¹${product.price.toFixed(2)}\n`;
  message += `â€¢ Size: ${actualSize}\n`;
  message += `â€¢ Color: ${actualColor}\n`;

  if (customization) {
    message += `\nâœ¨ *Customization Details:*\n`;
    if (customization.size) {
      message += `- Size: ${customization.size}\n`;
    }
    if (customization.embroideryText) {
      message += `- Embroidery Text: *${customization.embroideryText}*\n`;
    }
    if (customization.romperName) {
      message += `- Name in Romper: *${customization.romperName}*\n`;
    }
    if (customization.capName) {
      message += `- Name in Cap: *${customization.capName}*\n`;
    }
    if (customization.bow) {
      message += `- Bow: ${customization.bow}\n`;
    }
    if (customization.designImageName) {
      message += `- Design Image: ${customization.designImageName}\n`;
    }
    if (customization.babyName) {
      message += `â€¢ Baby's Name (to embroider): *${customization.babyName}*\n`;
    }
    if (customization.babyAge) {
      message += `â€¢ Baby's Age: ${customization.babyAge}\n`;
    }
    message += `â€¢ Font Style: ${customization.fontStyle}\n`;
    message += `â€¢ Thread Color: ${customization.embroideryColor}\n`;
    if (customization.giftWrap) {
      message += `â€¢ Gift Wrapping: Yes ðŸŽ\n`;
      if (customization.giftMessage) {
        message += `â€¢ Gift Card Message: "${customization.giftMessage}"\n`;
      }
    }
    if (customization.specialNotes) {
      message += `â€¢ Special Instructions: ${customization.specialNotes}\n`;
    }
  }

  message += `\nPlease let me know availability and production timeline. Thank you! âœ¨`;
  return message;
}

/** Opens a pre-filled WhatsApp chat for ordering a single product. */
// export function openWhatsAppOrder(
//   product: Product,
//   size?: string,
//   color?: string,
//   customization?: CustomizationDetails,
// ) {
//   const message = buildWhatsAppOrderMessage(product, size, color, customization);
//   const encoded = encodeURIComponent(message);
//   window.open(`https://api.whatsapp.com/send?phone=919539794665&text=${encoded}`);
// }


export function openWhatsAppOrder(
  product: Product,
  size?: string,
  color?: string,
  customization?: CustomizationDetails,
) {
  const message = buildWhatsAppOrderMessage(product, size, color, customization);
  const encoded = encodeURIComponent(message);
  const phone = "919539794665"; // no +, no leading 0, country code + number

  const url = `https://wa.me/${phone}?text=${encoded}`;

  // window.open must be called synchronously inside the click handler,
  // not after an await/async gap — otherwise browsers treat it as a
  // popup and block it (which can also look like "nothing happened
  // / generic app opened").
  window.open(url, "_blank", "noopener,noreferrer");
}