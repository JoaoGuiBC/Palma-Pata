import { Router, Response } from "express";

const routes = Router();

routes.get("/", (_, response: Response) => {
  return response.json({ status: "success" });
});

export { routes };
