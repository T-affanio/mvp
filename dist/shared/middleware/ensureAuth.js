"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuth = ensureAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function ensureAuth(req, res, next) {
    console.log("🔐 ensureAuth:", req.method, req.originalUrl);
    // 👉 deixa o CORS preflight passar
    if (req.method === "OPTIONS") {
        return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    }
    const [, token] = authHeader.split(" ");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.sub;
        return next();
    }
    catch {
        return res.status(401).json({ message: "Invalid token" });
    }
}
