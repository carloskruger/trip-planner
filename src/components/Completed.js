import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Completed extends Component {
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

	render() {
		return (
			<div>
				{this.state.trips
					.filter((trip) => trip.trip_completed === true)
					.map((completed, index) => (
						<Link to={`${completed.tripid}`} style={{ textDecoration: "none" }}>
							<div className="tripbox" key={index}>
								<div>
									<span>
										<b>Destination:</b>
									</span>
									{completed.destination}
								</div>
								<div>
									<span>
										<b>Departure: </b>
									</span>
									{completed.departure_date}
								</div>
								<div>
									<span>
										<b> Return:</b>
									</span>
									{completed.return_date}
								</div>
							</div>
						</Link>
					))}
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Completed);
