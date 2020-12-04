import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
	render() {
		return (
			<div className="NavBar">
				<ul>
					<li>
						<Link to="/trips/search" style={{ textDecoration: "none" }}>
							Trips Planning
						</Link>
					</li>
					<li>
						<Link to="/trips/upcoming" style={{ textDecoration: "none" }}>
							Upcoming Trips
						</Link>
					</li>
					<li>
						<Link to="/trips/completed" style={{ textDecoration: "none" }}>
							Completed Trips
						</Link>
					</li>
					<li>
						<Link to="/" style={{ textDecoration: "none" }}>
							logout
						</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default Nav;
