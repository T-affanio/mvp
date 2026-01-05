"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const routes = (0, express_1.Router)();
exports.adminRoute = routes;
const controller = new admin_controller_1.AdminController();
// ⚠️ USAR SÓ EM DEV
routes.post("/register", controller.register);
