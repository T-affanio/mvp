import { Router } from "express";
import { PromotionController } from "./promotion.controller";
import { ensureAuth } from "../../shared/middleware/ensureAuth";

const promotionRouter = Router();
const controller = new PromotionController();

promotionRouter.post("/product", controller.createProduct.bind(controller));
promotionRouter.post("/combo", controller.createCombo.bind(controller));

promotionRouter.get("/", controller.list.bind(controller));
promotionRouter.patch("/:id/status",ensureAuth, controller.toggle.bind(controller));
promotionRouter.delete("/:id", ensureAuth,controller.delete.bind(controller));
promotionRouter.get("/active", controller.listActive.bind(controller));

export default promotionRouter;
