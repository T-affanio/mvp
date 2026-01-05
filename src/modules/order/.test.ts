import request from "supertest";
import { app } from "../../app";
import { prisma } from "../../libs/prisma";

describe("Order – fluxo principal (E2E)", () => {
  beforeAll(async () => {
    // garante banco limpo
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.deliveryArea.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("cria pedido DELIVERY sem login com frete por área", async () => {
    // 🔹 categoria
    const category = await prisma.category.create({
      data: {
        name: "Lanches",
      },
    });

    // 🔹 produto ativo
    const product = await prisma.product.create({
      data: {
        name: "X-Burguer",
        price: 25,
        active: true,
        categoryId: category.id,
      },
    });

    // 🔹 área de entrega
    const area = await prisma.deliveryArea.create({
      data: {
        name: "Centro",
        nameNormalized: "centro",
        fee: 5,
      },
    });

    // 🔹 request real (igual frontend vai fazer)
    const response = await request(app)
      .post("/orders")
      .send({
        customerName: "João da Silva",
        customerPhone: "11999999999",
        address: "Rua Teste, 123",
        neighborhood: "Centro",
        deliveryType: "DELIVERY",
        paymentMethod: "PIX",
        deliveryAreaId: area.id,
        items: [
          {
            productId: product.id,
            quantity: 2,
          },
        ],
      });

    // 🔹 asserts principais
    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      customerName: "João da Silva",
      deliveryType: "DELIVERY",
      paymentMethod: "PIX",
      deliveryFee: 5,
      subtotal: 50,
      total: 55,
    });

    // 🔹 garante que itens foram criados
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0]).toMatchObject({
      productId: product.id,
      quantity: 2,
      unitPrice: 25,
      subtotal: 50,
    });
  });
});
