import React, { Component } from 'react';
import { connect } from 'react-redux';
import { joinClassroom } from '../../../actions/classroom';
import { withAlert } from 'react-alert';

import styles from './App.module.css';

class JoinClassForm extends Component {
  state = {
    classroomid: '',
  }

  onChange = (event) => {
    this.setState({ classroomid: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (!this.state.classroomid)
      this.props.alert.error('Please fill the required fields');
    else
      this.props.joinClassroom(this.state.classroomid);
  }

  render() {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="card shadow col-4 px-4 pt-5" style={{ border: "none" }}>
          <h5 className={`card-title ml-4 ${styles.cardTitle}`}>
            Join Classroom
          </h5>
          <div className={`card-body px-2 mt-1 ${styles.formText}`}>
            <form className="px-3 w-100" onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="classroomid">Classroom Id</label>
                <input
                  name="classroomid"
                  type="text"
                  className="form-control"
                  id="classroomid"
                  value={this.state.classroomid}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group row mt-4 justify-content-center">
                <div className="col-sm-9 d-flex justify-content-center">
                  <button
                    type="submit"
                    className={`btn btn-success py-2 px-4 ${styles.myBtn}`}
                  >
                    Submit
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { joinClassroom, })(withAlert()(JoinClassForm));
