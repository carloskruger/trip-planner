import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Upcoming extends Component {
	constructor() {
		super();
		this.state = {
			traverlerid: null,
			trips: [],
		};
	}

	async componentDidMount() {
		try {
			const id = +this.props.user.userId;

			let trips = [];
			trips = await axios.get(`/api/trips/user/${id}`);

			this.setState({ trips: trips.data });
		} catch (err) {
			console.log(err);
		}
	}

	markComplete(id, e) {
		e.preventDefault();
		e.stopPropagation();

		axios.put(`/api/trips/complete/${+id}`).then((res) => {
			const trip = res.data;
			this.props.history.push("/trips/completed");
		});
	}

	render() {
		return (
			<div>
				{this.state.trips
					.filter((trip) => trip.trip_completed === false)
					.map((upcoming, index) => (
						<Link to={`${upcoming.tripid}`} style={{ textDecoration: "none" }}>
							<div className="tripbox" key={index}>
								<div>
									<span>
										<b>Destination:</b>
									</span>
									{upcoming.destination}
								</div>
								<div>
									<span>
										<b>Departure: </b>
									</span>
									{upcoming.departure_date}
								</div>
								<div>
									<span>
										<b> Return:</b>
									</span>
									{upcoming.return_date}
								</div>
								<button onClick={(e) => this.markComplete(upcoming.tripid, e)}>
									Mark as completed
								</button>
							</div>
						</Link>
					))}
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Upcoming);
