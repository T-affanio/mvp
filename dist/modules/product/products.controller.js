"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const products_schema_1 = require("./products.schema");
const product_service_1 = require("./product.service");
class ProductController {
    constructor() {
        this.service = new product_service_1.ProductService();
    }
    parseFiles(req) {
        const files = Array.isArray(req.files)
            ? req.files
            : Object.values(req.files || {}).flat();
        return files.map((f) => f.path);
    }
    async create(req, res) {
        try {
            // 🔥 CONVERSÃO OBRIGATÓRIA DO multipart
            if (typeof req.body.variations === "string") {
                req.body.variations = JSON.parse(req.body.variations);
            }
            const paths = this.parseFiles(req);
            const parsed = products_schema_1.createProductSchema.parse({
                ...req.body,
                images: [],
            });
            const product = await this.service.create(parsed, paths);
            return res.status(201).json(product);
        }
        catch (err) {
            console.error(err);
            return res.status(400).json(err);
        }
    }
    async list(req, res) {
        const products = await this.service.list();
        return res.json(products);
    }
    async mostOrdered(req, res) {
        const products = await this.service.listMostOrdered();
        return res.json(products);
    }
}
exports.ProductController = ProductController;
