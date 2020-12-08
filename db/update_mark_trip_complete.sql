update trips
set trip_completed = true
where tripid = $1
RETURNING *;