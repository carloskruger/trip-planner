import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class Planning extends Component {
	constructor() {
		super();
		this.state = {
			destination: "",
			departure_date: "",
			return_date: "",
			trip_completed: false,
			travelerid: null,
		};
		this.changeHandler = this.changeHandler.bind(this);
	}

	componentDidMount() {
		const id = +this.props.user.userId;

		this.setState({ travelerid: id });
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	saveTrip = async (e) => {
		e.preventDefault();
		const {
			destination,
			departure_date,
			return_date,
			trip_completed,
			travelerid,
		} = this.state;
		console.log("this.state", this.state);
		try {
			const trip = await axios.post("/api/trips", {
				destination,
				departure_date,
				return_date,
				trip_completed,
				travelerid,
			});
			console.log("trip was added", trip);

			this.props.history.push("/trips/upcoming");
		} catch (err) {
			alert(err);
		}
	};

	render() {
		const { destination, departure_date, return_date, travelerid } = this.state;
		return (
			<div className="formBox">
				<p>
					<b>Enter trip info:</b>
				</p>
				<input
					name="destination"
					type="text"
					value={destination}
					placeholder="destination"
					onChange={(e) => this.changeHandler(e)}
				/>

				<input
					name="departure_date"
					type="date"
					value={departure_date}
					placeholder="departure_date"
					onChange={(e) => this.changeHandler(e)}
				/>
				<input
					name="return_date"
					type="date"
					value={return_date}
					placeholder="password"
					onChange={(e) => this.changeHandler(e)}
				/>
				<button onClick={(e) => this.saveTrip(e)}>Save Trip</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Planning);
