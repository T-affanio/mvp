"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_schema_1 = require("./auth.schema");
const auth_service_1 = require("./auth.service");
const service = new auth_service_1.AuthService();
class AuthController {
    async login(req, res) {
        const data = auth_schema_1.loginSchema.parse(req.body);
        const result = await service.login(data.email, data.password);
        return res.json(result);
    }
}
exports.AuthController = AuthController;
