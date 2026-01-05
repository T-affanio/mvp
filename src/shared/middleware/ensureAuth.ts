import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  console.log("🔐 ensureAuth:", req.method, req.originalUrl);

  // 👉 deixa o CORS preflight passar
  if (req.method === "OPTIONS") {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string;
    };

    req.userId = decoded.sub;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
