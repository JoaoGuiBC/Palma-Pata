import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";

import { routes } from "./routes";
import { AppError } from "./errors/AppError";

dotenv.config({ path: `${__dirname}/../.env` });

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.SERVER_PORT}!`);
});
