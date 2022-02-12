import { Request, Response, Router } from "express";

import { CreateRequestService } from "../services/CreateRequestService";

const requestsRouter = Router();

interface IRequest {
  id_user: string;
  quantity: number;
}

requestsRouter.post("/", async (request: Request, response: Response) => {
  const { id_user, quantity }: IRequest = request.body;

  const createRequest = new CreateRequestService();

  const newRequest = await createRequest.execute({ id_user, quantity });

  response.json(newRequest);
});

export { requestsRouter };
