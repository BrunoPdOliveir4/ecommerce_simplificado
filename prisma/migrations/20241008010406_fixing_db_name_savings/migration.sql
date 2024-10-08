/*
  Warnings:

  - You are about to drop the column `idUser` on the `tb_sells` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `tb_sells` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_sells" DROP CONSTRAINT "tb_sells_idUser_fkey";

-- AlterTable
ALTER TABLE "tb_sells" DROP COLUMN "idUser",
ADD COLUMN     "id_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_sells" ADD CONSTRAINT "tb_sells_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
