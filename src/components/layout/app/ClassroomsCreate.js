import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createClassroom } from '../../../actions/classroom';
import { withAlert } from 'react-alert';

import ClassroomForm from './ClassroomForm';
import styles from './App.module.css';

class ClassroomCreate extends Component {
  getInitialValues() {
    return { courseName: '', roomNumber: '', joiningPermission: true, }
  }

  onSubmit = (formValues) => {
    const { createClassroom } = this.props;
    createClassroom(formValues);
  }

  render() {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="card shadow col-6 px-4 pt-5" style={{ border: "none" }}>
          <h5 className={`card-title ml-4 ${styles.cardTitle}`}>
            New Classroom
          </h5>
          <div className={`card-body px-2 mt-1 ${styles.formText}`}>
            <ClassroomForm buttonText='Submit' initialValue={this.getInitialValues()} onSubmit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createClassroom, })(withAlert()(ClassroomCreate));
