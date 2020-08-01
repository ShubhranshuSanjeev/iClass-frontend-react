import React, { Component } from "react";
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import { fetchQuizzes } from '../../../actions/quiz';

class Quiz extends Component{

  componentDidMount() {
    const { classroomId, fetchQuizzes } = this.props;
    fetchQuizzes(classroomId);
  }

  getActions() {
    const { is_student } = this.props;
    if( is_student ){
      return (
        <button
          className="btn btn-primary"
          style={{
            fontWeight: "700",
            fontSize: "13px",
          }}
        >
          Attempt Quiz
        </button>
      );
    }
    else {
      return (
        <>
          <button
            className="btn btn-success mb-2"
            style={{
              fontWeight: "700",
              fontSize: "13px",
            }}
          >
            Settings
          </button>
          <button
            className="btn btn-primary"
            style={{
              fontWeight: "700",
              fontSize: "13px",
            }}
          >
            Manage Questions
          </button>
        </>
      );
    }
  }

  renderQuizList () {
    const { quizzes } = this.props;
    if(!quizzes.length) return <></>;
    return quizzes.map(quiz => {
      return (
        <div className="row mb-4" key={quiz.id}>
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-8 d-flex flex-column justify-content-center">
                    <h5>{quiz.name}</h5>
                    <p style={{ fontSize:"12px", margin: "0", textDecoration:"underline" }}>Created By: {quiz.owner_name}</p>
                  </div>
                  <div className="col-4 d-flex justify-content-end">
                    <div className="w-75 d-flex flex-column justify-content-center">
                      {this.getActions()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render(){
    console.log(this.props.quizzes);
    return (
      <div className="row">
        <div className="col-12">
          {this.renderQuizList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { is_student, is_teacher } = state.auth.user;
  return { quizzes: Object.values(state.quiz), is_student, is_teacher };
};

export default connect(mapStateToProps, { fetchQuizzes, })(Quiz);
