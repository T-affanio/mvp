import { Request, Response } from "express";
import { PromotionService } from "./promotion.service";
import {
  createProductPromotionSchema,
  createComboPromotionSchema,
  updatePromotionStatusSchema,
} from "./promotion.schema";

export class PromotionController {
  private service = new PromotionService();

  async createProduct(req: Request, res: Response) {
    const parsed = createProductPromotionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const promo = await this.service.createProductPromotion(parsed.data);
    return res.status(201).json(promo);
  }

  async createCombo(req: Request, res: Response) {
    const parsed = createComboPromotionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const promo = await this.service.createComboPromotion(parsed.data);
    return res.status(201).json(promo);
  }

  async list(req: Request, res: Response) {
    const promos = await this.service.list();
    return res.json(promos);
  }

  async toggle(req: Request, res: Response) {
    const { id } = req.params;

    const parsed = updatePromotionStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const promo = await this.service.toggle(id, parsed.data.active);
    return res.json(promo);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.service.delete(id);

    // 204 = sucesso sem body
    return res.status(204).send();
  }
  async listActive(req: Request, res: Response) {
    const promos = await this.service.listActive();
    return res.json(promos);
  }
}
