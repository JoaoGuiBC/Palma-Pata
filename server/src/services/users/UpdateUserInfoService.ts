import { prisma } from "../../database/prismaClient";
import { AppError } from "../../errors/AppError";

interface IUpdateUserInfo {
  user_id: string;
  username: string;
  phone_number: string;
  street: string;
  street_number: number;
  district: string;
  city: string;
}

export class UpdateUserInfoService {
  async execute({
    user_id,
    username,
    phone_number,
    street,
    street_number,
    district,
    city,
  }: IUpdateUserInfo) {
    const userExist = await prisma.users.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!userExist) {
      throw new AppError("Usuário inexistente", 400);
    }

    const updatedUser = await prisma.users.update({
      where: {
        id: user_id,
      },
      data: {
        username,
        phone_number,
        street,
        street_number,
        district,
        city,
      },
    });

    const user = {
      username: updatedUser.username,
      phone_number: updatedUser.phone_number,
      street: updatedUser.street,
      street_number: updatedUser.street_number,
      district: updatedUser.district,
      city: updatedUser.city,
    };

    return user;
  }
}
