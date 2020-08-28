import React, { Component } from "react";
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import { submitAssignment } from '../../../actions/classroom';

class AssignmentList extends Component {
  state = {
    clicked: false,
    id: 0,
    file: null,
  }

  componentDidMount(){
    this.props.activateMenuItem("assignments");
  }

  onChange = (event) => {
    if(this.props.is_student)
      this.setState({ ...this.state, file: event.target.files[0] });
  }

  onClick = (id) => {
    this.setState({ ...this.state, clicked: true, id: id });
  }

  onSubmit = (event, id) => {
    event.preventDefault();
    if (!this.state.file) this.props.alert.error('Choose a file');
    else {
      const { submitAssignment, match : { params : { id : classroomId }} } = this.props;
      submitAssignment(this.state.file, classroomId, id);
      this.setState({ clicked: false, id: 0, file: null });
    }
  }

  checkPermission(assignment) {
    const currentDate = new Date();
    const year = currentDate.getFullYear(), month = currentDate.getMonth(), day = currentDate.getDate();
    const [a, b, c] = assignment.deadline.split('-').map(d => parseInt(d));

    const permission = a < year ? false : (a > year ? true : (b < month ? false : (b > month ? true : (c < day ? false : true))));

    return permission;
  }

  getAddButton() {
    const { is_student, is_teacher, match:{ url } } = this.props;
    if (is_student) return <></>;
    if (is_teacher)
      return (
        <div className="btn-group">
          <button type="button" className="btn btn-primary pr-0"><span className="material-icons">add</span></button>
          <Link to={`${url}/create`} className="btn btn-primary pl-0">
            Add Assignment
          </Link>
        </div>
      );
  }

  getActions(assignment) {
    const { is_student, is_teacher, match:{ url } } = this.props;
    const { clicked, id } = this.state;

    if (is_student) {
      return (
        this.checkPermission(assignment) ?
          (
            clicked && id === assignment.id ?
              (
                <form
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                  onSubmit={(e) => this.onSubmit(e, assignment.id)} >
                  <input type="file" name="file" style={{ maxWidth: "100%" }} onChange={this.onChange} />
                  <button type="submit" className="btn btn-primary mt-2" style={{ fontSize: "13px", fontWeight: "700" }}>Submit</button>
                </form>
              )
              : (<button
                className="btn btn-primary"
                style={{
                  fontWeight: "700",
                  fontSize: "13px",
                }}
              >
                Submit
              </button>)
          ) :
          (<span style={{ color: "red" }}>File not uploaded</span>)
      );
    }
    if (is_teacher) {
      return <Link className='btn btn-primary' style={{
        fontWeight: "700",
        fontSize: "13px",
      }} to={`${url}/${assignment.id}`}>Open</Link>;
    }
  }

  getTableCaption() {
    const { assignments } = this.props;
    if (!assignments.length) return <caption>No Assignments.</caption>;
    return <caption>List of Assignments</caption>
  }

  renderAssignmentList() {
    const { assignments } = this.props;
    if (!assignments.length) return <></>;
    let i = 0;
    return assignments.map(assignment => {
      return (
        <tr key={assignment.id} data-key={assignment.id} style={{
          fontSize: "14px",
          fontWeight: "100",
        }}>
          <th scope="row" style={{ verticalAlign: "middle" }}>{++i}</th>
          <td style={{ verticalAlign: "middle" }}>{assignment.description}</td>
          <td style={{ verticalAlign: "middle" }}>{assignment["max_marks"]}</td>
          <td style={{ verticalAlign: "middle", color: this.checkPermission(assignment) ? 'rgb(8, 189, 128)' : 'red' }}>{assignment.deadline}</td>
          <td style={{ verticalAlign: "middle" }}>
            <a href={`http://127.0.0.1:8000${assignment.file}`} download>
              <span className="material-icons" style={{ color: "#6c63ff", cursor: "pointer" }}>save_alt</span>
            </a>
          </td>
          <td style={{ verticalAlign: "middle", maxWidth: "120px" }} onClick={() => this.onClick(assignment.id)}>
            {this.getActions(assignment)}
          </td>
        </tr >
      );
    });
  }

  render() {
    // const { clicked, id } = this.state;
    // const { is_teacher } = this.props;
    return (
      <div className="row">
        <div className="col-12">
          <table className="table table-striped text-center">
            {this.getTableCaption()}
            <thead>
              <tr style={{
                fontSize: "14px",
                fontWeight: "100",
              }}>
                <th scope="col">#</th>
                <th scope="col">Description</th>
                <th scope="col">Max Marks</th>
                <th scope="col">Deadline</th>
                <th scope="col">Questions</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.renderAssignmentList()}
            </tbody>
          </table>
        </div>
        <div className="col-12 d-flex justify-content-center">
          {this.getAddButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { is_student, is_teacher } = state.auth.user;
  return { assignments: Object.values(state.assignments), is_student, is_teacher };
};

export default connect(mapStateToProps, { submitAssignment })(withAlert()(AssignmentList));
