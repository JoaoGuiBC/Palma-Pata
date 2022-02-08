import { Router, Response } from "express";

import { usersRouter } from "./users.routes";

const routes = Router();

routes.get("/", (_, response: Response) => {
  return response.json({ status: "success" });
});

routes.use("/users", usersRouter);

export { routes };
