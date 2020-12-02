insert into pictures (title, picture, tripid)
values ($1, $2, $3)
RETURNING *;
