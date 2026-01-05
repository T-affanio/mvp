"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSettingsService = void 0;
const client_1 = require("../../generated/prisma/client");
const storeHours_1 = require("../../utils/storeHours");
const settings_repository_1 = require("./settings.repository");
class StoreSettingsService {
    constructor() {
        this.repo = new settings_repository_1.StoreSettingsRepository();
    }
    async getSettings() {
        let settings = await this.repo.findFirst();
        if (!settings) {
            settings = await this.repo.create({
                isOpen: false,
                acceptOrders: false,
                manuallyPaused: false,
                openingHours: client_1.Prisma.JsonNull,
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
        const openingHours = settings.openingHours;
        const now = new Date();
        const shouldBeOpen = (0, storeHours_1.isWithinOpeningHours)(openingHours, now);
        return this.repo.update(settings.id, {
            isOpen: shouldBeOpen,
            acceptOrders: shouldBeOpen && !settings.manuallyPaused,
        });
    }
    async updateSettings(data) {
        const settings = await this.getSettings();
        await this.repo.update(settings.id, {
            ...(data.openingHours !== undefined && {
                openingHours: data.openingHours,
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
    async canAcceptOrders() {
        const settings = await this.recompute();
        return settings.acceptOrders;
    }
}
exports.StoreSettingsService = StoreSettingsService;
