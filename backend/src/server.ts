import "dotenv/config";
import "reflect-metadata";

export { container } from "./ioc/ioc";

import cors from "cors";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import { Env } from "./config/configuration";
import { connectToDatabase } from "./config/mongoose.config";
import { eventRouter } from "./infrastructure/http/routes/eventRoutes";

function bootstrap() {
  const app = express();
  const port = Env.get<number>("PORT");
  const host = Env.get<string>("HOST");

  app.use(cors());
  app.use(express.json());
  app.use(morgan("common"));
  app.use("/event", eventRouter);

  const http = createServer(app);
  http.listen(port, () => {
    console.log(`Server running on ${host}:${port}`);
  });
}

connectToDatabase()
  .then(() => bootstrap())
  .catch((error) => {
    console.log(
      error
      // "Can't connect to MongoDB, please check the connection uri and the database status"
    );
    process.exit(1);
  });
