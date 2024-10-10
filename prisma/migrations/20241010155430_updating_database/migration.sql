/*
  Warnings:

  - You are about to drop the column `sellDate` on the `tb_sells` table. All the data in the column will be lost.
  - Added the required column `update_at` to the `tb_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `tb_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_products" ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "creation_date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tb_sells" DROP COLUMN "sellDate",
ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tb_users" ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;
