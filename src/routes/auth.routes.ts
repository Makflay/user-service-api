import { Router } from "express";
import { registerController } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/async.handler";

export const authRouter = Router();

authRouter.post("/register", asyncHandler(registerController));
