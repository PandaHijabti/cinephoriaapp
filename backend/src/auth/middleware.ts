import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { Role } from "../data/store";

const JWT_SECRET = process.env.JWT_ACCESS_SECRET;
type Payload = { sub: string; role: Role; iat: number; exp: number }; 

declare global {
  namespace Express {
    interface Request {
      user?:{ id: string; role: Role};
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction){ 
  const token = req.cookies?.['access_token'];
  if (!token) return res.sendStatus(401);
  try {
    const p = jwt.verify(token, JWT_SECRET!) as Payload;
    req.user = { id: p.sub, role: p.role };
    return next();
  } catch {
    return res.sendStatus(401);
  }
}

export function requireRole(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.sendStatus(401);
    if (!roles.includes(req.user.role)) return res.sendStatus(403);
  };
}
