-- in order for this to work, i have to get the original record and check what gets changed
-- every field that is listed under this sql statements should get a value. If it does not gets changed
-- it gets the original value
update trips
set destination = $1,
departure_date = $2,
return_date = $3,
trip_completed = $4
where tripid = $5
RETURNING *;