update trips
set destination = $1,
departure_date = $2,
return_date = $3
where tripid = $4
RETURNING *;


