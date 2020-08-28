import React, { Component } from "react";
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { myBtn } from './App.module.css';
import { fetchQuizzes } from '../../../actions/quiz';

class Quiz extends Component{

  componentDidMount(){
    this.props.activateMenuItem("quiz");
  }

  getAddButton() {
    const { is_student, is_teacher, match : { params : { id : classroomId } } } = this.props;
    if (is_student) return <></>;
    if (is_teacher)
      return (
        <div className="btn-group">
          <button type="button" className="btn btn-primary pr-0"><span className="material-icons">add</span></button>
          <Link to={`/classrooms/${classroomId}/quiz/create`} className="btn btn-primary pl-0">
            Add Quiz
          </Link>
        </div>
      );
  }

  getActions() {
    const { is_student } = this.props;
    if( is_student ){
      return (
        <button className={`btn btn-primary ${myBtn}`}>Attempt Quiz</button>
      );
    }
    else {
      return (
        <>
          <button className={`btn btn-success mb-2 ${myBtn}`}>Settings</button>
          <button className={`btn btn-primary ${myBtn}`}>Manage Questions</button>
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
        <div className="col-12 d-flex justify-content-center">
          {this.getAddButton()}
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
