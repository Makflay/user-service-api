import express from "express";

export const app = express();

app.use(express.json());

app.get("/api", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "user-service-api",
  });
});
