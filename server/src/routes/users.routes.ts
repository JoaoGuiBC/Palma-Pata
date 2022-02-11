import { Request, Response, Router } from "express";

import { prisma } from "../database/prismaClient";
import { CreateUserService } from "../services/CreateUserService";
import { UpdateUserPasswordService } from "../services/UpdateUserPasswordService";
import { VerifyPasswordTokenService } from "../services/VerifyPasswordTokenService";

const usersRouter = Router();

interface IUser {
  username: string;
  email: string;
  password?: string;
  phone_number: string;
  street: string;
  street_number: number;
  district: string;
  city: string;
}

interface IResetPassword {
  token: string;
  new_password: string;
}

usersRouter.get("/", async (_: Request, response: Response) => {
  const users = await prisma.users.findMany();

  return response.json(users);
});

usersRouter.post("/", async (request: Request, response: Response) => {
  const {
    username,
    email,
    password,
    phone_number,
    street,
    street_number,
    district,
    city,
  }: IUser = request.body;

  const createUser = new CreateUserService();

  let parsedStreet: string = street;
  let parsedDistrict: string = district;

  if (street.toLowerCase().substring(0, 4) === "rua ") {
    parsedStreet = street.substring(4, street.length);
  }
  if (district.toLowerCase().substring(0, 7) === "bairro ") {
    parsedDistrict = district.substring(7, district.length);
  }

  const newUser: IUser = await createUser.execute({
    username,
    email,
    password: password ?? "",
    phone_number,
    street: parsedStreet,
    street_number,
    district: parsedDistrict,
    city,
  });

  delete newUser.password;

  return response.json(newUser);
});

usersRouter.put(
  "/resetPassword",
  async (request: Request, response: Response) => {
    const { token, new_password }: IResetPassword = request.body;

    const verifyToken = new VerifyPasswordTokenService();
    const updatePassword = new UpdateUserPasswordService();

    const user_id = await verifyToken.execute({ token });
    await updatePassword.execute({
      user_id,
      new_password,
    });

    response.json({
      status: "success",
      message: "Senha atualizada com sucesso",
    });
  }
);

export { usersRouter };
