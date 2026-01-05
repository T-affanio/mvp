"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const prisma_1 = require("../../libs/prisma");
class CategoryRepository {
    findById(id) {
        return prisma_1.prisma.category.findUnique({
            where: { id },
        });
    }
    getAll() {
        return prisma_1.prisma.category.findMany({
            orderBy: { createdAt: "asc" },
        });
    }
    findByName(name) {
        return prisma_1.prisma.category.findFirst({
            where: { name },
        });
    }
    create(data) {
        return prisma_1.prisma.category.create({
            data: {
                name: data.name,
            },
        });
    }
    update(id, data) {
        return prisma_1.prisma.category.update({
            where: { id },
            data,
        });
    }
    delete(id) {
        return prisma_1.prisma.category.delete({
            where: { id },
        });
    }
}
exports.CategoryRepository = CategoryRepository;
