/*
  Warnings:

  - You are about to drop the column `baseDeliveryFee` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerKm` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "baseDeliveryFee",
DROP COLUMN "pricePerKm";
