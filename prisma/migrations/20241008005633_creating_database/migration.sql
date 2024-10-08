-- CreateTable
CREATE TABLE "tb_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tb_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_users" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "id_role" TEXT NOT NULL,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_sells" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "total_spent" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "sellDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_sells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_products_sells" (
    "id" TEXT NOT NULL,
    "id_sell" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "tb_products_sells_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_roles_name_key" ON "tb_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_cpf_key" ON "tb_users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "tb_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_sells" ADD CONSTRAINT "tb_sells_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_products_sells" ADD CONSTRAINT "tb_products_sells_id_sell_fkey" FOREIGN KEY ("id_sell") REFERENCES "tb_sells"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_products_sells" ADD CONSTRAINT "tb_products_sells_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "tb_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
