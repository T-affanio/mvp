/*
  Warnings:

  - A unique constraint covering the columns `[nameNormalized]` on the table `DeliveryArea` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameNormalized` to the `DeliveryArea` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_deliveryAreaId_fkey";

-- AlterTable
ALTER TABLE "DeliveryArea" ADD COLUMN     "nameNormalized" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "deliveryFee" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "deliveryAreaId" DROP NOT NULL,
ALTER COLUMN "neighborhood" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryArea_nameNormalized_key" ON "DeliveryArea"("nameNormalized");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryAreaId_fkey" FOREIGN KEY ("deliveryAreaId") REFERENCES "DeliveryArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;
