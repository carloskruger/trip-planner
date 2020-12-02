INSERT INTO users (username, useremail, password)
VALUES ($1, $2, $3)
RETURNING *;