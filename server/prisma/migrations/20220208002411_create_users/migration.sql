-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "adm" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "street_number" INTEGER NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
