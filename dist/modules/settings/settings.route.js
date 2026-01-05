"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("./settings.controller");
const ensureAuth_1 = require("../../shared/middleware/ensureAuth");
const storeSettingsRouter = (0, express_1.Router)();
const controller = new settings_controller_1.StoreSettingsController();
/**
 * 🔎 Buscar configurações atuais da loja
 * - já retorna status sincronizado com o horário
 * - usado no admin e no front público
 */
storeSettingsRouter.get("/", controller.get.bind(controller));
/**
 * ✏️ Atualizar configurações
 * - horários de funcionamento
 * - NÃO abre/fecha loja manualmente
 */
storeSettingsRouter.put("/", ensureAuth_1.ensureAuth, controller.update.bind(controller));
/**
 * ⏸️ Pausar pedidos manualmente (admin)
 */
storeSettingsRouter.patch("/pause", ensureAuth_1.ensureAuth, controller.pause.bind(controller));
/**
 * ▶️ Retomar pedidos
 * - só funciona se estiver dentro do horário
 */
storeSettingsRouter.patch("/resume", ensureAuth_1.ensureAuth, controller.resume.bind(controller));
exports.default = storeSettingsRouter;
