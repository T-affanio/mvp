"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryAreaController = void 0;
const delivery_service_1 = require("./delivery.service");
const delivery_schema_1 = require("./delivery.schema");
class DeliveryAreaController {
    constructor() {
        this.service = new delivery_service_1.DeliveryAreaService();
    }
    async create(req, res) {
        const parsed = delivery_schema_1.createDeliveryAreaSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error.format());
        }
        const area = await this.service.create(parsed.data);
        return res.status(201).json(area);
    }
    async list(req, res) {
        const areas = await this.service.list();
        return res.json(areas);
    }
    async update(req, res) {
        const { id } = req.params;
        const parsed = delivery_schema_1.updateDeliveryAreaSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error.format());
        }
        const area = await this.service.update(id, parsed.data);
        return res.json(area);
    }
    async delete(req, res) {
        const { id } = req.params;
        const result = await this.service.delete(id);
        return res.json(result);
    }
}
exports.DeliveryAreaController = DeliveryAreaController;
