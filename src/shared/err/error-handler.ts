import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import { AppError } from "./error";


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    // aviso — não é crash, mas precisa ser monitorado
    logger.warn("AppError", {
      message: err.message,
      status: err.statusCode,
      path: req.originalUrl,
      userId: (req as any).userId,
      stack: err.stack,
    });

    return res.status(err.statusCode).json({ message: err.message });
  }

  // erro não tratado — gravar full stack e retornar 500
  logger.error("Unhandled Error", {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    userId: (req as any).userId,
  });

  return res.status(500).json({ message: "Internal server error" });
}
