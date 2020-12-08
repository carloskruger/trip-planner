import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Nav extends Component {
	render() {
		return (
			<div className="NavBar">
				<ul>
					<li>
						<Link
							to="/trips/search"
							style={
								this.props.location.pathname === "/trips/search"
									? { textDecoration: "underline" }
									: { textDecoration: "none" }
							}
						>
							Trips Planning
						</Link>
					</li>
					<li>
						<Link
							to="/trips/upcoming"
							style={
								this.props.location.pathname === "/trips/upcoming"
									? { textDecoration: "underline" }
									: { textDecoration: "none" }
							}
						>
							Upcoming Trips
						</Link>
					</li>
					<li>
						<Link
							to="/trips/completed"
							style={
								this.props.location.pathname === "/trips/completed"
									? { textDecoration: "underline" }
									: { textDecoration: "none" }
							}
						>
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

const mapStateToProps = (state) => state;

export default withRouter(connect(mapStateToProps)(Nav));
