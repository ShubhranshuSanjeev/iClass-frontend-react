import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchClassrooms } from "../../actions/classroom";
import notebook from "../../assests/working.svg";

class Dropdown extends Component {
	state = {
		showMenu: false,
	};

	componentDidMount() {
		this.props.fetchClassrooms();
	}

	showMenu = event => {
		event.preventDefault();

		this.setState({ showMenu: true }, () => {
			document.addEventListener("click", this.closeMenu);
		});
	};

	closeMenu = event => {
		if (!this.dropdownMenu.contains(event.target)) {
			this.setState({ showMenu: false }, () => {
				document.removeEventListener("click", this.closeMenu);
			});
		}
	};

	renderClassroomList() {
		const { classrooms } = this.props;
		if (!classrooms.length) return <></>;
		return classrooms.map(classroom => {
			return (
				<div className="col-sm-3 mt-4" key={classroom.id}>
					<Link to={`/classrooms/${classroom.id}`}>
						<div className="card">
							<div
								className="card-img-top"
								style={{
									height: "120px",
									backgroundColor: "#cfccff",
									overflow: "hidden",
									position: "relative",
								}}
							>
								<img
									src={notebook}
									alt="notebook"
									width="100%"
									style={{
										position: "relative",
										top: "-30px",
									}}
								/>
							</div>
							<div
								className="card-body"
								style={{ backgroundColor: "#fff" }}
							>
								<h5
									className="card-title"
									style={{ color: "#000" }}
								>
									{classroom.course_name}
								</h5>
								<h6 className="card-subtitle mb-2 text-muted">{`Teacher: ${classroom.teacher.first_name} ${classroom.teacher.last_name}`}</h6>
							</div>
						</div>
					</Link>
				</div>
			);
		});
	}

	render() {
		return (
			<>
				<Link className="nav-link px-3" onClick={this.showMenu} to="/">
					{this.props.title}
				</Link>
				{this.state.showMenu ? (
					<div
						className="menu"
						ref={element => {
							this.dropdownMenu = element;
						}}
						style={{
							background: "white",
							padding: "20px",
							margin: "0",
							position: "absolute",
							left: "0",
							top: "100%",
							boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.12)",
						}}
					>
						<div className="row">
							<div className="col-sm-12">
								<h1
									style={{
										color: "#000",
										fontWeight: "300",
										fontSize: "30px",
										textTransform: "capitalize",
									}}
								>
									Classrooms
								</h1>
							</div>
						</div>
						<div className="row">{this.renderClassroomList()}</div>
					</div>
				) : null}
			</>
		);
	}
}

const mapStateToProps = state => {
	return { classrooms: Object.values(state.classrooms) };
};

export default connect(mapStateToProps, { fetchClassrooms })(Dropdown);
