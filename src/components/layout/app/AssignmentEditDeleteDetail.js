import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAssignment, deleteAssignment, fetchAssignment } from '../../../actions/classroom';
import AssignmentForm from './AssignmentForm';
import SubmissionsList from './SubmissionsList';
import styles from './App.module.css';

class Assignment extends Component {
  componentDidMount(){
    const { fetchAssignment, match } = this.props;
    const { classroomId, id } = match.params;
    fetchAssignment(classroomId, id);
  }

  getInitialValues() {
    const { description, max_marks, deadline, file, publish_grades } = this.props.assignment;
    const res = { description, deadline, file, maxMarks: max_marks, publishGrades: publish_grades };
    return res;
  }

  handleDelete = () => {
    const { assignment, classroom, deleteAssignment } = this.props;
    deleteAssignment(classroom.id, assignment.id);
  }

  onSubmit = (formValues) => {
    const { updateAssignment, match } = this.props;
    updateAssignment(match.params.classroomId, match.params.id, formValues);
  }

  render() {
    const { classroom, assignment } = this.props;
    if (!classroom || !assignment) return <></>;
    return (
      <>
      <div className="card">
        <div className={`card-body ${styles.formText}`}>
          {this.props.assignment ? <AssignmentForm buttonText='Save' initialValue={this.getInitialValues()} onSubmit={this.onSubmit} /> : <></>}
          <button className={`btn btn-danger ${styles.myBtn} d-flex align-items-center`} onClick={this.handleDelete}>
            <span className="material-icons mr-1">delete</span>
            <span>Delete</span>
          </button>
        </div>
      </div>
      <hr />
      <h4>Submissions</h4>
      <SubmissionsList assignment={assignment} classroom={classroom} />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id, classroomId } = ownProps.match.params;
  return { assignment: state.assignments[id], classroom: state.classrooms[classroomId] }
}

export default connect(mapStateToProps, {
  updateAssignment,
  deleteAssignment,
  fetchAssignment
})(Assignment);
