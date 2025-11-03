import { Router } from "express";
import { z } from "zod";
import { hashPassword, verifyPassword } from "../auth/password";
import { signAccess } from "../auth/tokens";
import type { Role } from "../data/store";

// Utilisateurs en mémoire (remplacé plus tard par une vraie DB)
export const users = new Map<string, { id: string; email: string; hash: string; role: Role }>();

// (Optionnel) SEED: crée un compte prof à chaque démarrage si absent
void (async () => {
  const email = "prof@cinephoria.com";
  if (!users.has(email)) {
    const hash = await hashPassword("Cinema123!"); // mot de passe par défaut démo
    users.set(email, { id: "seed-1", email, hash, role: "ADMIN" });
    console.log("✅ Seed user created:", email);
  }
})();

const router = Router();

// ---------------- Schemas ----------------
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["USER", "EMPLOYEE", "ADMIN"]).default("USER"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// ---------------- Routes -----------------

// Inscription
router.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.issues });

  const { email, password, role } = parsed.data;
  if (users.has(email)) return res.status(409).json({ message: "Email already used" });

  const id = String(users.size + 1);
  const hash = await hashPassword(password);
  users.set(email, { id, email, hash, role });

  const token = signAccess(id, role);
  res.cookie("access_token", token, cookieOpts());
  return res.status(201).json({ ok: true, email, role });
});

// Connexion
router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.issues });

  const { email, password } = parsed.data;
  const user = users.get(email);
  if (!user) return res.sendStatus(401);

  const ok = await verifyPassword(password, user.hash);
  if (!ok) return res.sendStatus(401);

  const token = signAccess(user.id, user.role);
  res.cookie("access_token", token, cookieOpts());
  return res.json({ ok: true, role: user.role });
});

// Déconnexion
router.post("/logout", (_req, res) => {
  res.clearCookie("access_token", { path: "/", sameSite: "lax" });
  res.json({ ok: true });
});

// Ping authentification (présence du cookie)
router.get("/me", (req, res) => {
  const has = Boolean(req.cookies?.["access_token"]);
  return has ? res.json({ ok: true }) : res.sendStatus(401);
});

// ---------------- Utils ------------------
function cookieOpts() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd ? true : false, // en prod => HTTPS requis
    sameSite: "lax" as const,
    path: "/",
    maxAge: 15 * 60 * 1000, // 15 min
  };
}

export default router;

