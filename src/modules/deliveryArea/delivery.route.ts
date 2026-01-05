import { Router } from "express";
import { DeliveryAreaController } from "./delivery.controller";
import { ensureAuth } from "../../shared/middleware/ensureAuth";

const router = Router();
const controller = new DeliveryAreaController();

router.post("/",ensureAuth, controller.create.bind(controller));
router.get("/",controller.list.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
router.put("/:id",ensureAuth, controller.update.bind(controller));


export { router as deliveryAreaRoutes };
