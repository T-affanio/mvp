import { AppError } from "../../shared/err/error";
import { PromotionRepository } from "./promotion.repository";

export class PromotionService {
  private repo = new PromotionRepository();

  async createProductPromotion(data: any) {
    return this.repo.createPromotion({
      name: data.name,
      type: "PRODUCT",
      active: true,
      discountType: data.discountType,
      discountValue: data.discountValue,
      startAt: data.startAt ? new Date(data.startAt) : null,
      endAt: data.endAt ? new Date(data.endAt) : null,
      products: {
        create: data.productIds.map((productId: string) => ({
          productId,
        })),
      },
    });
  }

  async createComboPromotion(data: any) {
    return this.repo.createPromotion({
      name: data.name,
      type: "COMBO",
      active: true,
      startAt: data.startAt ? new Date(data.startAt) : null,
      endAt: data.endAt ? new Date(data.endAt) : null,
      combos: {
        create: {
          price: data.price,
          items: {
            create: data.items.map((item: any) => ({
              product: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      },
    });
  }

  // ✅ AQUI ESTÁ A CORREÇÃO
  async getActiveForProduct(productId: string) {
    return this.repo.findActiveByProduct(productId);
  }

  list() {
    return this.repo.findAll();
  }

  listActive() {
    return this.repo.findActive();
  }

  toggle(id: string, active: boolean) {
    return this.repo.updateStatus(id, active);
  }

 delete(id: string) {
  return this.repo.deleteWithRelations(id);
}

}
