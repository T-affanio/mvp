import { prisma } from "../../libs/prisma";

type CreateAdminData = {
  name: string;
  email: string;
  password: string;
  role: "OWNER";

  address: string;
};

export class AdminRepository {
  findByEmail(email: string) {
    return prisma.admin.findUnique({ where: { email } });
  }

  create(data: CreateAdminData) {
    return prisma.admin.create({ data });
  }
}
