import bcrypt from "bcrypt";
import { UserStatus } from "../generated/prisma/enums";
import { AppError } from "../utils/app.error";
import { createUser, findUserByEmail } from "../repositories/user.repository";
import { signAccessToken } from "../utils/jwt";
import { findUserByEmailWithPassword } from "../repositories/user.repository";

type RegisterUserInput = {
  fullName: string;
  birthDate: Date;
  email: string;
  password: string;
};

const BCRYPT_SALT_ROUNDS = 10;

export const registerUser = async (input: RegisterUserInput) => {
  const exitingUser = await findUserByEmail(input.email);

  if (exitingUser) {
    throw new AppError(`User with this email already exists`, 409);
  }

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_SALT_ROUNDS);

  return createUser({
    fullName: input.fullName,
    birthDate: input.birthDate,
    email: input.email,
    passwordHash,
  });
};

type LoginInput = {
  email: string;
  password: string;
};

export const loginUser = async (input: LoginInput) => {
  const user = await findUserByEmailWithPassword(input.email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    input.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw new AppError("User is blocked", 403);
  }

  const accessToken = signAccessToken({ userId: user.id, role: user.role });

  return {
    accessToken,
  };
};
