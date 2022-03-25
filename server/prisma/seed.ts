import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const john = await prisma.users.upsert({
    where: { email: "johndoe@example.com" },
    update: {},
    create: {
      username: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      city: "NewCity",
      district: "MyDistrict",
      street: "HouseStreet",
      street_number: 1,
      phone_number: "99 999999999",
      adm: true,
      master: true,
    },
  });

  console.log({ john });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
