"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const promises_1 = __importDefault(require("fs/promises"));
const logger_1 = require("../../shared/logger");
const error_1 = require("../../shared/err/error");
const categories_repository_1 = require("../categories/categories.repository");
const product_repository_1 = require("./product.repository");
class ProductService {
    constructor() {
        this.repo = new product_repository_1.ProductRepository();
        this.categories = new categories_repository_1.CategoryRepository();
    }
    async uploadImage(path) {
        try {
            const upload = await cloudinary_1.default.uploader.upload(path, {
                folder: "products",
            });
            await promises_1.default.unlink(path);
            return upload.secure_url;
        }
        catch {
            throw new error_1.AppError("Falha ao enviar imagem", 500);
        }
    }
    async create(data, filePaths) {
        for (const file of filePaths) {
            const url = await this.uploadImage(file);
            data.images.push(url);
        }
        if (data.categoryId) {
            const exists = await this.categories.findById(data.categoryId);
            if (!exists) {
                throw new error_1.AppError("Categoria não encontrada", 404);
            }
        }
        logger_1.logger.info("[ProductService] Criando produto");
        return this.repo.create({
            ...data,
            variations: data.variations ?? [],
        });
    }
    async listMostOrdered() {
        return this.repo.findMostOrdered();
    }
    async list() {
        logger_1.logger.info("[ProductService] Listando produtos");
        return this.repo.findAll();
    }
}
exports.ProductService = ProductService;
