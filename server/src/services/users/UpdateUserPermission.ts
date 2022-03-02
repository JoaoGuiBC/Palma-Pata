import { prisma } from "../../database/prismaClient";
import { AppError } from "../../errors/AppError";

interface IUser {
  id: string;
  adm: boolean;
}

interface IUpdateUserInfo {
  users: IUser[];
}

export class UpdateUserPermission {
  async execute({ users }: IUpdateUserInfo) {
    try {
      users.map(async (user) => {
        await prisma.users.update({
          where: {
            id: user.id,
          },
          data: {
            adm: user.adm,
          },
        });
      });
    } catch (_) {
      throw new AppError("Não foi possivel atualizar os dados");
    }
  }
}
