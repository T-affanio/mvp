"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startStoreStatusJob = startStoreStatusJob;
const node_cron_1 = __importDefault(require("node-cron"));
const settings_service_1 = require("../modules/settings/settings.service");
const service = new settings_service_1.StoreSettingsService();
function startStoreStatusJob() {
    node_cron_1.default.schedule("* * * * *", async () => {
        await service["recompute"]();
    });
}
