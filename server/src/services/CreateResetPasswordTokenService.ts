import { prisma } from "../database/prismaClient";

interface ITokenData {
  id_user: string;
}

export class CreateResetPasswordTokenService {
  async execute({ id_user }: ITokenData) {
    const resetToken = await prisma.resetTokens.create({
      data: {
        id_user,
      },
    });

    return resetToken;
  }
}
