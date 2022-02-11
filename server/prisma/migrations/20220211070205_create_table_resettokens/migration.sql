-- CreateTable
CREATE TABLE "ResetTokens" (
    "token" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResetTokens_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "ResetTokens" ADD CONSTRAINT "ResetTokens_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
