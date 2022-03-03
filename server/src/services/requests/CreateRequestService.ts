import { prisma } from "../../database/prismaClient";
import { AppError } from "../../errors/AppError";

interface ICreateRequest {
  id_user: string;
  quantity: number;
}

export class CreateRequestService {
  async execute({ id_user, quantity }: ICreateRequest) {
    const userExist = await prisma.users.findFirst({
      where: {
        id: {
          contains: id_user,
        },
      },
    });

    if (!userExist) {
      throw new AppError("Usuário inexistente", 400);
    }

    const newRequest = prisma.requests.create({
      data: {
        id_user,
        quantity,
      },
    });

    const contributorAddress = await prisma.bestContributorAddress.findFirst({
      where: {
        city: userExist.city,
        district: userExist.district,
      },
    });

    if (!contributorAddress) {
      await prisma.bestContributorAddress.create({
        data: {
          city: userExist.city,
          district: userExist.district,
          quantity,
        },
      });
    } else {
      await prisma.bestContributorAddress.update({
        where: {
          id: contributorAddress.id,
        },
        data: {
          quantity: contributorAddress.quantity + quantity,
        },
      });
    }

    return newRequest;
  }
}
