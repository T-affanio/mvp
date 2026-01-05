import cron from "node-cron";
import { StoreSettingsService } from "../modules/settings/settings.service";

const service = new StoreSettingsService();

export function startStoreStatusJob() {
  cron.schedule("* * * * *", async () => {
    await service["recompute"]();
  });
}
