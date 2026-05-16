import { UserStatus } from "../generated/prisma/enums";
import { AppError } from "../utils/app.error";
import {
  blockUserById,
  findUserById,
  findUsers,
} from "../repositories/user.repository";

export const getUserById = async (id: string) => {
  const user = await findUserById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const getUsers = () => {
  return findUsers();
};

export const blockUser = async (id: string) => {
  const user = await findUserById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.status === UserStatus.BLOCKED) {
    throw new AppError("User is already blocked", 409);
  }

  return blockUserById(id);
};
