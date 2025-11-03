import express from "express";
import cors from "cors";
import 'dotenv/config';

import filmsRouter from "./routes/films";
import authRouter, { users } from "./routes/auth";
import { hashPassword } from "./auth/password";



const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes principales
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/films", filmsRouter);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`[cinephoria] API started on http://localhost:${PORT}`);
});

// ✅ Création d’un compte test au démarrage
(async () => {
  try {
    const email = "prof@cinephoria.com";
    const password = "12345678";
    const role = "USER";
    const hash = await hashPassword(password);
    users.set(email, { id: "1", email, hash, role });
    console.log("✅ Compte test créé :", email, password);
  } catch (err) {
    console.error("❌ Erreur création compte test :", err);
  }
})();
