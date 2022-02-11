import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import authConfig from "../config/auth";
import { prisma } from "../database/prismaClient";
import { AppError } from "../errors/AppError";

interface IUser {
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

interface Session {
  user: IUser;
  token: string;
}

interface ICredentials {
  email: string;
  password: string;
}

class AuthenticateAdminService {
  public async execute({ email, password }: ICredentials): Promise<Session> {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("Credenciais incorretas", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Credenciais incorretas", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    const filteredUser: IUser = {
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      street: user.street,
      street_number: user.street_number,
      district: user.district,
      city: user.city,
      adm: user.adm,
      master: user.master,
    };

    return {
      user: filteredUser,
      token,
    };
  }
}

export default AuthenticateAdminService;
