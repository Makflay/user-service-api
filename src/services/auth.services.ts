import bcrypt from "bcrypt";
import { AppError } from "../utils/app.error";
import { createUser, findUserByEmail } from "../repositories/user.repository";

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
