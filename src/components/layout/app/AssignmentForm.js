import React from 'react';
import { withAlert } from 'react-alert';

import styles from './App.module.css';

class AssignmentForm extends React.Component {
  state = {
    description: '',
    maxMarks: '',
    deadline: undefined,
    file: undefined,
    publishGrades: ''
  }

  componentDidMount() {
    const { description, maxMarks, deadline, file, publishGrades } = this.props.initialValue;
    this.setState({ description, maxMarks, deadline, file, publishGrades });
  }

  onChange = (event) => {
    if (event.target.name === 'file')
      this.setState({ ...this.state, file: event.target.files[0] });
    else if (event.target.name === 'publishGrades')
      this.setState({ ...this.state, [event.target.name]: event.target.checked });
    else
      this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  validateDeadline() {
    const currentDate = new Date();
    const year = currentDate.getFullYear(), month = currentDate.getMonth() + 1, day = currentDate.getDate();
    const [a, b, c] = this.state.deadline.split('-').map(d => parseInt(d));
    const valid = a < year ? false : (a > year ? true : (b < month ? false : (b > month ? true : (c < day ? false : true))));
    return valid;
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { description, maxMarks, deadline, file } = this.state;
    const { alert, onSubmit } = this.props;
    if (!description || !deadline || !file) { alert.error('Please fill all required fields.'); }
    else if (maxMarks < 0) { alert.error('Max marks cannot be less than zero.'); }
    else if (!this.validateDeadline()) { alert.info('Give a valid deadline.'); }
    else { onSubmit(this.state); }
  }

  render() {
    return (
      <form className="px-3 w-100" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            className="form-control"
            id="description"
            value={this.state.description}
            onChange={this.onChange}
          />
        </div>
        <div className="form-row form-group">
          <div className="col">
            <label htmlFor="email">Max Marks</label>
            <input
              name="maxMarks"
              type="number"
              className="form-control"
              id="maxMarks"
              value={this.state.maxMarks}
              onChange={this.onChange}
            />
          </div>
          <div className="col">
            <label htmlFor="email">Deadline</label>
            <input
              name="deadline"
              type="date"
              className="form-control"
              id="deadline"
              value={this.state.deadline || ''}
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="form-group mt-4">
          <div className="custom-file">
            <label className="custom-file-label" htmlFor="file" >{this.state.file ? this.state.file.name : 'Choose file'}</label>
            <input
              name="file"
              type="file"
              className="custom-file-input"
              id="file"
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="custom-control custom-switch">
          <input
            name="publishGrades"
            type="checkbox"
            className="custom-control-input"
            id="publishGrades"
            onChange={this.onChange}
            checked={this.state.publishGrades}
          />
          <label className="custom-control-label" htmlFor="publishGrades">Publish Grades</label>
        </div>
        <div className="form-group row mt-4">
          <div className="col-12 d-flex justify-content-end">
            <button
              type="submit"
              className={`btn btn-success py-2 px-4 ${styles.myBtn}`}
            >
              {this.props.buttonText}
            </button>
          </div>
        </div>
      </form>
    );
  }
};

export default withAlert()(AssignmentForm);
