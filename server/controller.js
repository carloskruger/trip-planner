const bcrypt = require("bcrypt");

module.exports = {
	register: async (req, res) => {
		const db = req.app.get("db");
		const { username, useremail, password } = req.body;

		const foundUser = await db.check_user([username]);

		if (foundUser[0]) {
			return res.status(400).send("username already registered");
		}
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const [newUser] = await db.add_user([username, useremail, hash]);
		req.session.user = {
			userId: newUser.userid,
			username: newUser.username,
			useremail: newUser.useremail,
		};
		res.status(200).send(req.session.user);
	},

	login: async (req, res) => {
		const db = req.app.get("db");

		const { username, password } = req.body;
		const [foundUser] = await db.check_user([username]);
		if (!foundUser) {
			return res.status(401).send("Incorrect login information");
		}
		const authenticated = bcrypt.compareSync(password, foundUser.password);
		if (authenticated) {
			req.session.user = {
				userId: foundUser.userid,
				username: foundUser.username,
				useremail: foundUser.useremail,
			};
			res.status(200).send(req.session.user);
		} else {
			res.status(401).send("Incorrect login information");
		}
	},

	addTrip: async (req, res) => {
		const db = req.app.get("db");
		const {
			destination,
			departure_date,
			return_date,
			trip_completed,
			travelerid,
		} = req.body;

		const [newTrip] = await db.add_trip([
			destination,
			departure_date,
			return_date,
			trip_completed,
			travelerid,
		]);

		res.status(200).send(newTrip);
	},

	getAllTripsByUserId: async (req, res) => {
		let trips = [];
		const db = req.app.get("db");
		const { userid } = req.params;

		trips = await db.get_all_trips_by_userid([+userid]);

		res.status(200).send(trips);
	},

	addANote: async (req, res) => {
		const db = req.app.get("db");
		const { tripid } = req.params;
		const { title, note } = req.body;

		const [newNote] = await db.add_a_note([title, note, tripid]);

		res.status(200).send(newNote);
	},

	getAllNotesForATrip: async (req, res) => {
		let notes = [];
		const db = req.app.get("db");
		const { tripid } = req.params;

		notes = await db.get_all_notes_for_a_trip([tripid]);

		res.status(200).send(notes);
	},

	getANoteByNoteId: async (req, res) => {
		const db = req.app.get("db");

		const { noteid } = req.params;
		const [retrievedNote] = await db.get_a_note_by_noteid([noteid]);
		res.status(200).send(retrievedNote);
	},

	deleteANote: async (req, res) => {
		const db = req.app.get("db");
		const { tripid, noteid } = req.params;
		const [deletedNote] = await db.delete_a_note([noteid]);
		let notes = [];
		notes = await db.get_all_notes_for_a_trip([tripid]);

		res.status(200).send(notes);
	},

	addAPicture: async (req, res) => {
		const db = req.app.get("db");

		const { tripid } = req.params;
		const { title, picture } = req.body;

		const [newPicture] = await db.add_a_picture([title, picture, tripid]);

		res.status(200).send(newPicture);
	},

	getAllPicturesForATrip: async (req, res) => {
		let pictures = [];
		const db = req.app.get("db");

		const { tripid } = req.params;

		pictures = await db.get_all_picture_for_trip([tripid]);

		res.status(200).send(pictures);
	},

	deleteAPicture: async (req, res) => {
		const db = req.app.get("db");
		const { tripid, pictureid } = req.params;
		const [deletedPicture] = await db.delete_a_picture([pictureid]);
		let pictures = [];
		pictures = await db.get_all_picture_for_trip([tripid]);
		res.status(200).send(pictures);
	},

	getAPictureByPictureId: async (req, res) => {
		const db = req.app.get("db");
		const { pictureid } = req.params;
		const [retrievedPicture] = await db.get_a_picture([pictureid]);
		res.status(200).send(retrievedPicture);
	},

	getATripByTripId: async (req, res) => {
		const db = req.app.get("db");
		const { tripid } = req.params;
		const [retrievedTrip] = await db.get_a_trip([tripid]);
		res.status(200).send(retrievedTrip);
	},

	deleteATrip: async (req, res) => {
		const db = req.app.get("db");
		const { tripid } = req.params;
		const [deletedTrip] = await db.delete_a_trip([tripid]);
		res.status(200).send(deletedTrip);
	},

	updateATrip: async (req, res) => {
		console.log("at controller.js updateATrip");
		const db = req.app.get("db");
		const { tripid } = req.params;
		console.log(typeof tripid);
		console.log("req.params at controller update a Trip", req.params);

		let { destination, departure_date, return_date } = req.body;
		console.log("req.body at controller update a trip ", req.body);
		// let [retrievedTrip] = await db.get_a_trip([tripid]);

		// if (!destination) {
		// 	destination = retrievedTrip.destination;
		// }
		// if (!departure_date) {
		// 	departure_date = retrievedTrip.departure_date;
		// }
		// if (!trip_completed) {
		// 	trip_completed = retrievedTrip.trip_completed;
		// }
		// if (!return_date) {
		// 	return_date = retrievedTrip.return_date;
		// }
		console.log("about to make db call");
		const [updatedTrip] = await db.update_trip([
			destination,
			departure_date,
			return_date,
			tripid,
		]);
		res.status(200).send(updatedTrip);
	},

	markComplete: async (req, res) => {
		const db = req.app.get("db");
		const { tripid } = req.params;
		console.log(typeof tripid);
		const [completedTrip] = await db.update_mark_trip_complete(tripid);
		res.status(200).send(completedTrip);
	},

	updateANote: async (req, res) => {
		console.log("at controller.js updateANote");
		const db = req.app.get("db");
		const { noteid } = req.params;

		console.log("req.params at controller update a note", req.params);

		let { title, note } = req.body;
		console.log("req.body at controller update a note ", req.body);

		console.log("about to make db call");
		const [updatedNote] = await db.update_note([title, note, noteid]);
		res.status(200).send(updatedNote);
	},

	updateAPicture: async (req, res) => {
		console.log("at controller.js updateAPicture");
		const db = req.app.get("db");
		const { pictureid } = req.params;

		console.log("req.params at controller update a picture", req.params);

		let { title, picture } = req.body;
		console.log("req.body at controller update a picture ", req.body);

		console.log("about to make db call");
		const [updatedPicture] = await db.update_picture([
			title,
			picture,
			pictureid,
		]);
		res.status(200).send(updatedPicture);
	},
};
