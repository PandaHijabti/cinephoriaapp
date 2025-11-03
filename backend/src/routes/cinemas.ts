import { Router } from "express";
import { cinemas } from "../data/store";

const router = Router();

router.get("/", (_req, res) => res.json(cinemas));

router.get("/footer", (_req, res) => {
  res.json(cinemas.map(c => ({ name: c.name, address: c.address, phone: c.phone, hours: c.hours })));
});

export default router;
