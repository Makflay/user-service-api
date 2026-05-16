import { UserStatus } from "../generated/prisma/enums";
import { prisma } from "../config/prisma";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = (data: {
  fullName: string;
  birthDate: Date;
  email: string;
  passwordHash: string;
}) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      fullName: true,
      birthDate: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findUserByEmailWithPassword = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const userPublicSelect = {
  id: true,
  fullName: true,
  birthDate: true,
  email: true,
  role: true,
  status: true,
  createdAt: true,
  updatedAt: true,
};

export const findUserById = (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: userPublicSelect,
  });
};

export const findUsers = () => {
  return prisma.user.findMany({
    select: userPublicSelect,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const blockUserById = (id: string) => {
  return prisma.user.update({
    where: { id },
    data: { status: UserStatus.BLOCKED },
    select: userPublicSelect,
  });
};
