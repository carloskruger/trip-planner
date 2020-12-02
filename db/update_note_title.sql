update notes
set title = $1
where notesid = $2
RETURNING *;