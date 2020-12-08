import React, { Component } from "react";
import axios from "axios";

class UpdatePicture extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			picture: "",
		};
	}
	async componentDidMount() {
		try {
			const pictureid = +this.props.match.params.pictureid;
			console.log("pictureid: ", pictureid);

			let picture = await axios.get(`/api/trips/pictures/${pictureid}`);

			console.log("picture coming back from call", picture);

			this.setState({
				pictureid: pictureid,
				title: picture.data.title,
				picture: picture.data.picture,
			});
		} catch (err) {
			console.log(err);
		}
	}
	updatePicture = async (e) => {
		console.log("updatepicture");
		console.log("this.state: ", this.state);
		e.preventDefault();
		const { pictureid, title, picture } = this.state;
		console.log("this.state at updatepicture", this.state);
		try {
			console.log("about to do axios call", pictureid);
			let updatedPicture = await axios.put(
				`/api/pictures/update/${+pictureid}`,
				{
					title,
					picture,
				}
			);
			this.props.history.push("/trips/upcoming");
		} catch (err) {
			alert(err);
		}
	};
	render() {
		return (
			<div className="updateBox">
				<p>
					<b>Update picture info:</b>
				</p>
				<img src={this.state.picture} alt={this.state.title} size="100px"></img>
				<input
					name="title"
					type="text"
					value={this.state.title}
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

				<button onClick={(e) => this.updatePicture(e)}>Update Picture</button>
			</div>
		);
	}
}

export default UpdatePicture;
