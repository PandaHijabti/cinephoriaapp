import { Router } from "express";
import { showtimes, rooms } from "../data/store";

const router = Router();

// GET /api/showtimes?cinemaId=&filmId=&date=&people=
router.get("/", (req, res) => {
  const { cinemaId, filmId, date, people } = req.query as { cinemaId?: string; filmId?: string; date?: string; people?: string };
  const need = Number(people || "1");
  const result = showtimes.filter(s => {
    if (cinemaId && s.cinemaId !== cinemaId) return false;
    if (filmId && s.filmId !== filmId) return false;
    if (date && s.start.slice(0,10) !== date) return false;
    const room = rooms.find(r => r.id === s.roomId)!;
    return (room.capacity - s.reservedSeats.length) >= need;
  }).map(s => {
    const room = rooms.find(r => r.id === s.roomId)!;
    return {
      id: s.id, start: s.start, end: s.end,
      room: { id: room.id, name: room.name, capacity: room.capacity },
      quality: s.quality, price: s.priceByQuality[s.quality]
    };
  });
  res.json(result);
});

// GET /api/showtimes/:id/seats
router.get("/:id/seats", (req, res) => {
  const s = showtimes.find(x => x.id === req.params.id);
  if (!s) return res.sendStatus(404);
  const room = rooms.find(r => r.id === s.roomId)!;
  const seats = Array.from({ length: room.capacity }, (_, i) => {
    const num = i+1;
    return { seat: num, taken: s.reservedSeats.includes(num), accessible: s.accessibleSeats.includes(num) };
  });
  res.json({ showtimeId: s.id, quality: s.quality, seats });
});

export default router;
