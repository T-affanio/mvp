"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSettingsRepository = void 0;
const prisma_1 = require("../../libs/prisma");
class StoreSettingsRepository {
    findFirst() {
        return prisma_1.prisma.storeSettings.findFirst();
    }
    create(data) {
        return prisma_1.prisma.storeSettings.create({ data });
    }
    update(id, data) {
        return prisma_1.prisma.storeSettings.update({
            where: { id },
            data,
        });
    }
}
exports.StoreSettingsRepository = StoreSettingsRepository;
