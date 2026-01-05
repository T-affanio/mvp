"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const prisma_1 = require("../../libs/prisma");
class ProductRepository {
    create(data) {
        return prisma_1.prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                categoryId: data.categoryId ?? null,
                images: {
                    create: data.images.map(url => ({ url })),
                },
            },
            include: {
                images: true,
                category: true,
            },
        });
    }
    findAll() {
        return prisma_1.prisma.product.findMany({
            include: {
                images: true,
                category: true,
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
