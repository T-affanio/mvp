/*
  Warnings:

  - You are about to drop the column `customerLat` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerLng` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerLat",
DROP COLUMN "customerLng",
ADD COLUMN     "address" TEXT;
