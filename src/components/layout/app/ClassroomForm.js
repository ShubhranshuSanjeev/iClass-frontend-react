import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createClassroom } from '../../../actions/classroom';
import { withAlert } from 'react-alert';

import styles from './App.module.css';

class ClassroomForm extends Component {
  state = {
    courseName: '',
    roomNumber: '',
    joiningPermission: undefined,
  }

  componentDidMount() {
    const { courseName, roomNumber, joiningPermission } = this.props.initialValue;
    this.setState({ courseName, roomNumber, joiningPermission });
  }

  onChange = (event) => {
    if (event.target.name === 'joiningPermission')
      this.setState({ ...this.state, [event.target.name]: event.target.checked })
    else
      this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { courseName, roomNumber } = this.state;
    const { onSubmit } = this.props;
    if (!courseName || !roomNumber)
      this.props.alert.error('Please fill the required fields');
    else
      onSubmit(this.state);
  }

  render() {
    return (
      <form className="px-3 w-100" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            name="courseName"
            type="text"
            className="form-control"
            id="courseName"
            value={this.state.courseName}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomNumber">Room Number</label>
          <input
            name="roomNumber"
            type="text"
            className="form-control"
            id="roomNumber"
            value={this.state.roomNumber}
            onChange={this.onChange}
          />
        </div>
        <div className="custom-control custom-switch">
          <input
            name="joiningPermission"
            type="checkbox"
            className="custom-control-input"
            id="joiningPermission"
            onChange={this.onChange}
            checked={this.state.joiningPermission}
          />
          <label className="custom-control-label" htmlFor="joiningPermission">Join Permission</label>
        </div>
        <div className="form-group row mt-4">
          <div className="col-12 d-flex justify-content-end">
            {this.props.deleteButton ? this.props.deleteButton : <></>}
            <button
              type="submit"
              className={`btn btn-success ml-3 d-flex align-items-center ${styles.myBtn}`}
            >
              <span className="material-icons mr-1">save</span>
              {this.props.buttonText}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(null, { createClassroom, })(withAlert()(ClassroomForm));
