"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const prisma_1 = require("../../libs/prisma");
class OrderRepository {
    create(data) {
        return prisma_1.prisma.order.create({
            data,
            include: {
                items: true,
            },
        });
    }
    findAll() {
        return prisma_1.prisma.order.findMany({
            include: { items: true },
            orderBy: { createdAt: "desc" },
        });
    }
    findById(id) {
        return prisma_1.prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });
    }
    // findAllWithItems() {
    //   return prisma.order.findMany({
    //     include: {
    //       items: true,
    //     },
    //   });
    // }
    updateStatus(id, status) {
        return prisma_1.prisma.order.update({
            where: { id },
            data: { status },
        });
    }
}
exports.OrderRepository = OrderRepository;
