import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/not.found.middleware";
import { router } from "./routes/index";

export const app = express();

app.use(express.json());
app.use("/api", router);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.get("/test", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "user-service-api",
  });
});
