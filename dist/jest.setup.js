"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const prisma_1 = require("./libs/prisma");
beforeAll(async () => {
    await prisma_1.prisma.$connect();
});
afterAll(async () => {
    await prisma_1.prisma.$disconnect();
});
