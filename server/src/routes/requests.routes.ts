import { Request, Response, Router } from "express";

import { prisma } from "../database/prismaClient";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import { CreateRequestService } from "../services/requests/CreateRequestService";
import { ListBestContributors } from "../services/requests/ListBestContributors";

const requestsRouter = Router();

interface IRequest {
  id_user: string;
  quantity: number;
}

interface ICompleteRequest {
  request_id: string;
}

requestsRouter.get("/listAll", async (_: Request, response: Response) => {
  const requests = await prisma.requests.findMany();

  return response.json(requests);
});

requestsRouter.get("/", async (_: Request, response: Response) => {
  const requests = await prisma.requests.findMany({
    where: {
      collected: false,
    },
  });

  return response.json(requests);
});

requestsRouter.get(
  "/bestContributors",
  async (_: Request, response: Response) => {
    const listContributors = new ListBestContributors();

    const list = await listContributors.execute();

    return response.json(list);
  }
);

requestsRouter.post(
  "/",
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const { quantity }: IRequest = request.body;
    const { id } = request.user;

    const createRequest = new CreateRequestService();

    const newRequest = await createRequest.execute({
      id_user: id,
      quantity,
    });

    return response.json(newRequest);
  }
);

requestsRouter.put(
  "/complete",
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const { request_id }: ICompleteRequest = request.body;

    await prisma.requests.update({
      where: {
        id: request_id,
      },
      data: {
        collected: true,
        ended_at: new Date(),
      },
    });

    return response.json({
      status: "Success",
      message: "Pacote coletado com sucesso",
    });
  }
);

export { requestsRouter };
