import React, { Component } from "react";
import { connect } from 'react-redux';

import { fetchClassroomStudent, deleteClassroomStudent } from '../../../actions/classroom';

class Members extends Component {

  componentDidMount() {
    const { fetchClassroomStudent, classroomId } = this.props;
    fetchClassroomStudent(classroomId);
  }

  onClick = (id) => {
    const { deleteClassroomStudent, classroomId } = this.props;
    deleteClassroomStudent(classroomId, id);
  }

  getTableCaption() {
    const { members } = this.props;
    if (!members.length) return <caption>No Members.</caption>;
    return <caption>List of Members</caption>
  }

  getAction(member) {
    const { is_student, is_teacher } = this.props;
    if (is_teacher) return (
      <td style={{ verticalAlign: "middle", maxWidth: "120px" }} onClick={() => this.onClick(member.id)}>
        <button
          className="btn btn-danger"
          style={{
            fontWeight: "700",
            fontSize: "13px",
          }}
        >
          Remove
            </button>
      </td>
    );
    if (is_student) return <></>;
  }

  renderMembersList() {
    const { members } = this.props;
    if (!members.length) return <></>;
    let i = 0;
    return members.map(member => {
      return (
        <tr key={member.id} data-key={member.id} style={{
          fontSize: "14px",
          fontWeight: "100",
        }}>
          <th scope="row" style={{ verticalAlign: "middle" }}>{++i}</th>
          <td style={{ verticalAlign: "middle" }}>{member.student.first_name + ' ' + member.student.last_name}</td>
          {this.getAction(member)}
        </tr >
      );
    });
  }

  render() {
    const { is_teacher } = this.props;
    return (
      <div className="row">
        <div className="col-12">
          <table className="table table-striped">
            {this.getTableCaption()}
            <thead>
              <tr style={{
                fontSize: "14px",
                fontWeight: "100",
              }}>
                <th scope="col">#</th>
                <th scope="col">Student Name</th>
                {is_teacher ? (<th scope="col">Action</th>) : <></>}
              </tr>
            </thead>
            <tbody>
              {this.renderMembersList()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { members, auth } = state;
  return { members: Object.values(members), is_student: auth.user.is_student, is_teacher: auth.user.is_teacher };
};

export default connect(mapStateToProps, { fetchClassroomStudent, deleteClassroomStudent })(Members);
