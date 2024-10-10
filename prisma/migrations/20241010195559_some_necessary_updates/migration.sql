/*
  Warnings:

  - You are about to drop the column `discount` on the `tb_sells` table. All the data in the column will be lost.
  - Added the required column `was_completed` to the `tb_sells` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_sells" DROP COLUMN "discount",
ADD COLUMN     "was_completed" BOOLEAN NOT NULL;
