import React, { Component } from "react";
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { fetchReferenceMaterials } from '../../../actions/classroom';

class ReferenceMaterials extends Component {

  componentDidMount(){
    this.props.activateMenuItem("referenceMaterials");
  }

  getAddButton() {
    const { is_student, is_teacher, match : { params : { id : classroomId } } } = this.props;
    if (is_student) return <></>;
    if (is_teacher)
      return (
        <div className="btn-group">
          <button type="button" className="btn btn-primary pr-0"><span className="material-icons">add</span></button>
          <Link to={`/classrooms/${classroomId}/referenceMaterials`} className="btn btn-primary pl-0">
            Add Reference Material
          </Link>
        </div>
      );
  }

  getActions(referenceMaterial) {
    const { is_student, is_teacher, match : { params : { id : classroomId } } } = this.props;

    if (is_teacher) {
      return <Link className='btn btn-primary' style={{
        fontWeight: "700",
        fontSize: "13px",
      }} to={`/classrooms/${classroomId}/referenceMaterials/${referenceMaterial.id}`}>Open</Link>;
    }
    if (is_student) return <></>;
  }

  getTableCaption() {
    const { referenceMaterials } = this.props;
    if (!referenceMaterials.length) return <caption>No Reference Materials.</caption>;
    return <caption>List of Reference Materials</caption>
  }

  renderAssignmentList() {
    const { referenceMaterials, is_teacher } = this.props;
    if (!referenceMaterials.length) return <></>;
    let i = 0;
    return referenceMaterials.map(referenceMaterial => {
      return (
        <tr key={referenceMaterial.id} data-key={referenceMaterial.id} style={{
          fontSize: "14px",
          fontWeight: "100",
        }}>
          <th scope="row" style={{ verticalAlign: "middle" }}>{++i}</th>
          <td style={{ verticalAlign: "middle" }}>{referenceMaterial.description}</td>
          <td style={{ verticalAlign: "middle" }}>
            <a href={`http://127.0.0.1:8000${referenceMaterial.file}`} download>
              <span className="material-icons" style={{ color: "#6c63ff", cursor: "pointer" }}>save_alt</span>
            </a>
          </td>
          {is_teacher ? (
            <td style={{ verticalAlign: "middle", maxWidth: "120px" }}>
              {this.getActions(referenceMaterial)}
            </td>) :
            <></>
          }
        </tr >
      );
    });
  }

  render() {
    const { is_teacher } = this.props;
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
                <th scope="col">Download</th>
                {is_teacher ? <th scope="col">Actions</th> : <></>}
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
  return { referenceMaterials: Object.values(state.referenceMaterials), is_student, is_teacher };
};

export default connect(mapStateToProps, { fetchReferenceMaterials })(withAlert()(ReferenceMaterials));
