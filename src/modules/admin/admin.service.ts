import bcrypt from "bcryptjs";
import { AppError } from "../../shared/err/error";
import { AdminRepository } from "./admin.repository";
import { AdminType } from "./admin.schema";

export class AdminService {
  private repo = new AdminRepository();

  async register(data: AdminType) {
    const exist = await this.repo.findByEmail(data.email);
    if (exist) {
      throw new AppError("este email ja esta em uso", 409);
    }

    const hash = await bcrypt.hash(data.password, 10);

    return this.repo.create({
      name: data.name,
      email: data.email,
      password: hash,
      role: "OWNER",
      address: data.address,
    });
  }
}
