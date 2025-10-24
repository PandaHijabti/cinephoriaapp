-- Transaction d'exemple : réserver N sièges pour une séance
-- Paramètres : @userId, @showId, @seat1, @seat2, ...

START TRANSACTION;

-- Verrouille les sièges visés pour éviter le surbooking
-- (si tu as une table seats, utiliser SELECT ... FOR UPDATE)
-- Ici on vérifie l'absence de conflit via contrainte unique + tentative d'insert

-- Exemple d'inserts paramétrés (à faire côté app via requêtes préparées)
-- INSERT INTO reservations (user_id, show_id, seat_number, price_cents)
-- VALUES (?, ?, ?, ?), (?, ?, ?, ?), ...;

-- SI une des lignes viole uniq_seat_per_show => ROLLBACK
-- SINON => COMMIT

COMMIT;
