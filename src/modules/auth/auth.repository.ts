import { prisma } from "../../libs/prisma";

export class AuthRepository {
  findByEmail(email: string) {
    return prisma.admin.findUnique({
      where: { email },
    });
  }
}
