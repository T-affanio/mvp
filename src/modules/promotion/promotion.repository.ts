import { prisma } from "../../libs/prisma";

export class PromotionRepository {
  createPromotion(data: any) {
    return prisma.promotion.create({ data });
  }

  findAll() {
    return prisma.promotion.findMany({
      include: {
        products: { include: { product: true } },
        combos: {
          include: {
            items: { include: { product: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  findActiveByProduct(productId: string) {
    return prisma.promotion.findFirst({
      where: {
        active: true,
        type: "PRODUCT",
        products: {
          some: { productId },
        },
        OR: [
          { startAt: null },
          { startAt: { lte: new Date() } },
        ],
        AND: [
          {
            OR: [
              { endAt: null },
              { endAt: { gte: new Date() } },
            ],
          },
        ],
      },
    });
  }

  findActive() {
  return prisma.promotion.findMany({
    where: {
      active: true,
      type: "PRODUCT",
      OR: [
        { startAt: null },
        { startAt: { lte: new Date() } },
      ],
      AND: [
        {
          OR: [
            { endAt: null },
            { endAt: { gte: new Date() } },
          ],
        },
      ],
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
}


  updateStatus(id: string, active: boolean) {
    return prisma.promotion.update({
      where: { id },
      data: { active },
    });
  }

   async deleteWithRelations(id: string) {
    return prisma.$transaction([
      prisma.promotionComboItem.deleteMany({
        where: {
          combo: {
            promotionId: id,
          },
        },
      }),

      prisma.promotionCombo.deleteMany({
        where: {
          promotionId: id,
        },
      }),

      prisma.promotionProduct.deleteMany({
        where: {
          promotionId: id,
        },
      }),

      prisma.promotion.delete({
        where: { id },
      }),
    ]);
  }

  // mantém o delete simples se precisar em outro lugar
  delete(id: string) {
    return prisma.promotion.delete({ where: { id } });
  }
}
