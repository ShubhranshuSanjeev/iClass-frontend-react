import React, { Component } from "react";
import { connect } from 'react-redux';

import { fetchJoinRequests, acceptJoinRequest, declineJoinRequest } from '../../../actions/classroom';

class Members extends Component {

  componentDidMount() {
    const { fetchJoinRequests, classroomId } = this.props;
    fetchJoinRequests(classroomId);
  }

  acceptRequest = (id) => {
    const { acceptJoinRequest, classroomId } = this.props;
    acceptJoinRequest(classroomId, id);
  }

  declineRequest = (id) => {
    const { declineJoinRequest, classroomId } = this.props;
    declineJoinRequest(classroomId, id);
  }

  getTableCaption() {
    const { joinRequests } = this.props;
    if (!joinRequests.length) return <caption>No Join Requests.</caption>;
    return <caption>List of Join Requests</caption>
  }

  renderMembersList() {
    const { joinRequests } = this.props;
    if (!joinRequests.length) return <></>;
    let i = 0;
    return joinRequests.map(joinRequest => {
      return (
        <tr key={joinRequest.id} data-key={joinRequest.id} style={{
          fontSize: "14px",
          fontWeight: "100",
        }}>
          <th scope="row" style={{ verticalAlign: "middle" }}>{++i}</th>
          <td style={{ verticalAlign: "middle" }}>{joinRequest.student_name}</td>
          <td style={{ verticalAlign: "middle", maxWidth: "120px" }} onClick={() => this.acceptRequest(joinRequest.id)}>
            <button
              className="btn btn-primary"
              style={{
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              Accept
            </button>
          </td>
          <td style={{ verticalAlign: "middle", maxWidth: "120px" }} onClick={() => this.declineRequest(joinRequest.id)}>
            <button
              className="btn btn-danger"
              style={{
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              Decline
            </button>
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
                <th scope="col">Student Name</th>
                <th scope="col">Accept</th>
                <th scope="col">Decline</th>
              </tr>
            </thead>
            <tbody>
              {this.renderMembersList()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { joinRequests } = state;
  return { joinRequests: Object.values(joinRequests) };
};

export default connect(mapStateToProps, { fetchJoinRequests, acceptJoinRequest, declineJoinRequest })(Members);
