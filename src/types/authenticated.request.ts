import type { Request } from "express";
import type { UserRole } from "../generated/prisma/enums";

export type AuthenticatedRequest = Request & {
  user: {
    id: string;
    role: UserRole;
  };
};
