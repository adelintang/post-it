/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductFiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `ProductFiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `ProductFiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductFiles" DROP CONSTRAINT "ProductFiles_productId_fkey";

-- DropIndex
DROP INDEX "ProductFiles_productId_key";

-- AlterTable
ALTER TABLE "ProductFiles" DROP COLUMN "productId",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductFiles_product_id_key" ON "ProductFiles"("product_id");

-- AddForeignKey
ALTER TABLE "ProductFiles" ADD CONSTRAINT "ProductFiles_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
