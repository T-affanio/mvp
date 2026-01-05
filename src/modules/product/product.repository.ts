import { prisma } from "../../libs/prisma";

export class ProductRepository {
  create(data: {
    name: string;
    description?: string;
    categoryId?: string | null;
    images: string[];
    variations: { name: string; price: number }[];
  }) {
    const lowestPrice = Math.min(...data.variations.map((v) => v.price));

    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: lowestPrice, // 👈 fallback / menor preço
        categoryId: data.categoryId ?? null,

        variations: {
          create: data.variations,
        },

        images: {
          create: data.images.map((url) => ({ url })),
        },
      },
      include: {
        images: true,
        category: true,
        variations: true,
      },
    });
  }
async findMostOrdered() {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
    },
  });

  const countMap = new Map<string, number>();

  for (const order of orders) {
    for (const item of order.items) {
      countMap.set(
        item.productId,
        (countMap.get(item.productId) || 0) + item.quantity
      );
    }
  }

  if (countMap.size === 0) return [];

  const products = await prisma.product.findMany({
    where: {
      id: { in: Array.from(countMap.keys()) },
      active: true,
    },
    include: {
      images: true, // 👈 agora vem imagem
    },
  });

  return products.sort(
    (a, b) =>
      (countMap.get(b.id) || 0) - (countMap.get(a.id) || 0)
  );
}


  findAll() {
    return prisma.product.findMany({
      include: {
        images: true,
        category: true,
        variations: true, // 👈 ESSENCIAL
      },
      orderBy: { createdAt: "desc" },
    });
  }

  findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
        variations: true,
      },
    });
  }

  delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  }
}
