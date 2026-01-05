"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const products_controller_1 = require("./products.controller");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const ensureAuth_1 = require("../../shared/middleware/ensureAuth");
exports.productRoutes = (0, express_1.Router)();
const controller = new products_controller_1.ProductController();
// diretório temporário
const uploadDir = path_1.default.resolve(process.cwd(), "tmp");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
// multer
const upload = (0, multer_1.default)({ dest: uploadDir });
// ---------------- ROUTES ----------------
exports.productRoutes.get("/", controller.list.bind(controller));
exports.productRoutes.post("/", ensureAuth_1.ensureAuth, upload.array("images", 1), controller.create.bind(controller));
exports.productRoutes.get("/most-ordered", controller.mostOrdered.bind(controller));
