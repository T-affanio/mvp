import { prisma } from "../../libs/prisma";
import { Prisma } from "../../generated/prisma/client";

export class StoreSettingsRepository {
  findFirst() {
    return prisma.storeSettings.findFirst();
  }

  create(data: Prisma.StoreSettingsCreateInput) {
    return prisma.storeSettings.create({ data });
  }

  update(id: string, data: Prisma.StoreSettingsUpdateInput) {
    return prisma.storeSettings.update({
      where: { id },
      data,
    });
  }
}
