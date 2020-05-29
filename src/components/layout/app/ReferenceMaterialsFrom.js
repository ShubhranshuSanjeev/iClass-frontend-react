import React from 'react';
import { withAlert } from 'react-alert';

import styles from './App.module.css';

class ReferenceMaterialsForm extends React.Component {
  state = {
    description: '',
    file: undefined
  }

  componentDidMount() {
    const { description, file } = this.props.initialValue;
    this.setState({ description, file });
  }

  onChange = (event) => {
    if (event.target.name === 'file')
      this.setState({ ...this.state, file: event.target.files[0] });
    else
      this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { description, file } = this.state;
    const { alert, onSubmit } = this.props;
    if (!description || !file) { alert.error('Please fill all required fields.'); }
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

export default withAlert()(ReferenceMaterialsForm);
