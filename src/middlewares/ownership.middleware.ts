import { UserRole } from "../generated/prisma/enums";
import type { RequestHandler } from "express";
import { AppError } from "../utils/app.error";

export const requireAdminOrSelf: RequestHandler = (req, _res, next): void => {
  if (!req.user) {
    next(new AppError("Unauthrized", 401));
    return;
  }

  const { id } = req.params;

  if (!id) {
    next(new AppError("User id param is required", 400));
    return;
  }

  if (req.user.role === UserRole.ADMIN || req.user.id === id) {
    next();
    return;
  }

  next(new AppError("Forbidden", 403));
};
