import { AppError } from "../../shared/err/error";
import { logger } from "../../shared/logger";
import { CategoryRepository } from "./categories.repository";

export class CategoryService {
  private repo = new CategoryRepository();

  async create(data: { name: string }) {
    logger.info("Criando categoria");

    const name = this.normalizeName(data.name);

    const alreadyExists = await this.repo.findByName(name);

    if (alreadyExists) {
      throw new AppError("Categoria já existe", 409);
    }

    return this.repo.create({ name });
  }

  async list() {
    return this.repo.getAll();
  }

  async getById(categoryId: string) {
    const category = await this.repo.findById(categoryId);

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    return category;
  }

  async update(categoryId: string, data: { name: string }) {
    const name = this.normalizeName(data.name);

    const category = await this.repo.findById(categoryId);

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    const duplicated = await this.repo.findByName(name);

    if (duplicated && duplicated.id !== categoryId) {
      throw new AppError(
        "Já existe outra categoria com esse nome",
        409
      );
    }

    await this.repo.update(categoryId, { name });

    return {
      message: "Categoria atualizada com sucesso",
    };
  }

  async remove(categoryId: string) {
    const category = await this.repo.findById(categoryId);

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    await this.repo.delete(categoryId);

    return {
      message: "Categoria removida com sucesso",
    };
  }

  private normalizeName(name: string) {
    return name.trim().toLowerCase();
  }
}
