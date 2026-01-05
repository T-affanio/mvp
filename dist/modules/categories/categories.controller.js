"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const categories_service_1 = require("./categories.service");
const categories_schema_1 = require("./categories.schema");
const service = new categories_service_1.CategoryService();
class CategoryController {
    async create(req, res) {
        const data = categories_schema_1.createCategorySchema.parse(req.body);
        const category = await service.create(data);
        return res.status(201).json(category);
    }
    async list(req, res) {
        const categories = await service.list();
        return res.json(categories);
    }
    async getById(req, res) {
        const { id } = req.params;
        const category = await service.getById(id);
        return res.json(category);
    }
    async update(req, res) {
        const { id } = req.params;
        const data = categories_schema_1.updateCategorySchema.parse(req.body);
        const result = await service.update(id, data);
        return res.json(result);
    }
    async remove(req, res) {
        const { id } = req.params;
        const result = await service.remove(id);
        return res.json(result);
    }
}
exports.CategoryController = CategoryController;
