require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();

const ctrl = require("./controller");

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
})
	.then((db) => {
		app.set("db", db);
		console.log("Connected to database");
	})
	.catch((err) => console.log(err));

app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: SESSION_SECRET,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
		},
	})
);

app.use(express.json());

app.post("/api/register", ctrl.register);

app.post("/api/login", ctrl.login);

app.post("/api/trips", ctrl.addTrip);

app.get("/api/trips/user/:userid", ctrl.getAllTripsByUserId);

app.post("/api/trips/:tripid/notes", ctrl.addANote);

app.get("/api/trips/:tripid/notes", ctrl.getAllNotesForATrip);

app.get("/api/trips/notes/:noteid", ctrl.getANoteByNoteId);

app.delete("/api/trips/notes/:tripid/:noteid", ctrl.deleteANote);

app.post("/api/trips/:tripid/pictures", ctrl.addAPicture);

app.get("/api/trips/:tripid/pictures", ctrl.getAllPicturesForATrip);

app.delete("/api/trips/pictures/:tripid/:pictureid", ctrl.deleteAPicture);

app.get("/api/trips/pictures/:pictureid", ctrl.getAPictureByPictureId);

app.get("/api/trips/trips/:tripid", ctrl.getATripByTripId);

app.delete("/api/trips/trips/:tripid", ctrl.deleteATrip);

app.put("/api/trips/update/:tripid", ctrl.updateATrip);

app.put("/api/notes/update/:noteid", ctrl.updateANote);

app.put("/api/pictures/update/:pictureid", ctrl.updateAPicture);

app.put("/api/trips/complete/:tripid", ctrl.markComplete);

app.listen(SERVER_PORT, () => {
	console.log(`App is listening on ${SERVER_PORT}`);
});
