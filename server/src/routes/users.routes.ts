import { Request, Response, Router } from "express";

import { CreateUserService } from "../services/CreateUserService";

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

  const newUser: IUser = await createUser.execute({
    username,
    email,
    password: password ?? "",
    phone_number,
    street,
    street_number,
    district,
    city,
  });

  delete newUser.password;

  return response.json(newUser);
});

export { usersRouter };
