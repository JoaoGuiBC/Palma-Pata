import { Router, Response } from "express";

import { usersRouter } from "./users.routes";
import { sessionsRouter } from "./sessions.routes";
import { emailsRouter } from "./emails.routes";
import { requestsRouter } from "./requests.routes";

const routes = Router();

routes.get("/", (_, response: Response) => {
  return response.json({ status: "success" });
});

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/emails", emailsRouter);
routes.use("/requests", requestsRouter);

export { routes };
