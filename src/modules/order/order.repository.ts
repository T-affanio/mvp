import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma";

export class OrderRepository {
  create(data: Prisma.OrderCreateInput) {
    return prisma.order.create({
      data,
      include: {
        items: true,
      },
    });
  }

  findAll() {
    return prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  }

  findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  }
  // findAllWithItems() {
  //   return prisma.order.findMany({
  //     include: {
  //       items: true,
  //     },
  //   });
  // }
  updateStatus(id: string, status: "CONFIRMED" | "CANCELED" | "FINISHED") {
    return prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
