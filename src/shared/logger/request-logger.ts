import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const [secs, nanosecs] = process.hrtime(start);
    const ms = (secs * 1000 + nanosecs / 1e6).toFixed(2);

    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${ms} ms`,
      {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: ms,
        userId: (req as any).userId, // caso tenha
        ip: req.ip,
      }
    );
  });

  next();
};
