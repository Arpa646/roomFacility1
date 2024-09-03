import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";

import globalErrorHandler from "./app/middleware/globalErrorHandler";

import router from "./app/route/intex";
import notFound from "./app/middleware/notFound";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get("/", getAController);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
