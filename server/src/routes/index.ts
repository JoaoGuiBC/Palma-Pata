import { Router, Response } from "express";

import { usersRouter } from "./users.routes";
import { sessionsRouter } from "./sessions.routes";

const routes = Router();

routes.get("/", (_, response: Response) => {
  return response.json({ status: "success" });
});

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

export { routes };