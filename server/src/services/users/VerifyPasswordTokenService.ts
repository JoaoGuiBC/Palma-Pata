import dayjs from "dayjs";

import { prisma } from "../../database/prismaClient";
import { AppError } from "../../errors/AppError";

interface ITokenData {
  token: string;
}

export class VerifyPasswordTokenService {
  async execute({ token }: ITokenData) {
    const resetToken = await prisma.resetTokens.findUnique({
      where: {
        token,
      },
    });

    if (!resetToken) {
      throw new AppError("Token inexistente", 401);
    }

    if (resetToken.used) {
      throw new AppError("Token expirado", 403);
    }

    const currentHour = dayjs(new Date());

    if (currentHour.diff(resetToken.created_at, "hour") > 2) {
      throw new AppError("Token expirado", 403);
    }

    return resetToken.id_user;
  }
}
