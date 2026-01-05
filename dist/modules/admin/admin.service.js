"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_1 = require("../../shared/err/error");
const admin_repository_1 = require("./admin.repository");
class AdminService {
    constructor() {
        this.repo = new admin_repository_1.AdminRepository();
    }
    async register(data) {
        const exist = await this.repo.findByEmail(data.email);
        if (exist) {
            throw new error_1.AppError("este email ja esta em uso", 409);
        }
        const hash = await bcryptjs_1.default.hash(data.password, 10);
        return this.repo.create({
            name: data.name,
            email: data.email,
            password: hash,
            role: "OWNER",
            address: data.address,
        });
    }
}
exports.AdminService = AdminService;
