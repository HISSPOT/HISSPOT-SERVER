-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('KAKAO', 'APPLE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "provider" "AuthProvider" NOT NULL DEFAULT 'KAKAO';
