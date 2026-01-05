import { Request, Response } from "express";
import { createProductSchema } from "./products.schema";
import { ProductService } from "./product.service";

export class ProductController {
  private service = new ProductService();

  private parseFiles(req: Request): string[] {
    const files = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files || {}).flat();

    return files.map((f) => f.path);
  }

  async create(req: Request, res: Response) {
    try {
      // 🔥 CONVERSÃO OBRIGATÓRIA DO multipart
      if (typeof req.body.variations === "string") {
        req.body.variations = JSON.parse(req.body.variations);
      }

      const paths = this.parseFiles(req);

      const parsed = createProductSchema.parse({
        ...req.body,
        images: [],
      });

      const product = await this.service.create(parsed, paths);
      return res.status(201).json(product);
    } catch (err) {
      console.error(err);
      return res.status(400).json(err);
    }
  }

  async list(req: Request, res: Response) {
    const products = await this.service.list();
    return res.json(products);
  }
  async mostOrdered(req: Request, res: Response) {
    const products = await this.service.listMostOrdered();
    return res.json(products);
  }
}
