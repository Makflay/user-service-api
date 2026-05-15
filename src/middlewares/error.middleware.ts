import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/app.error";

export const errorMiddleware: ErrorRequestHandler = (
  error: Error,
  _req,
  res,
  _next,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: "Internal server error",
  });
};
