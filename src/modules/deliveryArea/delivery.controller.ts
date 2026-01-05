import { Request, Response } from "express";
import { DeliveryAreaService } from "./delivery.service";
import { createDeliveryAreaSchema, updateDeliveryAreaSchema } from "./delivery.schema";

export class DeliveryAreaController {
  private service = new DeliveryAreaService();

  async create(req: Request, res: Response) {
    const parsed = createDeliveryAreaSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const area = await this.service.create(parsed.data);
    return res.status(201).json(area);
  }

  async list(req: Request, res: Response) {
    const areas = await this.service.list();
    return res.json(areas);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;

    const parsed = updateDeliveryAreaSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const area = await this.service.update(id, parsed.data);
    return res.json(area);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.service.delete(id);
    return res.json(result);
  }
}
