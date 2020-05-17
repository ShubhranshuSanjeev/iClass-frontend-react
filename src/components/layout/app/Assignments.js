import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchAssignments } from '../../../actions/classroom';

class Assignment extends Component {
  componentDidMount() {
    const { classroomId } = this.props;
    this.props.fetchAssignments(classroomId);
  }

  renderAssignmentList() {
    const { assignments } = this.props;
    if (!assignments.length) return <></>;
    let i = 0;
    return assignments.map(assignment => {

      const currentDate = new Date();
      const year = currentDate.getFullYear(), month = currentDate.getMonth(), day = currentDate.getDate();
      const [a, b, c] = assignment.deadline.split('-').map(d => parseInt(d));

      const permission = a < year ? false : (a > year ? true : (b < month ? false : (b > month ? true : (c < day ? false : true))));

      return (
        <tr key={assignment.id} data-key={assignment.id} style={{
          fontSize: "14px",
          fontWeight: "100",
        }}>
          <th scope="row" style={{ verticalAlign: "middle" }}>{++i}</th>
          <td style={{ verticalAlign: "middle" }}>{assignment.description}</td>
          <td style={{ verticalAlign: "middle" }}>{assignment["max_marks"]}</td>
          <td style={{ verticalAlign: "middle", color: permission ? 'rgb(8, 189, 128)' : 'red' }}>{assignment.deadline}</td>
          <td style={{ verticalAlign: "middle" }}>
            <a href={`http://127.0.0.1:8000${assignment.file}`} download>
              <span className="material-icons" style={{ color: "#6c63ff", cursor: "pointer" }}>save_alt</span>
            </a>
          </td>
          <td style={{ verticalAlign: "middle" }}> {permission ? (<button className="btn btn-primary" style={{
            fontWeight: "700",
            fontSize: "13px"
          }}>Submit</button>) : (<span style={{ color: "red" }}>File not uploaded</span>)}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <table className="table table-striped text-center">
            <caption>List of Assignments</caption>
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
                <th scope="col">Submit/Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.renderAssignmentList()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { assignments: Object.values(state.assignments) };
};

export default connect(mapStateToProps, { fetchAssignments })(Assignment);
