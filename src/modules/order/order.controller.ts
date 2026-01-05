import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { createOrderSchema, updateOrderStatusSchema } from "./order.schema";

export class OrderController {
  private service = new OrderService();

  async create(req: Request, res: Response) {
    const parsed = createOrderSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const order = await this.service.create(parsed.data);
    return res.status(201).json(order);
  }
  // async mostOrdered(req: Request, res: Response) {
  //   const products = await this.service.getMostOrderedProducts();
  //   return res.json(products);
  // }
  async list(req: Request, res: Response) {
    const orders = await this.service.list();
    return res.json(orders);
  }

  async updateStatus(req: Request, res: Response) {
    const { id } = req.params;

    const parsed = updateOrderStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const order = await this.service.updateStatus(id, parsed.data.status);

    return res.json(order);
  }
}
