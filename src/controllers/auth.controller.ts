import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.services";
import { registerSchema, loginSchema } from "../validators/auth.validator";

export const registerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data = registerSchema.parse(req.body);
  const user = await registerUser(data);

  res.status(201).json({
    user,
  });
};

export const loginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data = loginSchema.parse(req.body);

  const result = await loginUser(data);

  res.status(200).json(result);
};
