"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const prisma_1 = require("../../libs/prisma");
class AdminRepository {
    findByEmail(email) {
        return prisma_1.prisma.admin.findUnique({ where: { email } });
    }
    create(data) {
        return prisma_1.prisma.admin.create({ data });
    }
}
exports.AdminRepository = AdminRepository;
