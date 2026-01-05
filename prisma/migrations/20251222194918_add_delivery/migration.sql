/*
  Warnings:

  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `DeliveryArea` table. All the data in the column will be lost.
  - Made the column `deliveryAreaId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_deliveryAreaId_fkey";

-- DropIndex
DROP INDEX "Admin_email_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "email",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "password",
DROP COLUMN "role";

-- AlterTable
ALTER TABLE "DeliveryArea" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "deliveryAreaId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryAreaId_fkey" FOREIGN KEY ("deliveryAreaId") REFERENCES "DeliveryArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
