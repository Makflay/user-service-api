import { UserRole } from "../generated/prisma/enums";
import type { RequestHandler } from "express";
import { AppError } from "../utils/app.error";

export const requireAdmin: RequestHandler = (req, _res, next): void => {
  if (!req.user) {
    next(new AppError("Unauthrized", 401));
    return;
  }

  if (req.user.role !== UserRole.ADMIN) {
    next(new AppError("Forbidden", 403));
    return;
  }

  next();
};
