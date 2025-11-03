// backend/src/data/store.ts

// --- Types ---
export type Role = "USER" | "EMPLOYEE" | "ADMIN";
export type Quality = "2D" | "3D" | "4DX" | "4K";
export type Genre = "Action" | "Drama" | "Comedy" | "Sci-Fi" | "Adventure" | "Fantasy";

export type Cinema = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
};

export type Film = {
  id: string;
  title: string;
  description: string;
  minAge: number;
  poster: string;
  genres: Genre[];
  staffPick: boolean;
  rating: number;
  addedAt: string;   
  year: number;      
};

export type Room = {
  id: string;
  cinemaId: string;
  name: string;
  capacity: number;
  quality: Quality;
};

export type Showtime = {
  id: string;
  cinemaId: string;
  roomId: string;
  filmId: string;
  quality: Quality;
  start: string;   // ISO
  end: string;     // ISO
  reservedSeats: number[];
  accessibleSeats: number[];
  priceByQuality: Record<Quality, number>;
};

export type Reservation = {
  id: string;
  userId: string;
  showtimeId: string;
  seats: number[];
  createdAt: string; // ISO
};

// --- Helpers dates ---
const lastWednesday = (() => {
  const d = new Date();
  const day = d.getDay();               // 0=dimanche ... 3=mercredi
  const diff = (day >= 3) ? day - 3 : 7 - (3 - day);
  d.setDate(d.getDate() - diff);
  d.setHours(12, 0, 0, 0);
  return d.toISOString();
})();

const tomorrowAt = (h: number, m: number) => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

// --- Données ---
export const cinemas: Cinema[] = [
  { id: "cPAR", name: "Cinéphoria Paris",  city: "Paris",  address: "12 Rue du Film, 75000 Paris",  phone: "+33 1 23 45 67 89", hours: "10:00-23:30" },
  { id: "cNAN", name: "Cinéphoria Nantes", city: "Nantes", address: "5 Quai Cinéma, 44000 Nantes", phone: "+33 2 11 22 33 44", hours: "10:00-23:30" },
];

export const films: Film[] = [
  { id: "f1", title: "Inception",           description: "Rêves dans rêves.",            minAge: 12, poster: "assets/posters/inception.jpg", genres: ["Sci-Fi","Action"],      staffPick: true,  rating: 4.6, addedAt: '2025-10-29', year: 2010 },
  { id: "f2", title: "Interstellar",        description: "Voyage spatial et temps.",     minAge: 10, poster: "assets/posters/interstellar.jpg", genres: ["Sci-Fi","Drama"],       staffPick: false, rating: 4.7, addedAt: '2025-10-29', year: 2014 },
  { id: "f3", title: "Dune: Part Two",      description: "Épopée sur Arrakis.",          minAge: 12, poster: "assets/posters/dune2.jpg", genres: ["Action","Drama"],staffPick: true,  rating: 4.5, addedAt: '2025-10-29', year: 2024 },
  { id: "f4", title: "The Batman",          description: "Gotham sous la pluie.",        minAge: 12, poster: "assets/posters/batman.jpg", genres: ["Action","Drama"],       staffPick: false, rating: 4.2, addedAt: '2025-10-29', year: 2022 },
  { id: "f5", title: "Avatar: La voie de l’eau", description: "Retour à Pandora.",       minAge: 10, poster: "assets/posters/avatar2.jpg", genres: ["Fantasy","Adventure"],  staffPick: false, rating: 4.1, addedAt: '2025-10-29', year: 2022 },
];

export const rooms: Room[] = [
  { id: "rPAR1", cinemaId: "cPAR", name: "Salle 1", capacity: 30, quality: "4K" },
  { id: "rPAR2", cinemaId: "cPAR", name: "Salle 2", capacity: 24, quality: "3D" },
  { id: "rNAN1", cinemaId: "cNAN", name: "Salle 1", capacity: 20, quality: "2D" },
];

// Quelques séances demain pour la réservation
export const showtimes: Showtime[] = [
  {
    id: "s1", cinemaId: "cPAR", roomId: "rPAR1", filmId: "f1", quality: "4K",
    start: tomorrowAt(14, 0), end: tomorrowAt(16, 20),
    reservedSeats: [5, 6, 7], accessibleSeats: [1, 2],
    priceByQuality: { "2D": 8, "3D": 10, "4DX": 15, "4K": 12 },
  },
  {
    id: "s2", cinemaId: "cPAR", roomId: "rPAR2", filmId: "f2", quality: "3D",
    start: tomorrowAt(17, 30), end: tomorrowAt(20, 0),
    reservedSeats: [10, 11], accessibleSeats: [2],
    priceByQuality: { "2D": 8, "3D": 10, "4DX": 15, "4K": 12 },
  },
  {
    id: "s3", cinemaId: "cNAN", roomId: "rNAN1", filmId: "f3", quality: "2D",
    start: tomorrowAt(19, 0), end: tomorrowAt(21, 30),
    reservedSeats: [], accessibleSeats: [1],
    priceByQuality: { "2D": 8, "3D": 10, "4DX": 15, "4K": 12 },
  },
];

export const reservations: Reservation[] = [];
