import React, { Component } from "react";
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import { fetchSubmissions, updateMarks } from '../../../actions/classroom';

class Submissions extends Component {
  state = {
    clicked: false,
    id: 0,
    marks: 0,
  }

  componentDidMount() {
    const { assignment, classroom, fetchSubmissions } = this.props;
    fetchSubmissions(classroom.id, assignment.id);
  }

  onChange = (event) => {
    this.setState({ ...this.state, marks: parseInt(event.target.value) });
  }

  onClick = (submission) => {
    const { id, marks } = submission;
    this.setState({ clicked: true, id, marks });
  }

  onSubmit = (event, id) => {
    event.preventDefault();
    const { assignment, classroom, updateMarks } = this.props;
    if (this.state.marks > assignment.max_marks) this.props.alert.error('Marks scored cannot be greater than max-marks');
    else {
      updateMarks(classroom.id, assignment.id, id, this.state.marks);
      this.setState({ clicked: false, id: 0, marks: 0 });
    }
  }

  getActions(submission) {
    const { clicked, id } = this.state;
    const { max_marks } = this.props.assignment;
    return (
      clicked && id === submission.id ?
        (
          <form
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ fontSize: "12px", fontWeight: "500" }}
            onSubmit={(e) => this.onSubmit(e, submission.id)} >
            <input
              type="number"
              name="marks"
              className="form-control"
              style={{ maxWidth: "100%" }}
              value={this.state.marks}
              onChange={this.onChange}
              min="0"
              max={max_marks}
            />
            <button type="submit" className="btn btn-primary mt-2" style={{ fontSize: "13px", fontWeight: "700" }}>Save</button>
          </form>
        )
        : (
          <button
            className="btn btn-primary"
            style={{
              fontWeight: "700",
              fontSize: "13px",
            }}
            onClick={() => this.onClick(submission)}
          >
            Edit
          </button>
        )
    );
  }

  getTableCaption() {
    const { submissions } = this.props;
    if (!submissions.length) return <caption>No Submissions yet.</caption>;
    return <caption>List of Submissions</caption>
  }

  renderSubmissionList() {
    const { submissions } = this.props;
    if (!submissions.length) return <></>;
    let i = 0;
    return submissions.map(submission => {
      return (
        <tr key={submission.id} data-key={submission.id} style={{
          fontSize: "14px",
          fontWeight: "100",
        }}>
          <th scope="row" style={{ verticalAlign: "middle" }}>{++i}</th>
          <td style={{ verticalAlign: "middle" }}>{submission.student_name}</td>
          <td style={{ verticalAlign: "middle" }}>{submission.marks}</td>
          <td style={{ verticalAlign: "middle" }}>
            <a href={`http://127.0.0.1:8000${submission.file}`} download>
              <span className="material-icons" style={{ color: "#6c63ff", cursor: "pointer" }}>save_alt</span>
            </a>
          </td>
          <td style={{ verticalAlign: "middle", maxWidth: "120px" }}>
            {this.getActions(submission)}
          </td>
        </tr >
      );
    });
  }

  render() {
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
                <th scope="col">Name</th>
                <th scope="col">Marks</th>
                <th scope="col">File</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.renderSubmissionList()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { submissions: Object.values(state.submissions) };
};

export default connect(mapStateToProps, { fetchSubmissions, updateMarks })(withAlert()(Submissions));
