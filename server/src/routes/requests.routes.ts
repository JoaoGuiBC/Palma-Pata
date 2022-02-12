import { Request, Response, Router } from "express";

import { prisma } from "../database/prismaClient";
import { CreateRequestService } from "../services/CreateRequestService";

const requestsRouter = Router();

interface IRequest {
  id_user: string;
  quantity: number;
}

requestsRouter.get("/listAll", async (_: Request, response: Response) => {
  const requests = await prisma.requests.findMany();

  response.json(requests);
});

requestsRouter.get("/", async (_: Request, response: Response) => {
  const requests = await prisma.requests.findMany({
    where: {
      collected: false,
    },
  });

  response.json(requests);
});

requestsRouter.post("/", async (request: Request, response: Response) => {
  const { id_user, quantity }: IRequest = request.body;

  const createRequest = new CreateRequestService();

  const newRequest = await createRequest.execute({ id_user, quantity });

  response.json(newRequest);
});

export { requestsRouter };
