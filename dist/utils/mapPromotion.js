"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPromotionToDiscount = mapPromotionToDiscount;
function mapPromotionToDiscount(promo) {
    if (!promo)
        return undefined;
    if (!promo.discountType || promo.discountValue === null) {
        return undefined;
    }
    return {
        discountType: promo.discountType,
        discountValue: promo.discountValue,
    };
}
