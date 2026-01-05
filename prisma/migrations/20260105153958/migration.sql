/*
  Warnings:

  - You are about to drop the column `breakTime` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `minOrderValue` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `prepTime` on the `StoreSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StoreSettings" DROP COLUMN "breakTime",
DROP COLUMN "minOrderValue",
DROP COLUMN "prepTime",
ADD COLUMN     "manuallyPaused" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isOpen" DROP DEFAULT,
ALTER COLUMN "acceptOrders" DROP DEFAULT;
