"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionController = void 0;
const promotion_service_1 = require("./promotion.service");
const promotion_schema_1 = require("./promotion.schema");
class PromotionController {
    constructor() {
        this.service = new promotion_service_1.PromotionService();
    }
    async createProduct(req, res) {
        const parsed = promotion_schema_1.createProductPromotionSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error.format());
        }
        const promo = await this.service.createProductPromotion(parsed.data);
        return res.status(201).json(promo);
    }
    async createCombo(req, res) {
        const parsed = promotion_schema_1.createComboPromotionSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error.format());
        }
        const promo = await this.service.createComboPromotion(parsed.data);
        return res.status(201).json(promo);
    }
    async list(req, res) {
        const promos = await this.service.list();
        return res.json(promos);
    }
    async toggle(req, res) {
        const { id } = req.params;
        const parsed = promotion_schema_1.updatePromotionStatusSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error.format());
        }
        const promo = await this.service.toggle(id, parsed.data.active);
        return res.json(promo);
    }
    async delete(req, res) {
        const { id } = req.params;
        await this.service.delete(id);
        // 204 = sucesso sem body
        return res.status(204).send();
    }
    async listActive(req, res) {
        const promos = await this.service.listActive();
        return res.json(promos);
    }
}
exports.PromotionController = PromotionController;
