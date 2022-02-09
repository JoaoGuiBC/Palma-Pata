import { hash } from "bcrypt";

import { prisma } from "../database/prismaClient";
import { AppError } from "../errors/AppError";

interface ICreateUser {
  username: string;
  email: string;
  password: string;
  phone_number: string;
  street: string;
  street_number: number;
  district: string;
  city: string;
}

export class CreateUserService {
  async execute({
    username,
    email,
    password,
    phone_number,
    street,
    street_number,
    district,
    city,
  }: ICreateUser) {
    const userExist = await prisma.users.findFirst({
      where: {
        email: {
          contains: email,
          mode: "insensitive",
        },
      },
    });

    if (userExist) {
      throw new AppError("Usuário já existente", 400);
    }

    const hashPassword = await hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashPassword,
        phone_number,
        street,
        street_number,
        district,
        city,
      },
    });

    return newUser;
  }
}
