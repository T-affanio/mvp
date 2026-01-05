import { Request, Response } from "express";
import { loginSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

const service = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const result = await service.login(
      data.email,
      data.password
    );

    return res.json(result);
  }
}
