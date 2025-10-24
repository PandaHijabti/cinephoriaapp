import { Router } from "express";
import { requireAuth, requireRole } from "../auth/middleware.js";
import { z } from "zod";

const router = Router();
// In-memory movies
let MOVIES: any[] = [];

const movieSchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().min(1).max(2000),
  minAge: z.number().int().min(0).max(18),
  isFavorite: z.boolean().optional(),
});

router.get("/", (_req, res) => res.json(MOVIES));

router.post("/", requireAuth, requireRole("ADMIN", "EMPLOYEE"), (req, res) => {
  const parsed = movieSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.issues });
  const movie = { id: String(MOVIES.length + 1), ...parsed.data };
  MOVIES.push(movie);
  res.status(201).json(movie);
});

export default router;
