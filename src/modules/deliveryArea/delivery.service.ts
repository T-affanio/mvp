import { normalize } from "../../utils/normalize";
import { DeliveryAreaRepository } from "./delivery.repository";
import { CreateDeliveryAreaDTO } from "./delivery.schema";

export class DeliveryAreaService {
  private repo = new DeliveryAreaRepository();

  async create(data: CreateDeliveryAreaDTO) {
    return this.repo.create({
      name: data.name,
      nameNormalized: normalize(data.name),
      fee: data.fee,
    });
  }

  async list() {
    return this.repo.findAll();
  }

  async update(id: string, data: { name?: string; fee?: number }) {
    const updateData: any = {};

    if (data.name) {
      updateData.name = data.name;
      updateData.nameNormalized = normalize(data.name);
    }

    if (data.fee !== undefined) {
      updateData.fee = data.fee;
    }

    return this.repo.update(id, updateData);
  }

  async delete(id: string) {
    return this.repo.remove(id);
  }
}
