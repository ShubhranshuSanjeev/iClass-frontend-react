import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchClassroom } from "../../../actions/classroom";
import { fetchAssignments } from "../../../actions/classroom";

import Assignments from "./AssignmentsList";
import ReferenceMaterials from "./ReferenceMaterialsList";
import Quiz from "./QuizList";
import Members from "./MembersList";
import JoinRequests from "./JoinRequestsList";
import ClassroomDetail from "./ClassroomEditDeleteDetail";
import styles from "./App.module.css";
import notebook from "../../../assests/working.svg";

class Classroom extends Component {
	state = {
		assignments: true,
		referenceMaterials: false,
    quiz: false,
		members: false,
    messages: false,
	};

	componentDidUpdate() {
		const classroomId = this.props.match.params.id;
		if (this.state.assignments) {
			this.props.fetchAssignments(classroomId);
		}
	}

	componentDidMount() {
		const classroomId = this.props.match.params.id;
		this.props.fetchClassroom(classroomId);
		if (this.props.is_teacher)
			this.setState({
				...this.state,
				joinRequests: false,
				settings: false,
			});
	}

	onClick = event => {
		const contentType = event.target.closest("div").attributes["data-option"].nodeValue;
		const newState = {
			assignments: false,
      referenceMaterials: false,
      quiz: false,
			members: false,
			messages: false,
		};
		if (this.props.is_teacher) {
			newState["joinRequests"] = false;
			newState["settings"] = false;
		}
		if (contentType === "assignments") this.setState({ ...newState, assignments: true });
		else if (contentType === "referenceMaterials") this.setState({ ...newState, referenceMaterials: true });
    else if (contentType === "members") this.setState({ ...newState, members: true });
    else if (contentType === "quiz") this.setState({...newState, quiz : true});
		else if (contentType === "messages") this.setState({ ...newState, messages: true });
		else if (contentType === "joinRequests") this.setState({ ...newState, joinRequests: true });
		else if (contentType === "settings") this.setState({ ...newState, settings: true });
	};

	getMenuItems() {
		const { is_student, is_teacher } = this.props;
		let menuItems = [
			{ name: "assignments", icon: "assignment", label: "Assignments" },
      { name: "referenceMaterials", icon: "notes", label: "Reference Materials" },
      { name: "quiz", icon: "assignment", label: "Quiz" },
			{ name: "messages", icon: "message", label: "Messages" },
			{ name: "members", icon: "people", label: "Members" },
		];
		if (is_student) return menuItems;
		if (is_teacher) {
			menuItems.push(
				{ name: "joinRequests", icon: "list", label: "Join Requests" },
				{ name: "settings", icon: "settings", label: "Settings" }
			);
		}
		return menuItems;
	}

	renderMenuItems() {
		const menuItems = this.getMenuItems();
		return menuItems.map(item => {
			const active = this.state[item.name] ? styles.active : "";
			return (
				<div
					className={`${styles.menuItem} ${active} d-flex align-items-center pl-2 py-2 `}
					onClick={this.onClick}
					data-option={item.name}
					key={item.name}
				>
					<span className="material-icons">{item.icon}</span>
					<p className="my-0 ml-3">{item.label}</p>
				</div>
			);
		});
	}

	render() {
		const { classroom } = this.props;
		const classroomId = this.props.match.params.id;

		if (!classroom) return <></>;
		return (
			<div className="container-fluid pt-5" style={{ minHeight: "100vh" }}>
				<div className="row">
					<div className="col-12">
						<div className="row px-2 justify-content-around">
							<div className={`${styles.classroomWrapper} d-flex justify-content-around`}>
								<div className={`${styles.sidemenu}`}>
									<div className={`${styles.classroomIcon}`}>
										<img src={notebook} alt="icon" width="70%" />
									</div>
									<div className={`${styles.menu} pt-3`}>
										{this.renderMenuItems()}
									</div>
								</div>
								<div className={`${styles.classroomContent} p-4`}>
									<div className="content-header">
										<h1 className={`${styles.courseName}`}>
											{classroom.course_name}
										</h1>
										<p className={`${styles.courseName}`} style={{ fontSize: "12px" }}>
											Room Number: {classroom.room_number}
										</p>
										<hr />
									</div>
                  {
                    /*
                     * Conditional Rendering of Assignments, Reference Material, Members
                     * based on the option selected from menu.
                     */
                  }
									{this.state.assignments ? <Assignments classroomId={classroomId} /> : <></>}
									{this.state.referenceMaterials ? <ReferenceMaterials classroomId={classroomId} /> : <></>}
									{this.state.quiz ? <Quiz classroomId={classroomId} /> : <></>}
                  {this.state.members ? <Members classroomId={classroomId} /> : <></>}
									{this.state.joinRequests ? <JoinRequests classroomId={classroomId} /> : <></>}
									{this.state.settings ? <ClassroomDetail classroom={classroom}/> : <></>}

								</div>
							</div>
							<div
								className="upcoming-events"
								style={{
									width: "360px",
									height: "100vh",
									backgroundColor: "#fff",
								}}
							></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const classroomId = ownProps.match.params.id;
	const { is_student, is_teacher } = state.auth.user;
	return { classroom: state.classrooms[classroomId], is_student, is_teacher };
};

export default connect(mapStateToProps, { fetchClassroom, fetchAssignments })(Classroom);
