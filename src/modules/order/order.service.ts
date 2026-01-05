import { prisma } from "../../libs/prisma";
import { AppError } from "../../shared/err/error";
import { OrderRepository } from "./order.repository";
import { CreateOrderDTO } from "./order.schema";
import { normalize } from "../../utils/normalize";
import { PromotionService } from "../promotion/promotion.service";
import { applyPromotion } from "../../utils/applyPromotion";
import { mapPromotionToDiscount } from "../../utils/mapPromotion";
import { formatWhatsappMessage } from "./formatWhatsappMessage";
import { StoreSettingsService } from "../settings/settings.service";

export class OrderService {
  private repo = new OrderRepository();
  private promotionService = new PromotionService();
    private storeSettingsService = new StoreSettingsService();


async create(data: CreateOrderDTO) {
  const canAccept = await this.storeSettingsService.canAcceptOrders();

  if (!canAccept) {
    throw new AppError(
      "Estabelecimento fechado no momento",
      400
    );
  }
  
  const products = await prisma.product.findMany({
    where: {
      id: { in: data.items.map(i => i.productId) },
      active: true,
    },
  });

  if (products.length !== data.items.length) {
    throw new AppError("Produto inválido ou inativo", 400);
  }

  let subtotal = 0;
  const items: any[] = [];

  for (const item of data.items) {
    const product = products.find(p => p.id === item.productId)!;

    const promo = await this.promotionService.getActiveForProduct(product.id);
    const discount = mapPromotionToDiscount(promo);

    const finalUnitPrice = applyPromotion(product.price, discount);
    const itemSubtotal = finalUnitPrice * item.quantity;

    subtotal += itemSubtotal;

    items.push({
      productId: product.id,
      productName: product.name,
      originalPrice: product.price,
      unitPrice: finalUnitPrice,
      quantity: item.quantity,
      subtotal: itemSubtotal,
      promotionId: promo?.id ?? null,
    });
  }

  let deliveryFee = 0;
  let deliveryAreaId: string | null = null;
  let finalDeliveryType = data.deliveryType;
  let deliveryWarning: string | null = null;

 if (data.deliveryType === "DELIVERY" && data.neighborhood) {
  const area = await prisma.deliveryArea.findUnique({
    where: {
      nameNormalized: normalize(data.neighborhood),
    },
  });

  if (!area) {
    finalDeliveryType = "PICKUP";
    deliveryWarning =
      "Esse bairro ainda não está na rota do HoodFood 😕 " +
      "O pedido foi registrado para retirada no local.";
  } else {
    deliveryFee = area.fee;
    deliveryAreaId = area.id;
  }
}


  const total = subtotal + deliveryFee;

  const order = await this.repo.create({
    customerName: data.customerName,
    customerPhone: data.customerPhone,

    deliveryType: finalDeliveryType,
    paymentMethod: data.paymentMethod,

    address: finalDeliveryType === "DELIVERY" ? data.address : null,
    neighborhood: finalDeliveryType === "DELIVERY" ? data.neighborhood : null,

    deliveryArea: deliveryAreaId
      ? { connect: { id: deliveryAreaId } }
      : undefined,

    deliveryFee,
    subtotal,
    total,

    status: "CONFIRMED",

    items: {
      create: items.map(item => ({
        product: { connect: { id: item.productId } },
        productName: item.productName,
        originalPrice: item.originalPrice,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        subtotal: item.subtotal,
        promotion: item.promotionId
          ? { connect: { id: item.promotionId } }
          : undefined,
      })),
    },
  });

  return {
    order,
    deliveryWarning,
    whatsappMessage: formatWhatsappMessage(order),
  };
}



  async list() {
    return this.repo.findAll();
  }

  async updateStatus(
    orderId: string,
    status: "CONFIRMED" | "CANCELED" | "FINISHED"
  ) {
    const order = await this.repo.findById(orderId);

    if (!order) {
      throw new AppError("Pedido não encontrado", 404);
    }

    if (order.status === "FINISHED") {
      throw new AppError("Pedido finalizado não pode ser alterado", 400);
    }

    if (order.status === "CANCELED") {
      throw new AppError("Pedido cancelado não pode ser alterado", 400);
    }

    return this.repo.updateStatus(orderId, status);
  }


}
