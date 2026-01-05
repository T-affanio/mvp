/*
  Warnings:

  - You are about to drop the column `deliveryType` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `distanceKm` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Order` table. All the data in the column will be lost.
  - Added the required column `neighborhood` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `deliveryFee` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliveryType",
DROP COLUMN "distanceKm",
DROP COLUMN "paymentMethod",
ADD COLUMN     "deliveryAreaId" TEXT,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ALTER COLUMN "deliveryFee" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL;

-- CreateTable
CREATE TABLE "DeliveryArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeliveryArea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryAreaId_fkey" FOREIGN KEY ("deliveryAreaId") REFERENCES "DeliveryArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;
