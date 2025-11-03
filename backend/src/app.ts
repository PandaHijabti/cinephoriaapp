// backend/src/app.ts
import 'dotenv/config';
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";


// 🧩 Import des routes (en .ts, donc pas besoin de .js)
import authRoutes from "./routes/auth";
import moviesRoutes from "./routes/movies";
import cinemasRoutes from "./routes/cinemas";
import filmsRoutes from "./routes/movies";
import showtimesRoutes from "./routes/showtimes";
import reservationsRoutes from "./routes/reservations";

const app = express();

// Sécurité : Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "data:"],
        "connect-src": ["'self'"],
      },
    },
  })
);

// Middlewares
app.use(express.json({ limit: "200kb" }));
app.use(cookieParser());

// CORS : autoriser ton frontend Angular
const allowed = (process.env.CORS_Origin?? 'http://localhost:4200').split(',').map(s => s.trim());
app.use(cors({origin: allowed, credentials: true}));

// Limiteur de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);

// Test rapide
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/cinemas", cinemasRoutes);
app.use("/api/films", filmsRoutes);
app.use("/api/showtimes", showtimesRoutes);
app.use("/api/reservations", reservationsRoutes);

// Lancement du serveur
const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`[backend] listening on port ${port}`));
