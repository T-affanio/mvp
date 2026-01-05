import { PromotionDiscount } from "./applyPromotion";

export function mapPromotionToDiscount(
  promo: {
    discountType: "FIXED" | "PERCENT" | null;
    discountValue: number | null;
  } | null
): PromotionDiscount | undefined {
  if (!promo) return undefined;

  if (!promo.discountType || promo.discountValue === null) {
    return undefined;
  }

  return {
    discountType: promo.discountType,
    discountValue: promo.discountValue,
  };
}
