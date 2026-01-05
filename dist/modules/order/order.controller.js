"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_schema_1 = require("./order.schema");
class OrderController {
    constructor() {
        this.service = new order_service_1.OrderService();
    }
    async create(req, res) {
        const parsed = order_schema_1.createOrderSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error.format());
        }
        const order = await this.service.create(parsed.data);
        return res.status(201).json(order);
    }
    // async mostOrdered(req: Request, res: Response) {
    //   const products = await this.service.getMostOrderedProducts();
    //   return res.json(products);
    // }
    async list(req, res) {
        const orders = await this.service.list();
        return res.json(orders);
    }
    async updateStatus(req, res) {
        const { id } = req.params;
        const parsed = order_schema_1.updateOrderStatusSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error.format());
        }
        const order = await this.service.updateStatus(id, parsed.data.status);
        return res.json(order);
    }
}
exports.OrderController = OrderController;
