import type { Request, Response } from "express";
import type { UserIdParams } from "../types/route.params";
import { blockUser, getUserById, getUsers } from "../services/user.service";

export const getUsersController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const users = await getUsers();

  res.status(200).json({
    users,
  });
};

export const getUserByIdController = async (
  req: Request<UserIdParams>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  const user = await getUserById(id);
  res.status(200).json({
    user,
  });
};

export const blockUserController = async (
  req: Request<UserIdParams>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  const user = await blockUser(id);

  res.status(200).json({
    user,
  });
};
