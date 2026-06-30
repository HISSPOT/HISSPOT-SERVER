/*
  Warnings:

  - The primary key for the `king_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `king_tags` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `king_tags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "king_tags" DROP CONSTRAINT "king_tags_pkey",
DROP COLUMN "id",
DROP COLUMN "tag",
ADD COLUMN     "tag_1" TEXT,
ADD COLUMN     "tag_2" TEXT,
ADD COLUMN     "tag_3" TEXT,
ADD COLUMN     "tag_4" TEXT,
ADD COLUMN     "tag_5" TEXT,
ADD COLUMN     "tag_6" TEXT,
ADD CONSTRAINT "king_tags_pkey" PRIMARY KEY ("king_id");
