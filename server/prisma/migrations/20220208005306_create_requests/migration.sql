-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "collected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
