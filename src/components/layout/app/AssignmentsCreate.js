import React from 'react';
import { connect } from 'react-redux';
import { createAssignment } from '../../../actions/classroom';

import AssignmentForm from './AssignmentForm';
import styles from './App.module.css';

class AssignmentCreate extends React.Component {
  getInitialValues() {
    const res = { description: '', maxMarks: 100, deadline: undefined, file: undefined, publishGrades: false };
    return res;
  }

  onSubmit = (formValues) => {
    const { createAssignment, match } = this.props;
    createAssignment(match.params.classroomId, formValues);
  }

  render() {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="card shadow col-6 px-4 pt-5" style={{ border: "none" }}>
          <h5 className={`card-title ml-4 ${styles.cardTitle}`}>
            Create Assignment
        </h5>
          <div className={`card-body px-2 mt-1 ${styles.formText}`}>
            <AssignmentForm buttonText='Submit' initialValue={this.getInitialValues()} onSubmit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
};

export default connect(null, { createAssignment })(AssignmentCreate);
