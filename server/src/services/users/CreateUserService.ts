import { hash } from "bcrypt";

import { prisma } from "../../database/prismaClient";
import { AppError } from "../../errors/AppError";

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

interface IParsedUser {
  id: string;
  username: string;
  email: string;
  phone_number: string;
  street: string;
  street_number: number;
  district: string;
  city: string;
  adm: boolean;
  master: boolean;
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
    const parsedNewUser: IParsedUser = {
      username: newUser.username,
      email: newUser.email,
      phone_number: newUser.phone_number,
      street: newUser.street,
      street_number: newUser.street_number,
      district: newUser.district,
      city: newUser.city,
      id: newUser.id,
      adm: newUser.adm,
      master: newUser.master,
    };

    return parsedNewUser;
  }
}
