import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "express-async-errors";

import { routes } from "./routes";

dotenv.config({ path: `${__dirname}/../.env` });

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.SERVER_PORT}!`);
});
