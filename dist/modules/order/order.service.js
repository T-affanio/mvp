"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = require("../../libs/prisma");
const error_1 = require("../../shared/err/error");
const order_repository_1 = require("./order.repository");
const normalize_1 = require("../../utils/normalize");
const promotion_service_1 = require("../promotion/promotion.service");
const applyPromotion_1 = require("../../utils/applyPromotion");
const mapPromotion_1 = require("../../utils/mapPromotion");
const formatWhatsappMessage_1 = require("./formatWhatsappMessage");
const settings_service_1 = require("../settings/settings.service");
class OrderService {
    constructor() {
        this.repo = new order_repository_1.OrderRepository();
        this.promotionService = new promotion_service_1.PromotionService();
        this.storeSettingsService = new settings_service_1.StoreSettingsService();
    }
    async create(data) {
        const canAccept = await this.storeSettingsService.canAcceptOrders();
        if (!canAccept) {
            throw new error_1.AppError("Estabelecimento fechado no momento", 400);
        }
        const products = await prisma_1.prisma.product.findMany({
            where: {
                id: { in: data.items.map(i => i.productId) },
                active: true,
            },
        });
        if (products.length !== data.items.length) {
            throw new error_1.AppError("Produto inválido ou inativo", 400);
        }
        let subtotal = 0;
        const items = [];
        for (const item of data.items) {
            const product = products.find(p => p.id === item.productId);
            const promo = await this.promotionService.getActiveForProduct(product.id);
            const discount = (0, mapPromotion_1.mapPromotionToDiscount)(promo);
            const finalUnitPrice = (0, applyPromotion_1.applyPromotion)(product.price, discount);
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
        let deliveryAreaId = null;
        let finalDeliveryType = data.deliveryType;
        let deliveryWarning = null;
        if (data.deliveryType === "DELIVERY" && data.neighborhood) {
            const area = await prisma_1.prisma.deliveryArea.findUnique({
                where: {
                    nameNormalized: (0, normalize_1.normalize)(data.neighborhood),
                },
            });
            if (!area) {
                finalDeliveryType = "PICKUP";
                deliveryWarning =
                    "Esse bairro ainda não está na rota do HoodFood 😕 " +
                        "O pedido foi registrado para retirada no local.";
            }
            else {
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
            whatsappMessage: (0, formatWhatsappMessage_1.formatWhatsappMessage)(order),
        };
    }
    async list() {
        return this.repo.findAll();
    }
    async updateStatus(orderId, status) {
        const order = await this.repo.findById(orderId);
        if (!order) {
            throw new error_1.AppError("Pedido não encontrado", 404);
        }
        if (order.status === "FINISHED") {
            throw new error_1.AppError("Pedido finalizado não pode ser alterado", 400);
        }
        if (order.status === "CANCELED") {
            throw new error_1.AppError("Pedido cancelado não pode ser alterado", 400);
        }
        return this.repo.updateStatus(orderId, status);
    }
}
exports.OrderService = OrderService;
