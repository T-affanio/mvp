"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoute = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const categories_route_1 = require("../modules/categories/categories.route");
const products_route_1 = require("../modules/product/products.route");
exports.mainRoute = (0, express_1.Router)();
exports.mainRoute.get("/ping", (req, res) => {
    res.json({ pong: true });
});
exports.mainRoute.use(auth_route_1.authRoutes);
exports.mainRoute.use(categories_route_1.categoryRoutes);
exports.mainRoute.use("/products", products_route_1.productRoutes);
exports.default = exports.mainRoute;
