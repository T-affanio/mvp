import { Request, Response } from "express";
import { CategoryService } from "./categories.service";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./categories.schema";

const service = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response) {
    const data = createCategorySchema.parse(req.body);

    const category = await service.create(data);
    return res.status(201).json(category);
  }

  async list(req: Request, res: Response) {
    const categories = await service.list();
    return res.json(categories);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const category = await service.getById(id);
    return res.json(category);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = updateCategorySchema.parse(req.body);

    const result = await service.update(id, data);
    return res.json(result);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;

    const result = await service.remove(id);
    return res.json(result);
  }
}
