-- CreateTable
CREATE TABLE "ProductFiles" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductFiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductFiles_productId_key" ON "ProductFiles"("productId");

-- AddForeignKey
ALTER TABLE "ProductFiles" ADD CONSTRAINT "ProductFiles_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
