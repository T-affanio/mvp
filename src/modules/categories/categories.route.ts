import { Router } from "express";
import { CategoryController } from "./categories.controller";
import { ensureAuth } from "../../shared/middleware/ensureAuth";

const router = Router();
const controller = new CategoryController();



router.post("/categories", ensureAuth,controller.create.bind(controller));
router.get("/categories", controller.list.bind(controller));
router.get("/categories/:id", controller.getById.bind(controller));
router.put("/categories/:id", ensureAuth,controller.update.bind(controller));
router.delete("/categories/:id",ensureAuth, controller.remove.bind(controller));

export { router as categoryRoutes };
