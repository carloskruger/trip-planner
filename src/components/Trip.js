import React, { Component } from "react";
// import UpdateTrip from "./UpdateTrip";
// import Picture from "./Note";
// import Note from "./Note";
import axios from "axios";
import { Link } from "react-router-dom";

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
			const id = +this.props.match.params.tripid;
			let notes = [];
			let pictures = [];
			let trip = await axios.get(`/api/trips/trips/${id}`);
			notes = await axios.get(`/api/trips/${id}/notes`);

			pictures = await axios.get(`/api/trips/${id}/pictures`);

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

		try {
			const newPicture = await axios.post(
				`/api/trips/${this.state.id}/pictures`,
				{ title, picture, id }
			);
			this.setState(
				{
					pictures: [...this.state.pictures, newPicture.data],
					pic_title: "",
					picture: "",
				},
				() => console.log(this.state)
			);
		} catch (err) {
			alert(err);
		}
	};

	deletePicture(id, e) {
		e.preventDefault();
		e.stopPropagation();
		console.log("deleteid: ", id);
		console.log("this.state.id: ", this.state.id);
		axios.delete(`/api/trips/pictures/${+this.state.id}/${+id}`).then((res) => {
			const pictures = res.data;
			this.setState({
				pictures: pictures,
			});
		});
	}

	addNote = async (e) => {
		e.preventDefault();

		const { note_title, note, id } = this.state;
		const title = note_title;

		try {
			const newNote = await axios.post(`/api/trips/${this.state.id}/notes`, {
				title,
				note,
				id,
			});
			this.setState(
				{
					notes: [...this.state.notes, newNote.data],
					note_title: "",
					note: "",
				},
				() => console.log(this.state)
			);
		} catch (err) {
			alert(err);
		}
	};

	deleteNote(id, e) {
		e.preventDefault();
		e.stopPropagation();

		axios.delete(`/api/trips/notes/${+this.state.id}/${+id}`).then((res) => {
			const notes = res.data;
			this.setState({
				notes: notes,
			});
		});
	}

	render() {
		return (
			<div>
				<div>
					<p>
						<b>Destination:</b> {this.state.trip.destination}
					</p>
					<p>
						<b>Departure date:</b> {this.state.trip.departure_date}
					</p>
					<p>
						<b>Return date:</b> {this.state.trip.return_date}{" "}
					</p>
					<Link to={`/trip/update/${this.state.id}`}>
						<button>Update</button>
					</Link>
				</div>

				<div className="addPictureNote">
					<div className="newstuffbox">
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
					<div className="newstuffbox">
						<h4>Add Note</h4>
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
				<div className="pictureContainer">
					{this.state.pictures.map((picture, index) => (
						<div className="picturebox" key={index}>
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
							<Link to={`/picture/update/${picture.pictureid}`}>
								<button>Update picture</button>
							</Link>
							<button onClick={(e) => this.deletePicture(picture.pictureid, e)}>
								Delete
							</button>
						</div>
					))}
				</div>
				<div className="noteContainer">
					{this.state.notes.map((note, index) => (
						<div className="notebox" key={index}>
							<div>
								<span>
									<b>{note.title}</b>
								</span>
							</div>
							<div>
								<p>{note.note} </p>
							</div>
							<Link to={`/note/update/${note.noteid}`}>
								<button>Update note</button>
							</Link>
							<button onClick={(e) => this.deleteNote(note.noteid, e)}>
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Trip;
