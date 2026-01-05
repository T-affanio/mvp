import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { categoryRoutes } from "../modules/categories/categories.route";
import { productRoutes } from "../modules/product/products.route";
import { adminRoute } from "../modules/admin/admin.route";
import { orderRoutes } from "../modules/order/order.route";
import { deliveryAreaRoutes } from "../modules/deliveryArea/delivery.route";
import promotionRouter from "../modules/promotion/promotion.route";
import storeSettingsRouter from "../modules/settings/settings.route";

export const mainRoute = Router();

mainRoute.get("/ping", (req, res) => {
  res.json({ pong: true });
});

mainRoute.use('/auth',authRoutes);
mainRoute.use(adminRoute);
mainRoute.use(categoryRoutes);
mainRoute.use("/products", productRoutes);
mainRoute.use("/orders", orderRoutes);
mainRoute.use("/delivery-area", deliveryAreaRoutes);
mainRoute.use("/promotions", promotionRouter);
mainRoute.use("/settings", storeSettingsRouter);

export default mainRoute;
