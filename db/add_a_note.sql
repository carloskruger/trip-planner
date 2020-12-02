insert into notes (title, note, tripid)
values ($1, $2, $3)

RETURNING *;