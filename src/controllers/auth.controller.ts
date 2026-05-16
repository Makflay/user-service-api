import type { Request, Response } from "express";
import { registerUser } from "../services/auth.services";
import { registerSchema } from "../validators/auth.validator";

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
