import { Router } from "express";
import { StoreSettingsController } from "./settings.controller";
import { ensureAuth } from "../../shared/middleware/ensureAuth";

const storeSettingsRouter = Router();
const controller = new StoreSettingsController();

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
storeSettingsRouter.put("/",ensureAuth, controller.update.bind(controller));

/**
 * ⏸️ Pausar pedidos manualmente (admin)
 */
storeSettingsRouter.patch("/pause",ensureAuth, controller.pause.bind(controller));

/**
 * ▶️ Retomar pedidos
 * - só funciona se estiver dentro do horário
 */
storeSettingsRouter.patch("/resume",ensureAuth, controller.resume.bind(controller));

export default storeSettingsRouter;
