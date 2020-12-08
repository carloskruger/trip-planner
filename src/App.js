import "./App.css";
import routes from "./routes";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./components/Nav";
import React, { Component } from "react";

class App extends Component {
	render() {
		return (
			<div className="App">
				{this.props.location.pathname !== "/" &&
					this.props.location.pathname !== "/register" && <Nav />}
				{routes}
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default withRouter(connect(mapStateToProps)(App));
