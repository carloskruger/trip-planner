import React, { Component } from "react";
// import UpdateTrip from "./UpdateTrip";
// import Picture from "./Note";
// import Note from "./Note";
import axios from "axios";

class Trip extends Component {
	constructor() {
		super();
		this.state = {
			trip: {},
			notes: [],
			pictures: [],
		};
	}

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
				trip: trip.data,
				notes: notes.data,
				pictures: pictures.data,
			});
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		{
			console.log("this.state.trip", this.state.trip);
		}

		return (
			<div>
				<div>
					<p>Destination: {this.state.trip.destination}</p>
					<p>Departure date: {this.state.trip.departure_date}</p>
					<p>Return date: {this.state.trip.return_date} </p>
				</div>
			</div>
		);
	}
}

export default Trip;
