import { Router } from "express";
import {
  blockUserController,
  getUserByIdController,
  getUsersController,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireAdminOrSelf } from "../middlewares/ownership.middleware";
import { requireAdmin } from "../middlewares/role.middleware";
import { asyncHandler } from "../utils/async.handler";

export const userRouter = Router();

userRouter.get(
  "/",
  authMiddleware,
  requireAdmin,
  asyncHandler(getUsersController),
);

userRouter.get(
  "/:id",
  authMiddleware,
  requireAdminOrSelf,
  asyncHandler(getUserByIdController),
);

userRouter.patch(
  "/:id/block",
  authMiddleware,
  requireAdmin,
  asyncHandler(blockUserController),
);
