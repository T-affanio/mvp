import { prisma } from "../../libs/prisma";

export class DeliveryAreaRepository {
  create(data: { name: string; nameNormalized: string; fee: number }) {
    return prisma.deliveryArea.create({ data });
  }

  findAll() {
    return prisma.deliveryArea.findMany({
      orderBy: { name: "asc" },
    });
  }

  findById(id: string) {
    return prisma.deliveryArea.findUnique({
      where: { id },
    });
  }
  update(
    id: string,
    data: {
      name?: string;
      nameNormalized?: string;
      fee?: number;
    }
  ) {
    return prisma.deliveryArea.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return prisma.deliveryArea.delete({ where: { id } });
  }
}
