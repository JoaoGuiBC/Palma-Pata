import { Request, Response, Router } from "express";

import { prisma } from "../database/prismaClient";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { CreateUserService } from "../services/users/CreateUserService";
import { UpdateUserPermission } from "../services/users/UpdateUserPermission";
import { UpdateUserInfoService } from "../services/users/UpdateUserInfoService";
import { UpdateUserPasswordService } from "../services/users/UpdateUserPasswordService";
import { VerifyPasswordTokenService } from "../services/users/VerifyPasswordTokenService";

const usersRouter = Router();

interface IUser {
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

interface IResetPassword {
  token: string;
  new_password: string;
}

interface IPermissionUpdateUser {
  user_id: string;
  adm: boolean;
}

interface IUpdateUserInfo {
  users: IPermissionUpdateUser[];
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

  const newUser: IParsedUser = await createUser.execute({
    username,
    email,
    password,
    phone_number,
    street: parsedStreet,
    street_number,
    district: parsedDistrict,
    city,
  });

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
      resetToken: token,
    });

    return response.json({
      status: "success",
      message: "Senha atualizada com sucesso",
    });
  }
);

usersRouter.put(
  "/",
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const { id } = request.user;
    const {
      username,
      phone_number,
      street,
      street_number,
      district,
      city,
    }: Omit<IUser, "email" | "password"> = request.body;

    const updateUserInfo = new UpdateUserInfoService();

    const updatedUser = await updateUserInfo.execute({
      user_id: id,
      username,
      phone_number,
      street,
      street_number,
      district,
      city,
    });

    return response.json(updatedUser);
  }
);

usersRouter.patch(
  "/updatePermission",
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const { users }: IUpdateUserInfo = request.body;

    const updateUserPermission = new UpdateUserPermission();

    await updateUserPermission.execute({
      users,
    });

    return response.status(200).json({ message: "Informações atualizadas" });
  }
);

export { usersRouter };
