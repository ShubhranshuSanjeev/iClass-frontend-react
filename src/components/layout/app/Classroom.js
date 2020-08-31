import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchClassroom,
  fetchAssignments,
  fetchClassroomStudent,
  fetchJoinRequests,
  fetchReferenceMaterials
} from "../../../actions/classroom";
import { fetchQuizzes } from "../../../actions/quiz";

import AssignmentEditDeleteDetail from "./AssignmentEditDeleteDetail";
import AssignmentsList from "./AssignmentsList";
import ReferenceMaterialsList from "./ReferenceMaterialsList";
import ReferenceMaterialsEditDeleteDetail from "./ReferenceMaterialsEditDeleteDetail";
import QuizList from "./QuizList";
import JoinRequestsList from "./JoinRequestsList";
import MembersList from "./MembersList";
import ClassroomDetail from "./ClassroomEditDeleteDetail";
import QuizEditDeleteDetail from './QuizEditDeleteDetail';

import styles from "./App.module.css";
import notebook from "../../../assests/working.svg";
import CustomRoute from "../../common/CustomRoute";
import { Link, Redirect } from "react-router-dom";

class Classroom extends Component {
	state = {
		assignments: false,
		referenceMaterials: false,
    quiz: false,
		members: false,
    messages: false,
    mounted: false,
  };

	componentDidUpdate() {
    const {
      state:{
        assignments, referenceMaterials,
        quiz, members,
        joinRequests = false,
        settings = false,
      },
      props:{
        fetchAssignments, fetchClassroomStudent,
        fetchJoinRequests, fetchReferenceMaterials,
        fetchQuizzes,
        match:{ params:{ classroomId } }
      }
    } = this;
    if (assignments) fetchAssignments(classroomId);
    else if(referenceMaterials) fetchReferenceMaterials(classroomId);
    else if(quiz) fetchQuizzes(classroomId);
    else if(members) fetchClassroomStudent(classroomId);
    else if(joinRequests) fetchJoinRequests(classroomId);
    else if (settings) fetchClassroom(classroomId);
	}

	componentDidMount() {
		const {classroomId} = this.props.match.params;
		this.props.fetchClassroom(classroomId);
		if (this.props.is_teacher)
			this.setState({
				...this.state,
				joinRequests: false,
        settings: false,
      });
    else
      this.setState({
        ...this.state,
      });
	}

	onClick = (contentType) => {
    if(this.state[contentType]) return;
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
    this.setState({ ...newState, [contentType] : true });
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
    const path = this.props.match.url;
		return menuItems.map(item => {
			const active = this.state[item.name] ? styles.active : "";
			return (
        <Link to={`${path}${item.name !== 'settings' ? '/'+item.name : ''}`} style={{ textDecoration:"none" }}>
          <div
            className={`${styles.menuItem} ${active} d-flex align-items-center pl-2 py-2 `}
            onClick={this.onClick}
            data-option={item.name}
            key={item.name}
          >
            <span className="material-icons">{item.icon}</span>
              <p className="my-0 ml-3">{item.label}</p>
          </div>
        </Link>
			);
		});
	}

	render() {
    const {
      props:{
        classroom, is_teacher,
        match: { path, url }
      },
      onClick
    } = this;

    if (!classroom) return <></>;
		return (
      <div className="container-fluid pt-5" style={{ minHeight: "100vh", position: "relative", zIndex:"0" }}>
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
                  {console.log(path)}
                  <CustomRoute path={`${path}/assignments`} exact component={props => <AssignmentsList activateMenuItem={onClick} {...props}/>} privateRoute />
                  <CustomRoute path={`${path}/referenceMaterials`} exact component={props => <ReferenceMaterialsList activateMenuItem={onClick} {...props} />} privateRoute />
                  <CustomRoute path={`${path}/quiz`} exact component={props => <QuizList activateMenuItem={onClick} {...props} />} privateRoute />
                  {is_teacher ? <CustomRoute path={`${path}/joinRequests`} exact component={props => <JoinRequestsList activateMenuItem={onClick} {...props} />} privateRoute teacherRoute /> : <></>}
                  {is_teacher ? <CustomRoute path={`${path}/members`} exact component={props => <MembersList activateMenuItem={onClick} {...props} />} privateRoute teacherRoute /> : <></>}
                  {is_teacher ? <CustomRoute path={`${path}`} exact component={props => <ClassroomDetail activateMenuItem={onClick} {...props} classroom={classroom} />} privateRoute teacherRoute /> : <Redirect to={`${url}/assignments`} />}
                  {is_teacher ? <CustomRoute path={`${path}/assignments/:id`} exact component={props => <AssignmentEditDeleteDetail {...props} />} privateRoute teacherRoute/> : <></>}
                  {is_teacher ? <CustomRoute path={`${path}/referenceMaterials/:id`} exact component={props => <ReferenceMaterialsEditDeleteDetail {...props} />} privateRoute teacherRoute /> : <></>}
                  {is_teacher ? <CustomRoute path={`${path}/quiz/:id`} exact component={props => <QuizEditDeleteDetail {...props} />} privateRoute teacherRoute /> : <></>}
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
	const classroomId = ownProps.match.params.classroomId;
	const { is_student, is_teacher } = state.auth.user;
	return { classroom: state.classrooms[classroomId], is_student, is_teacher };
};

export default connect(mapStateToProps, {
  fetchClassroom,
  fetchAssignments,
  fetchClassroomStudent,
  fetchJoinRequests,
  fetchReferenceMaterials,
  fetchQuizzes,
})(Classroom);
