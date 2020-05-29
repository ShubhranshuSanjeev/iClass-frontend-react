import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReferenceMaterial, updateReferenceMaterial, fetchClassroom, deleteReferenceMaterial } from '../../../actions/classroom';
import ReferenceMaterialsForm from './ReferenceMaterialsFrom';
import styles from './App.module.css';

class ReferenceMaterial extends Component {
  getInitialValues() {
    const { description, file } = this.props.referenceMaterial;
    const res = { description, file };
    return res;
  }

  componentDidMount() {
    const { fetchReferenceMaterial, fetchClassroom, match } = this.props;
    const { classroomId, id } = match.params;
    fetchClassroom(classroomId);
    fetchReferenceMaterial(classroomId, id);
  }

  handleDelete = () => {
    const { referenceMaterial, classroom, deleteReferenceMaterial } = this.props;
    deleteReferenceMaterial(classroom.id, referenceMaterial.id);
  }

  onSubmit = (formValues) => {
    const { updateReferenceMaterial, match } = this.props;
    updateReferenceMaterial(match.params.classroomId, match.params.id, formValues);
  }

  render() {
    const { classroom, referenceMaterial } = this.props;
    if (!classroom || !referenceMaterial) return <></>;
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="card shadow col-6 px-4 pt-5" style={{ border: "none" }}>
          <h5 className={`card-title ml-4 ${styles.cardTitle}`}>
            Add Reference Material
        </h5>
          <div className={`card-body px-2 mt-1 ${styles.formText}`}>
            {this.props.referenceMaterial ? <ReferenceMaterialsForm buttonText='Save' initialValue={this.getInitialValues()} onSubmit={this.onSubmit} /> : <></>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id, classroomId } = ownProps.match.params;
  return { referenceMaterial: state.referenceMaterials[id], classroom: state.classrooms[classroomId] }
}

export default connect(mapStateToProps, { fetchReferenceMaterial, updateReferenceMaterial, fetchClassroom, deleteReferenceMaterial })(ReferenceMaterial);
