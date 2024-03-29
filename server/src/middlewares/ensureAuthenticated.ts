import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import authConfig from "../config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const AuthHeader = request.headers.authorization;

  if (!AuthHeader) {
    throw new AppError("Token de autenticação ausente", 401);
  }

  try {
    const decoded = verify(AuthHeader, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Autenticação inválida, por favor refaça login", 401);
  }
}
