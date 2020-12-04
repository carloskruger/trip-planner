import React, { Component } from "react";
// import UpdateTrip from "./UpdateTrip";
// import Picture from "./Note";
// import Note from "./Note";
import axios from "axios";

class Trip extends Component {
	constructor() {
		super();
		this.state = {
			id: null,
			trip: {},
			notes: [],
			pictures: [],
			pic_title: "",
			picture: "",
			note_title: "",
			note: "",
		};
		this.changeHandler = this.changeHandler.bind(this);
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	async componentDidMount() {
		try {
			console.log("this.props.match.params: ", this.props.match.params);
			const id = +this.props.match.params.tripid;
			let notes = [];
			let pictures = [];
			let trip = await axios.get(`/api/trips/trips/${id}`);
			notes = await axios.get(`/api/trips/${id}/notes`);
			pictures = await axios.get(`/api/trips/${id}/pictures`);
			console.log("trip: ", trip.data);
			console.log("notes: ", notes.data);
			console.log("pictures: ", pictures.data);
			this.setState({
				id: id,
				trip: trip.data,
				notes: notes.data,
				pictures: pictures.data,
			});
		} catch (err) {
			console.log(err);
		}
	}

	addPicture = async (e) => {
		e.preventDefault();

		const { pic_title, picture, id } = this.state;
		const title = pic_title;
		console.log(pic_title);
		try {
			const newPicture = await axios.post(
				`/api/trips/${this.state.id}/pictures`,
				{ title, picture, id }
			);
		} catch (err) {
			alert(err);
		}
	};

	addNote = async (e) => {
		e.preventDefault();

		const { note_title, note, id } = this.state;
		const title = note_title;
		console.log(note_title);
		try {
			const newNote = await axios.post(`/api/trips/${this.state.id}/notes`, {
				title,
				note,
				id,
			});
		} catch (err) {
			alert(err);
		}
	};
	render() {
		return (
			<div>
				<div>
					<p>Destination: {this.state.trip.destination}</p>
					<p>Departure date: {this.state.trip.departure_date}</p>
					<p>Return date: {this.state.trip.return_date} </p>
				</div>

				<div className="addPictureNote">
					<div className="formBox">
						<h4>Add picture</h4>
						<input
							name="pic_title"
							type="text"
							value={this.state.pic_title}
							placeholder="title"
							onChange={(e) => this.changeHandler(e)}
						/>
						<input
							name="picture"
							type="text"
							value={this.state.picture}
							placeholder="picture URL"
							onChange={(e) => this.changeHandler(e)}
						/>
						<button onClick={(e) => this.addPicture(e)}>Add Picture</button>
					</div>
					<div className="formBox">
						<h4>Add a Note</h4>
						<input
							name="note_title"
							type="text"
							value={this.state.note_title}
							placeholder="title"
							onChange={(e) => this.changeHandler(e)}
						/>
						<input
							name="note"
							type="text"
							value={this.state.note}
							placeholder="Enter your note"
							onChange={(e) => this.changeHandler(e)}
						/>
						<button onClick={(e) => this.addNote(e)}>Add Note</button>
					</div>
				</div>
				{this.state.pictures.map((picture, index) => (
					<div className="tripbox" key={index}>
						<div>
							<span>
								<b>{picture.title}</b>
							</span>
						</div>
						<div>
							<img
								src={picture.picture}
								alt={picture.title}
								width="30%"
								height="30%"
							/>
						</div>
					</div>
				))}
				{this.state.notes.map((note, index) => (
					<div className="tripbox" key={index}>
						<div>
							<span>
								<b>{note.title}</b>
							</span>
						</div>
						<div>
							<p>{note.note} </p>
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default Trip;
