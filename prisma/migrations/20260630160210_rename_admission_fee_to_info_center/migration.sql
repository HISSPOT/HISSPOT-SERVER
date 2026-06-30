/*
  Warnings:

  - You are about to drop the column `admission_fee` on the `spots` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "spots" DROP COLUMN "admission_fee",
ADD COLUMN     "info_center" TEXT;
