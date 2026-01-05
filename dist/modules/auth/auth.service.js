"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../shared/auth/jwt");
const auth_repository_1 = require("./auth.repository");
const error_1 = require("../../shared/err/error");
class AuthService {
    constructor(repo = new auth_repository_1.AuthRepository()) {
        this.repo = repo;
    }
    async login(email, password) {
        const admin = await this.repo.findByEmail(email);
        if (!admin) {
            throw new error_1.AppError("Credenciais inválidas", 401);
        }
        const passwordMatch = await bcryptjs_1.default.compare(password, admin.password);
        if (!passwordMatch) {
            throw new error_1.AppError("Credenciais inválidas", 401);
        }
        const token = (0, jwt_1.signToken)({
            sub: admin.id,
            role: admin.role,
        });
        return {
            token,
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        };
    }
}
exports.AuthService = AuthService;
