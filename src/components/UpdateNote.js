import React, { Component } from "react";
import axios from "axios";

class UpdateNote extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			note: "",
		};
	}
	async componentDidMount() {}

	render() {
		return <div>Hi my name is update note</div>;
	}
}

export default UpdateNote;
