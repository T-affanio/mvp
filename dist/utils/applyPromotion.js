"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPromotion = applyPromotion;
function applyPromotion(price, promotion) {
    if (!promotion)
        return price;
    if (promotion.discountType === "PERCENT") {
        const discount = price * (promotion.discountValue / 100);
        return Math.max(price - discount, 0);
    }
    if (promotion.discountType === "FIXED") {
        return Math.max(price - promotion.discountValue, 0);
    }
    return price;
}
