import "dotenv/config";

export const env = {
  PORT: Number(process.env.PORT ?? 3333),
  JWT_SECRET: process.env.JWT_SECRET,
};

if (!env.JWT_SECRET) {
  throw new Error("JWT_SECRET not defined");
}
