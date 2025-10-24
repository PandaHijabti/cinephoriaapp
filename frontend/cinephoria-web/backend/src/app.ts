import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import moviesRoutes from "./routes/movies.js";

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "img-src": ["'self'", "data:"],
      "connect-src": ["'self'"],
    },
  },
}));

app.use(express.json({ limit: "200kb" }));
app.use(cookieParser());

const allowed = process.env.CORS_ORIGIN?.split(",").map(s => s.trim()).filter(Boolean) || ["http://localhost:4200"];
app.use(cors({ origin: allowed, credentials: true }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// Healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);

export default app;
