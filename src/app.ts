import cors from "cors";
import express, { Application, Request, Response } from "express";

import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/route/intex";
import notFound from "./app/middleware/notFound";

const app: Application = express();

// Parsers
app.use(express.json());


app.use(cors({
  credentials: true,
  origin: "https://flourishing-stroopwafel-629c6d.netlify.app"
}));




// Application routes
app.use("/api", router);



// app.get("/", getAController);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
