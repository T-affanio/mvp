import { prisma } from "../../libs/prisma";

export class CategoryRepository {
  findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  getAll() {
    return prisma.category.findMany({
      orderBy: { createdAt: "asc" },
    });
  }

  findByName(name: string) {
    return prisma.category.findFirst({
      where: { name },
    });
  }

  create(data: { name: string }) {
    return prisma.category.create({
      data: {
        name: data.name,
      },
    });
  }

  update(id: string, data: { name: string }) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }
}
