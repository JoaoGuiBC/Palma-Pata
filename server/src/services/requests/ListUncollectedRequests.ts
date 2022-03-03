import { prisma } from "../../database/prismaClient";

export class ListUncollectedRequests {
  async execute() {
    const requests = await prisma.requests.findMany({
      where: {
        collected: false,
      },
    });
    const list = await Promise.all(
      requests.map(async (request) => {
        const user = await prisma.users.findUnique({
          where: {
            id: request.id_user,
          },
        });

        const mountedRequest = {
          id: request.id,
          username: user!.username,
          phone_number: user!.phone_number,
          quantity: request.quantity,
          street: user!.street,
          street_number: user!.street_number,
          district: user!.district,
          city: user!.city,
        };

        return mountedRequest;
      })
    );

    return list;
  }
}
