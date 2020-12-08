import React, { Component } from "react";
import axios from "axios";

class UpdateTrip extends Component {
	constructor() {
		super();
		this.state = {
			destination: "",
			departure_date: "",
			return_date: "",
			tripid: "",
		};
	}

	async componentDidMount() {
		const { tripid } = this.props.match.params;
		let trip = await axios.get(`/api/trips/trips/${+tripid}`);
		console.log("trip.data: ", trip.data);
		this.setState({
			destination: trip.data.destination,
			departure_date: trip.data.departure_date,
			return_date: trip.data.return_date,
			tripid: this.props.match.params.tripid,
		});
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	updateTrip = async (e) => {
		console.log("updateTrip");
		console.log("this.state: ", this.state);
		e.preventDefault();
		const { destination, departure_date, return_date, tripid } = this.state;
		console.log("this.state at updateTrip", this.state);
		try {
			console.log("about to do axios call", tripid);
			let trip = await axios.put(`/api/trips/update/${+tripid}`, {
				destination,
				departure_date,
				return_date,
			});
			this.props.history.push("/trips/upcoming");
		} catch (err) {
			alert(err);
		}
	};

	render() {
		{
			const { destination, departure_date, return_date } = this.state;
		}
		return (
			<div className="formBox">
				<p>
					<b>Update trip info:</b>
				</p>
				<input
					name="destination"
					type="text"
					value={this.state.destination}
					placeholder="destination"
					onChange={(e) => this.changeHandler(e)}
				/>

				<input
					name="departure_date"
					type="date"
					value={this.state.departure_date}
					placeholder="departure_date"
					onChange={(e) => this.changeHandler(e)}
				/>
				<input
					name="return_date"
					type="date"
					value={this.state.return_date}
					placeholder="return_date"
					onChange={(e) => this.changeHandler(e)}
				/>
				<button onClick={(e) => this.updateTrip(e)}>Update Trip</button>
			</div>
		);
	}
}

export default UpdateTrip;
