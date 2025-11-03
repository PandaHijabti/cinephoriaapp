import { Router } from "express";

const router = Router();

  /*nom fim, liste de film*/
router.get("/", (_req, res) => {
  res.json([
    { id: 1, title: "Inception", year: 2010, rating: 8.8, poster: "https://placehold.co/200x300?text=Inception" },
    { id: 2, title: "Interstellar", year: 2014, rating: 8.6, poster: "https://placehold.co/200x300?text=Interstellar" },
    { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, poster: "https://placehold.co/200x300?text=Dark+Knight"},
    { id: 4, tittle: "parasite", year: 2019, rating: 8.6, poster: "https://placehold.co/200x300?text=Parasite"},
    { id: 5, tittle: "the Matrix", year: 1999, rating: 8.7, poster: "https://placehold.co/200x300?text=Matrix"}
  ]);
});

export default router;
