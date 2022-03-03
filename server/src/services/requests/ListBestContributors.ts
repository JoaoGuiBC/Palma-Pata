import { prisma } from "../../database/prismaClient";

export class ListBestContributors {
  async execute() {
    const bestContributorAddress = await prisma.bestContributorAddress.findMany(
      {
        orderBy: {
          quantity: "desc",
        },
      }
    );
    const fetchBestContributors = await prisma.requests.groupBy({
      by: ["id_user"],
      _sum: {
        quantity: true,
      },
    });

    const bestContributors = await Promise.all(
      fetchBestContributors.map(async (contributor) => {
        const user = await prisma.users.findUnique({
          where: {
            id: contributor.id_user,
          },
          select: {
            username: true,
          },
        });

        return {
          username: user?.username,
          quantity: contributor._sum.quantity,
        };
      })
    );

    bestContributors.sort((a, b) => {
      if (a!.quantity! > b!.quantity!) {
        return -1;
      }
      if (a!.quantity! < b!.quantity!) {
        return 1;
      }

      return 0;
    });

    return { bestContributorAddress, bestContributors };
  }
}
