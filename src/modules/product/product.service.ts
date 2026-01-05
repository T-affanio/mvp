import cloudinary from "../../config/cloudinary";
import fs from "fs/promises";
import { logger } from "../../shared/logger";
import { AppError } from "../../shared/err/error";
import { CategoryRepository } from "../categories/categories.repository";
import { CreateProductDTO } from "./products.schema";
import { ProductRepository } from "./product.repository";

export class ProductService {
  private repo = new ProductRepository();
  private categories = new CategoryRepository();

  private async uploadImage(path: string) {
    try {
      const upload = await cloudinary.uploader.upload(path, {
        folder: "products",
      });

      await fs.unlink(path);
      return upload.secure_url;
    } catch {
      throw new AppError("Falha ao enviar imagem", 500);
    }
  }

  async create(data: CreateProductDTO, filePaths: string[]) {
    for (const file of filePaths) {
      const url = await this.uploadImage(file);
      data.images.push(url);
    }

    if (data.categoryId) {
      const exists = await this.categories.findById(data.categoryId);
      if (!exists) {
        throw new AppError("Categoria não encontrada", 404);
      }
    }

    logger.info("[ProductService] Criando produto");

   return this.repo.create({
  ...data,
  variations: data.variations ?? [],
});

  }
  async listMostOrdered() {
    return this.repo.findMostOrdered();
  }

  async list() {
    logger.info("[ProductService] Listando produtos");
    return this.repo.findAll();
  }
}
