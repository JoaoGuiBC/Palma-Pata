import { hash } from "bcrypt";

import { prisma } from "../../database/prismaClient";
import { AppError } from "../../errors/AppError";

interface IUpdatePassword {
  new_password: string;
  user_id: string;
  resetToken: string;
}

export class UpdateUserPasswordService {
  async execute({ user_id, new_password, resetToken }: IUpdatePassword) {
    const userExist = await prisma.users.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!userExist) {
      throw new AppError("Usuário inexistente", 400);
    }

    const hashPassword = await hash(new_password, 10);

    await prisma.users.update({
      where: {
        id: user_id,
      },
      data: {
        password: hashPassword,
      },
    });

    await prisma.resetTokens.update({
      where: {
        token: resetToken,
      },
      data: {
        used: true,
      },
    });
  }
}
