"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionService = void 0;
const promotion_repository_1 = require("./promotion.repository");
class PromotionService {
    constructor() {
        this.repo = new promotion_repository_1.PromotionRepository();
    }
    async createProductPromotion(data) {
        return this.repo.createPromotion({
            name: data.name,
            type: "PRODUCT",
            active: true,
            discountType: data.discountType,
            discountValue: data.discountValue,
            startAt: data.startAt ? new Date(data.startAt) : null,
            endAt: data.endAt ? new Date(data.endAt) : null,
            products: {
                create: data.productIds.map((productId) => ({
                    productId,
                })),
            },
        });
    }
    async createComboPromotion(data) {
        return this.repo.createPromotion({
            name: data.name,
            type: "COMBO",
            active: true,
            startAt: data.startAt ? new Date(data.startAt) : null,
            endAt: data.endAt ? new Date(data.endAt) : null,
            combos: {
                create: {
                    price: data.price,
                    items: {
                        create: data.items.map((item) => ({
                            product: item.productId,
                            quantity: item.quantity,
                        })),
                    },
                },
            },
        });
    }
    // ✅ AQUI ESTÁ A CORREÇÃO
    async getActiveForProduct(productId) {
        return this.repo.findActiveByProduct(productId);
    }
    list() {
        return this.repo.findAll();
    }
    listActive() {
        return this.repo.findActive();
    }
    toggle(id, active) {
        return this.repo.updateStatus(id, active);
    }
    delete(id) {
        return this.repo.deleteWithRelations(id);
    }
}
exports.PromotionService = PromotionService;
