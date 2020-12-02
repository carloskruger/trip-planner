CREATE TABLE users (
userid SERIAL PRIMARY KEY,
username varchar(100),
useremail varchar(50),
password text
)


CREATE TABLE trips (
tripid SERIAL PRIMARY KEY,
destination varchar(100),
departure_date varchar(10),
return_date varchar(10),
trip_completed boolean, 
travelerid integer references users(userid)
)

CREATE TABLE pictures (
pictureid SERIAL PRIMARY KEY,
title varchar(30),
picture TEXT,
tripid integer references trips(tripid)
)

CREATE TABLE notes (
noteid SERIAL PRIMARY KEY,
title varchar(30),
note TEXT,
tripid integer references trips(tripid)
)
