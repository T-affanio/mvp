import { Router } from "express";
import { ProductController } from "./products.controller";

import fs from "fs";
import path from "path";
import multer from "multer";
import { ensureAuth } from "../../shared/middleware/ensureAuth";

export const productRoutes = Router();
const controller = new ProductController();


// diretório temporário
const uploadDir = path.resolve(process.cwd(), "tmp");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// multer
const upload = multer({ dest: uploadDir });

// ---------------- ROUTES ----------------
productRoutes.get("/", controller.list.bind(controller));

productRoutes.post(
  "/",ensureAuth,
  upload.array("images", 1),
  controller.create.bind(controller)
);
productRoutes.get("/most-ordered", controller.mostOrdered.bind(controller));
