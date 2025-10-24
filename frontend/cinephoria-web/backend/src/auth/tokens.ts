import jwt from "jsonwebtoken";
import type { Role } from "../types.js";

export function signAccess(sub: string, role: Role) {
  return jwt.sign({ sub, role }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });
}
