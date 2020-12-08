update notes
set title = $1,
note = $2
where notesid = $3
RETURNING *;