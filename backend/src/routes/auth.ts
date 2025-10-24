import { Router } from "express";
import { z } from "zod";
import { hashPassword, verifyPassword } from "../auth/password.js";
import { signAccess } from "../auth/tokens.js";
import type { Role } from "../types.js";

const router = Router();

// In-memory users (remplace par DB)
const users = new Map<string, { id: string; email: string; hash: string; role: Role }>();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["USER", "EMPLOYEE", "ADMIN"]).default("USER"),
});

router.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.issues });
  const { email, password, role } = parsed.data;
  if (users.has(email)) return res.status(409).json({ message: "Email already used" });
  const id = String(users.size + 1);
  const hash = await hashPassword(password);
  users.set(email, { id, email, hash, role });
  return res.status(201).json({ id, email, role });
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.issues });
  const { email, password } = parsed.data;
  const user = users.get(email);
  if (!user) return res.sendStatus(401);
  const ok = await verifyPassword(password, user.hash);
  if (!ok) return res.sendStatus(401);
  const token = signAccess(user.id, user.role);
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60 * 1000,
  });
  return res.json({ ok: true, role: user.role });
});

router.post("/logout", (req, res) => {
  res.clearCookie("access_token", { path: "/" });
  res.json({ ok: true });
});

export default router;
