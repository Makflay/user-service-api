import type { RequestHandler } from "express";
import { AppError } from "../utils/app.error";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware: RequestHandler = (req, _res, next): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer")) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    next(new AppError("Unauthrized", 401));
    return;
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    next(new AppError("unauthrized", 401));
  }
};
