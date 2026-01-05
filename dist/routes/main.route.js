"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoute = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const categories_route_1 = require("../modules/categories/categories.route");
const products_route_1 = require("../modules/product/products.route");
const admin_route_1 = require("../modules/admin/admin.route");
const order_route_1 = require("../modules/order/order.route");
const delivery_route_1 = require("../modules/deliveryArea/delivery.route");
const promotion_route_1 = __importDefault(require("../modules/promotion/promotion.route"));
const settings_route_1 = __importDefault(require("../modules/settings/settings.route"));
exports.mainRoute = (0, express_1.Router)();
exports.mainRoute.get("/ping", (req, res) => {
    res.json({ pong: true });
});
exports.mainRoute.use('/auth', auth_route_1.authRoutes);
exports.mainRoute.use(admin_route_1.adminRoute);
exports.mainRoute.use(categories_route_1.categoryRoutes);
exports.mainRoute.use("/products", products_route_1.productRoutes);
exports.mainRoute.use("/orders", order_route_1.orderRoutes);
exports.mainRoute.use("/delivery-area", delivery_route_1.deliveryAreaRoutes);
exports.mainRoute.use("/promotions", promotion_route_1.default);
exports.mainRoute.use("/settings", settings_route_1.default);
exports.default = exports.mainRoute;
