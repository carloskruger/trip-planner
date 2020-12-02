insert into trips (destination, departure_date, return_date, trip_completed, travelerid)
values ($1, $2, $3, $4, $5)
RETURNING *;