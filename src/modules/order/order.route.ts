import { Router } from "express";

import { OrderController } from "./order.controller";
import { ensureAuth } from "../../shared/middleware/ensureAuth";

export const orderRoutes = Router();
const controller = new OrderController();

orderRoutes.post("/", controller.create.bind(controller));
orderRoutes.get("/", controller.list.bind(controller));
// orderRoutes.get("/most-ordered", controller.mostOrdered.bind(controller));
orderRoutes.patch(
  "/:id/status",ensureAuth,

  controller.updateStatus.bind(controller)
);
