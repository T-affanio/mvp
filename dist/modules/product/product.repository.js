"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const prisma_1 = require("../../libs/prisma");
class ProductRepository {
    create(data) {
        const lowestPrice = Math.min(...data.variations.map((v) => v.price));
        return prisma_1.prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: lowestPrice, // 👈 fallback / menor preço
                categoryId: data.categoryId ?? null,
                variations: {
                    create: data.variations,
                },
                images: {
                    create: data.images.map((url) => ({ url })),
                },
            },
            include: {
                images: true,
                category: true,
                variations: true,
            },
        });
    }
    async findMostOrdered() {
        const orders = await prisma_1.prisma.order.findMany({
            include: {
                items: true,
            },
        });
        const countMap = new Map();
        for (const order of orders) {
            for (const item of order.items) {
                countMap.set(item.productId, (countMap.get(item.productId) || 0) + item.quantity);
            }
        }
        if (countMap.size === 0)
            return [];
        const products = await prisma_1.prisma.product.findMany({
            where: {
                id: { in: Array.from(countMap.keys()) },
                active: true,
            },
            include: {
                images: true, // 👈 agora vem imagem
            },
        });
        return products.sort((a, b) => (countMap.get(b.id) || 0) - (countMap.get(a.id) || 0));
    }
    findAll() {
        return prisma_1.prisma.product.findMany({
            include: {
                images: true,
                category: true,
                variations: true, // 👈 ESSENCIAL
            },
            orderBy: { createdAt: "desc" },
        });
    }
    findById(id) {
        return prisma_1.prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
                category: true,
                variations: true,
            },
        });
    }
    delete(id) {
        return prisma_1.prisma.product.delete({
            where: { id },
        });
    }
}
exports.ProductRepository = ProductRepository;
