"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSettingsController = void 0;
const settings_service_1 = require("./settings.service");
const settings_schema_1 = require("./settings.schema");
class StoreSettingsController {
    constructor() {
        this.service = new settings_service_1.StoreSettingsService();
        this.get = async (_, res) => {
            const settings = await this.service.recompute();
            res.json(settings);
        };
        this.update = async (req, res) => {
            const parsed = settings_schema_1.updateStoreSettingsSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json(parsed.error.format());
            }
            const settings = await this.service.updateSettings(parsed.data);
            res.json(settings);
        };
        this.pause = async (_, res) => {
            const settings = await this.service.pause();
            res.json(settings);
        };
        this.resume = async (_, res) => {
            const settings = await this.service.resume();
            res.json(settings);
        };
    }
}
exports.StoreSettingsController = StoreSettingsController;
