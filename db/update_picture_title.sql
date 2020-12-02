update pictures
set title = $1
where pictureid = $2
RETURNING *;