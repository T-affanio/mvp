/*
  Warnings:

  - Made the column `deliveryFee` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deliveryAreaId` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `neighborhood` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_deliveryAreaId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "deliveryFee" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "deliveryAreaId" SET NOT NULL,
ALTER COLUMN "neighborhood" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryAreaId_fkey" FOREIGN KEY ("deliveryAreaId") REFERENCES "DeliveryArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
