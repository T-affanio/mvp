"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const error_1 = require("../../shared/err/error");
const logger_1 = require("../../shared/logger");
const categories_repository_1 = require("./categories.repository");
class CategoryService {
    constructor() {
        this.repo = new categories_repository_1.CategoryRepository();
    }
    async create(data) {
        logger_1.logger.info("Criando categoria");
        const name = this.normalizeName(data.name);
        const alreadyExists = await this.repo.findByName(name);
        if (alreadyExists) {
            throw new error_1.AppError("Categoria já existe", 409);
        }
        return this.repo.create({ name });
    }
    async list() {
        return this.repo.getAll();
    }
    async getById(categoryId) {
        const category = await this.repo.findById(categoryId);
        if (!category) {
            throw new error_1.AppError("Categoria não encontrada", 404);
        }
        return category;
    }
    async update(categoryId, data) {
        const name = this.normalizeName(data.name);
        const category = await this.repo.findById(categoryId);
        if (!category) {
            throw new error_1.AppError("Categoria não encontrada", 404);
        }
        const duplicated = await this.repo.findByName(name);
        if (duplicated && duplicated.id !== categoryId) {
            throw new error_1.AppError("Já existe outra categoria com esse nome", 409);
        }
        await this.repo.update(categoryId, { name });
        return {
            message: "Categoria atualizada com sucesso",
        };
    }
    async remove(categoryId) {
        const category = await this.repo.findById(categoryId);
        if (!category) {
            throw new error_1.AppError("Categoria não encontrada", 404);
        }
        await this.repo.delete(categoryId);
        return {
            message: "Categoria removida com sucesso",
        };
    }
    normalizeName(name) {
        return name.trim().toLowerCase();
    }
}
exports.CategoryService = CategoryService;
