import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAssignment, updateAssignment, fetchClassroom, deleteAssignment } from '../../../actions/classroom';
import AssignmentForm from './AssignmentForm';
import SubmissionsList from './SubmissionsList';
import styles from './App.module.css';

class Assignment extends Component {
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
      // <div className="container-fluid pt-5" style={{ minHeight: "100vh" }}>
      //   <div className="row">
      //     <div className="col-12">
      //       <div className="row px-2 justify-content-around">
      //         <div className={`${styles.classroomWrapper} d-flex justify-content-around`}>
      //           <div className={`${styles.classroomContent} p-4`}>
      //             <div className="content-header w-100 d-flex justify-content-between align-items-center">
      //               <h1 className={`${styles.courseName}`}>{`${classroom.course_name} > ${assignment.description}`}</h1>

      //             </div>
                  // <hr style={{ marginTop: "8px" }} />
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
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id, classroomId } = ownProps.match.params;
  return { assignment: state.assignments[id], classroom: state.classrooms[classroomId] }
}

export default connect(mapStateToProps, { fetchAssignment, updateAssignment, fetchClassroom, deleteAssignment })(Assignment);
