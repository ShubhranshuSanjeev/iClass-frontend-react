import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, updateQuiz, deleteQuiz, updateQuizPermissions, fetchQuizPermissions } from '../../../actions/quiz';
import QuizForm from './QuizForm';
import styles from './App.module.css';


class Quiz extends Component{
  componentDidMount(){
    const {
      match: {
        params: {
          id,
          classroomId
        }
      },
      fetchQuiz,
      fetchQuizPermissions
    } = this.props;

    fetchQuiz(classroomId, id);
    fetchQuizPermissions(classroomId, id);
  }

  getInitialValues() {
    const {
      quiz: {
        name, end_time,
        start_time, duration,
        publish_results, max_attempts,
        enable_quiz_for_all,
      }
    } = this.props;
    let a = duration.split(" ");
    let b = a[1].split(":");
    const parseDuration = {
      days: a[0],
      ...{
        hours: b[0],
        minutes: b[1],
        seconds: b[2]
      }
    };
    return {
      name,
      startTime: new Date(start_time),
      endTime: new Date(end_time),
      duration: parseDuration,
      maxAttempts: max_attempts,
      publishResults: publish_results,
      enableQuizForAll:enable_quiz_for_all
    };
  }

  render() {
    const { classroom, quiz } = this.props;
    console.log(quiz, "rendering");
    if (!classroom || !quiz) return <p>undefined</p>;
    if(!quiz.hasOwnProperty('duration')) return <p>no duration</p>;
    return (
      <>
      <div className="card">
        <div className={`card-body ${styles.formText}`}>
          <QuizForm buttonText='Save' initialValue={this.getInitialValues()} onSubmit={this.onSubmit} />
          <button className={`btn btn-danger ${styles.myBtn} d-flex align-items-center`} onClick={this.handleDelete}>
            <span className="material-icons mr-1">delete</span>
            <span>Delete</span>
          </button>
        </div>
      </div>
      <hr />
      <h4>Submissions</h4>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match: { params: {id, classroomId} } } = ownProps;
  return { quiz: state.quiz[id], classroom: state.classrooms[classroomId] };
};

export default connect(mapStateToProps, {
  fetchQuiz,
  updateQuiz,
  deleteQuiz,
  updateQuizPermissions,
  fetchQuizPermissions
})(Quiz);
