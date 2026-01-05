"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
const admin_schema_1 = require("./admin.schema");
const service = new admin_service_1.AdminService();
class AdminController {
    async register(req, res) {
        const data = admin_schema_1.AdminSchema.parse(req.body);
        const admin = await service.register(data);
        return res.status(201).json({
            id: admin.id,
            email: admin.email,
        });
    }
}
exports.AdminController = AdminController;
