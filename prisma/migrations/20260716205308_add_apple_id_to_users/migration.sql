-- AlterTable
ALTER TABLE "users" ALTER COLUMN "kakao_id" DROP NOT NULL;
ALTER TABLE "users" ADD COLUMN     "apple_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_apple_id_key" ON "users"("apple_id");
