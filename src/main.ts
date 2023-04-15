import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import bodyParser from "body-parser";
import express from "express";

import { config } from "./config";
import userRouter from "../src/modules/users/infrastructure/http/user-router";
import productRouter from "../src/modules/products/infrastructure/http/product-router";
import logger from "./utils/logger";
import { CONNECTIONS } from "./database/connection-dependencies";

function boostrap() {
  const app = express();

  app.use(bodyParser.json());

  app.use("/users", userRouter);
  app.use("/products", productRouter);

  const { port } = config.server;

  app.listen(port, () => {
    logger.info(`[APP] - Starting application on port ${port}`);
    CONNECTIONS.connectTo(process.env.DATABASE!)
  });
}

boostrap();
