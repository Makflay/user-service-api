import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app.error";

export const errorMiddleware: ErrorRequestHandler = (
  error: Error,
  _req,
  res,
  _next,
): void => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Validation error",
      errors: error.issues,
    });
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: "Internal server error",
  });
};
