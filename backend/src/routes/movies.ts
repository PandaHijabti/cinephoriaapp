import { Router } from "express";
import { films, showtimes, cinemas, rooms, type Film, type Genre } from "../data/store";

const router = Router();

// GET /api/films?cinemaId=&genre=&day=YYYY-MM-DD
router.get("/", (req, res) => {
  let result: Film[] = films;
  const { cinemaId, genre, day } = req.query as { cinemaId?: string; genre?: Genre; day?: string };

  if (genre) result = result.filter(f => f.genres.includes(genre));
  if (cinemaId) {
    const ids = new Set(showtimes.filter(s => s.cinemaId === cinemaId).map(s => s.filmId));
    result = result.filter(f => ids.has(f.id));
  }
  if (day) {
    const d0 = new Date(day + "T00:00:00"), d1 = new Date(day + "T23:59:59");
    const ids = new Set(showtimes.filter(s => { const t = new Date(s.start); return t >= d0 && t <= d1; }).map(s => s.filmId));
    result = result.filter(f => ids.has(f.id));
  }
  res.json(result);
});

// GET /api/films/last-wednesday
router.get("/last-wednesday", (_req, res) => {
  const latest = films.reduce((acc, f) => new Date(f.addedAt) > new Date(acc) ? f.addedAt : acc, films[0].addedAt);
  res.json(films.filter(f => f.addedAt === latest));
});

// GET /api/films/:id (+ sessions)
router.get("/:id", (req, res) => {
  const film = films.find(f => f.id === req.params.id);
  if (!film) return res.sendStatus(404);
  const sessions = showtimes.filter(s => s.filmId === film.id).map(s => {
    const room = rooms.find(r => r.id === s.roomId)!;
    const cinema = cinemas.find(c => c.id === s.cinemaId)!;
    return {
      id: s.id,
      day: s.start.slice(0,10),
      start: s.start, end: s.end,
      cinema: { id: cinema.id, name: cinema.name, city: cinema.city },
      room: { id: room.id, name: room.name },
      quality: s.quality,
      price: s.priceByQuality[s.quality]
    };
  });
  res.json({ ...film, sessions });
});

export default router;

