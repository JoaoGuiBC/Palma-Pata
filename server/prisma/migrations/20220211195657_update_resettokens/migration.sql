/*
  Warnings:

  - You are about to drop the `ResetTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResetTokens" DROP CONSTRAINT "ResetTokens_id_user_fkey";

-- DropTable
DROP TABLE "ResetTokens";

-- CreateTable
CREATE TABLE "reset_tokens" (
    "token" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reset_tokens_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "reset_tokens" ADD CONSTRAINT "reset_tokens_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
