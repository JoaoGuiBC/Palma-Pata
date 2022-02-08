import { hash } from "bcrypt";

import { prisma } from "../database/prismaClient";

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
      throw new Error("User already exist");
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
