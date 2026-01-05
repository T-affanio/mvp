"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionRepository = void 0;
const prisma_1 = require("../../libs/prisma");
class PromotionRepository {
    createPromotion(data) {
        return prisma_1.prisma.promotion.create({ data });
    }
    findAll() {
        return prisma_1.prisma.promotion.findMany({
            include: {
                products: { include: { product: true } },
                combos: {
                    include: {
                        items: { include: { product: true } },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }
    findActiveByProduct(productId) {
        return prisma_1.prisma.promotion.findFirst({
            where: {
                active: true,
                type: "PRODUCT",
                products: {
                    some: { productId },
                },
                OR: [
                    { startAt: null },
                    { startAt: { lte: new Date() } },
                ],
                AND: [
                    {
                        OR: [
                            { endAt: null },
                            { endAt: { gte: new Date() } },
                        ],
                    },
                ],
            },
        });
    }
    findActive() {
        return prisma_1.prisma.promotion.findMany({
            where: {
                active: true,
                type: "PRODUCT",
                OR: [
                    { startAt: null },
                    { startAt: { lte: new Date() } },
                ],
                AND: [
                    {
                        OR: [
                            { endAt: null },
                            { endAt: { gte: new Date() } },
                        ],
                    },
                ],
            },
            include: {
                products: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
    updateStatus(id, active) {
        return prisma_1.prisma.promotion.update({
            where: { id },
            data: { active },
        });
    }
    async deleteWithRelations(id) {
        return prisma_1.prisma.$transaction([
            prisma_1.prisma.promotionComboItem.deleteMany({
                where: {
                    combo: {
                        promotionId: id,
                    },
                },
            }),
            prisma_1.prisma.promotionCombo.deleteMany({
                where: {
                    promotionId: id,
                },
            }),
            prisma_1.prisma.promotionProduct.deleteMany({
                where: {
                    promotionId: id,
                },
            }),
            prisma_1.prisma.promotion.delete({
                where: { id },
            }),
        ]);
    }
    // mantém o delete simples se precisar em outro lugar
    delete(id) {
        return prisma_1.prisma.promotion.delete({ where: { id } });
    }
}
exports.PromotionRepository = PromotionRepository;
