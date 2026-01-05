import { Request, Response } from "express";
import { StoreSettingsService } from "./settings.service";
import { updateStoreSettingsSchema } from "./settings.schema";

export class StoreSettingsController {
  private service = new StoreSettingsService();

  get = async (_: Request, res: Response) => {
    const settings = await this.service.recompute();
    res.json(settings);
  };

  update = async (req: Request, res: Response) => {
    const parsed = updateStoreSettingsSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const settings = await this.service.updateSettings(parsed.data);
    res.json(settings);
  };

  pause = async (_: Request, res: Response) => {
    const settings = await this.service.pause();
    res.json(settings);
  };

  resume = async (_: Request, res: Response) => {
    const settings = await this.service.resume();
    res.json(settings);
  };
}
