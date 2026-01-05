"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const prisma_1 = require("../../libs/prisma");
class AuthRepository {
    findByEmail(email) {
        return prisma_1.prisma.admin.findUnique({
            where: { email },
        });
    }
}
exports.AuthRepository = AuthRepository;
