import { Router } from "express";
import { sign } from "jsonwebtoken";

import authConfig from "../config/auth";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import AuthenticateUserService from "../services/sessions/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

sessionsRouter.post(
  "/revalidate",
  ensureAuthenticated,
  async (request, response) => {
    const { id } = request.user;

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: id,
      expiresIn,
    });

    return response.json(token);
  }
);

export { sessionsRouter };
