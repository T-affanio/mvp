"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryAreaRepository = void 0;
const prisma_1 = require("../../libs/prisma");
class DeliveryAreaRepository {
    create(data) {
        return prisma_1.prisma.deliveryArea.create({ data });
    }
    findAll() {
        return prisma_1.prisma.deliveryArea.findMany({
            orderBy: { name: "asc" },
        });
    }
    findById(id) {
        return prisma_1.prisma.deliveryArea.findUnique({
            where: { id },
        });
    }
    update(id, data) {
        return prisma_1.prisma.deliveryArea.update({
            where: { id },
            data,
        });
    }
    remove(id) {
        return prisma_1.prisma.deliveryArea.delete({ where: { id } });
    }
}
exports.DeliveryAreaRepository = DeliveryAreaRepository;
