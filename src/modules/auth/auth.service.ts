import bcrypt from "bcryptjs";
import { signToken } from "../../shared/auth/jwt";
import { AuthRepository } from "./auth.repository";
import { AppError } from "../../shared/err/error";

export class AuthService {
  constructor(private repo = new AuthRepository()) {}

  async login(email: string, password: string) {
    const admin = await this.repo.findByEmail(email);

    if (!admin) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = signToken({
      sub: admin.id,
      role: admin.role,
    });

    return {
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    };
  }
}
