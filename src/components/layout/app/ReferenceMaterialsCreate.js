import React from 'react';
import { connect } from 'react-redux';
import { createReferenceMaterial } from '../../../actions/classroom';

import ReferenceMaterialsFrom from './ReferenceMaterialsFrom';
import styles from './App.module.css';

class ReferenceMaterialsCreate extends React.Component {
  getInitialValues() {
    const res = { description: '', file: undefined };
    return res;
  }

  onSubmit = (formValues) => {
    const { createReferenceMaterial, match } = this.props;
    createReferenceMaterial(match.params.classroomId, formValues);
  }

  render() {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="card shadow col-6 px-4 pt-5" style={{ border: "none" }}>
          <h5 className={`card-title ml-4 ${styles.cardTitle}`}>
            Add Reference Material
        </h5>
          <div className={`card-body px-2 mt-1 ${styles.formText}`}>
            <ReferenceMaterialsFrom buttonText='Submit' initialValue={this.getInitialValues()} onSubmit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
};

export default connect(null, { createReferenceMaterial })(ReferenceMaterialsCreate);
