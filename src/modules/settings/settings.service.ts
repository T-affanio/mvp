import { Prisma } from "../../generated/prisma/client";
import { OpeningHours } from "../../types/storeHours";
import {
  getDayKey,
  isWithinOpeningHours,
} from "../../utils/storeHours";
import { StoreSettingsRepository } from "./settings.repository";

type UpdateSettingsDTO = {
  openingHours?: OpeningHours | null;
};

export class StoreSettingsService {
  private repo = new StoreSettingsRepository();

  async getSettings() {
    let settings = await this.repo.findFirst();

    if (!settings) {
      settings = await this.repo.create({
        isOpen: false,
        acceptOrders: false,
        manuallyPaused: false,
        openingHours: Prisma.JsonNull,
      });
    }

    return settings;
  }

  /**
   * 🔄 Recalcula status FINAL da loja
   * - horário automático
   * - pausa manual respeitada
   */
async recompute() {
  const settings = await this.getSettings();

  if (!settings.openingHours) {
    return settings;
  }

  const openingHours = settings.openingHours as OpeningHours;
  const now = new Date();

  const shouldBeOpen = isWithinOpeningHours(openingHours, now);

  return this.repo.update(settings.id, {
    isOpen: shouldBeOpen,
    acceptOrders: shouldBeOpen && !settings.manuallyPaused,
  });
}


  async updateSettings(data: UpdateSettingsDTO) {
    const settings = await this.getSettings();

    await this.repo.update(settings.id, {
      ...(data.openingHours !== undefined && {
        openingHours: data.openingHours as Prisma.InputJsonValue,
      }),
    });

    return this.recompute();
  }

  /**
   * ⏸️ Pausa manual (admin)
   */
  async pause() {
    const settings = await this.getSettings();

    await this.repo.update(settings.id, {
      manuallyPaused: true,
      acceptOrders: false,
    });

    return this.getSettings();
  }

  /**
   * ▶️ Retomar pedidos (se estiver no horário)
   */
  async resume() {
    const settings = await this.getSettings();

    if (!settings.isOpen) {
      return settings;
    }

    await this.repo.update(settings.id, {
      manuallyPaused: false,
      acceptOrders: true,
    });

    return this.getSettings();
  }

  /**
   * 🔐 Checkout
   */
  async canAcceptOrders(): Promise<boolean> {
    const settings = await this.recompute();
    return settings.acceptOrders;
  }
}
