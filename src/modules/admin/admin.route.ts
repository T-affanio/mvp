import { Router } from "express";
import { AdminController } from "./admin.controller";

const routes = Router();
const controller = new AdminController();

// ⚠️ USAR SÓ EM DEV
routes.post("/register", controller.register);

export { routes as adminRoute };
