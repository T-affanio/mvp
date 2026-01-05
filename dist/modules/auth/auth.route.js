"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
exports.authRoutes = router;
const controller = new auth_controller_1.AuthController();
router.post('/login', (req, res) => controller.login(req, res));
