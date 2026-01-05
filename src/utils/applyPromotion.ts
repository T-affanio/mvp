export type PromotionDiscount = {
  discountType: "FIXED" | "PERCENT";
  discountValue: number;
};

export function applyPromotion(
  price: number,
  promotion?: PromotionDiscount
): number {
  if (!promotion) return price;

  if (promotion.discountType === "PERCENT") {
    const discount = price * (promotion.discountValue / 100);
    return Math.max(price - discount, 0);
  }

  if (promotion.discountType === "FIXED") {
    return Math.max(price - promotion.discountValue, 0);
  }

  return price;
}
