import { prisma } from "../database/prismaClient";
import { AppError } from "../errors/AppError";

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

    return newRequest;
  }
}
