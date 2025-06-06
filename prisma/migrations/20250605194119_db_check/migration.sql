-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "purchaseDate" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_item_key" ON "product"("item");
