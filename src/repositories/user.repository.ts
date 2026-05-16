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
