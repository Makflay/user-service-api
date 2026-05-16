import jwt from "jsonwebtoken";
import { env } from "../config/env.config";

type JwtPayload = {
  userId: string;
  role: "ADMIN" | "USER";
};

export const signAccessToken = (payload: JwtPayload): string => {
  const secret = env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(payload, secret, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  const secret = env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const payload = jwt.verify(token, secret);

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("userId" in payload) ||
    !("role" in payload)
  ) {
    throw new Error("invalid token payload");
  }

  return {
    userId: String(payload.userId),
    role: payload.role === "ADMIN" ? "ADMIN" : "USER",
  };
};
