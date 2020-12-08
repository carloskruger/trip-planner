update pictures
set title = $1,
picture = $2
where pictureid = $3
RETURNING *;