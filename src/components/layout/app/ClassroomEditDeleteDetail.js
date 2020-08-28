import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateClassroom, deleteClassroom } from '../../../actions/classroom';
import ClassroomForm from './ClassroomForm';

import styles from './App.module.css';
class Classroom extends Component {
  componentDidMount(){
    console.log("updating menu item");
    this.props.activateMenuItem("settings");
  }
  getInitialValues() {
    const { room_number, course_name, joining_permission } = this.props.classroom;
    return { roomNumber: room_number, courseName: course_name, joiningPermission: joining_permission };
  }

  handleDelete = () => {
    const { deleteClassroom, classroom } = this.props;
    deleteClassroom(classroom.id);
  }

  getDeleteButton() {
    return (
      <button className={`btn btn-danger ${styles.myBtn} d-flex align-items-center`} onClick={this.handleDelete}>
        <span className="material-icons mr-1">delete</span>
        <span>Delete</span>
      </button>
    );
  }

  onSubmit = (formValues) => {
    const { updateClassroom, classroom } = this.props;
    updateClassroom(classroom.id, formValues);
  }

  copyText = () => {
    const target = document.getElementById("classroomId-copy");
    target.select();
    target.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }

  render() {
    return (
      <div className="card">
        <div className={`card-body ${styles.formText}`}>
          <form className="px-3 w-100">
            <div className="form-group">
              <label htmlFor="classroomId">Classroom ID</label>
              <div class="input-group mb-3">
                <input
                  name="classroomId"
                  type="text"
                  className="form-control"
                  id="classroomId-copy"
                  value={this.props.classroom.id}
                  readOnly
                />
                <div className="input-group-append" onClick={this.copyText}>
                  <div className="input-group-text" style={{ backgroundColor: "#fcfcfc", cursor: "pointer" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" width="18" height="18"><path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <ClassroomForm buttonText='Save' initialValue={this.getInitialValues()} onSubmit={this.onSubmit} deleteButton={this.getDeleteButton()} />
        </div>
      </div>
    );
  }
}

export default connect(null, { updateClassroom, deleteClassroom })(Classroom);
