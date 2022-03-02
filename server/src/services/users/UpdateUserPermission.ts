import { prisma } from "../../database/prismaClient";
import { AppError } from "../../errors/AppError";

interface IUser {
  user_id: string;
  adm: boolean;
}

interface IUpdateUserInfo {
  users: IUser[];
}

export class UpdateUserInfoService {
  async execute({ users }: IUpdateUserInfo) {
    try {
      users.map(async (user) => {
        await prisma.users.update({
          where: {
            id: user.user_id,
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
