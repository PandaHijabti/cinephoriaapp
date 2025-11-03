import { Router } from "express";
import { z } from "zod";
import { reservations, showtimes, rooms } from "../data/store";

const router = Router();

const ReservationSchema = z.object({
  showtimeId: z.string(),
  seats: z.array(z.number().int().positive()).min(1)
});

router.post("/", (req, res) => {
  const parsed = ReservationSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.issues });

  const { showtimeId, seats } = parsed.data;
  const s = showtimes.find(x => x.id === showtimeId);
  if (!s) return res.status(404).json({ error: "Showtime not found" });

  const room = rooms.find(r => r.id === s.roomId)!;
  for (const seat of seats) {
    if (seat < 1 || seat > room.capacity) return res.status(400).json({ error: `Seat ${seat} invalid` });
    if (s.reservedSeats.includes(seat)) return res.status(409).json({ error: `Seat ${seat} already taken` });
  }

  s.reservedSeats.push(...seats);
  const id = "R" + (reservations.length + 1);
  reservations.push({ id, userId: "1", showtimeId, seats, createdAt: new Date().toISOString() });

  return res.status(201).json({ id, showtimeId, seats, status: "CONFIRMED" });
});

router.get("/me", (_req, res) => {
  res.json(reservations.filter(r => r.userId === "1"));
});

export default router;
