import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { AdminSchema } from "./admin.schema";

const service = new AdminService();

export class AdminController {
  async register(req: Request, res: Response) {
    const data = AdminSchema.parse(req.body);

    const admin = await service.register(data);

    return res.status(201).json({
      id: admin.id,
      email: admin.email,
    });
  }
}
