"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryAreaService = void 0;
const normalize_1 = require("../../utils/normalize");
const delivery_repository_1 = require("./delivery.repository");
class DeliveryAreaService {
    constructor() {
        this.repo = new delivery_repository_1.DeliveryAreaRepository();
    }
    async create(data) {
        return this.repo.create({
            name: data.name,
            nameNormalized: (0, normalize_1.normalize)(data.name),
            fee: data.fee,
        });
    }
    async list() {
        return this.repo.findAll();
    }
    async update(id, data) {
        const updateData = {};
        if (data.name) {
            updateData.name = data.name;
            updateData.nameNormalized = (0, normalize_1.normalize)(data.name);
        }
        if (data.fee !== undefined) {
            updateData.fee = data.fee;
        }
        return this.repo.update(id, updateData);
    }
    async delete(id) {
        return this.repo.remove(id);
    }
}
exports.DeliveryAreaService = DeliveryAreaService;
