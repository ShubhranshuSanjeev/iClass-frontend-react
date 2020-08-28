import React from 'react';
import { connect } from 'react-redux';
import { createQuiz } from '../../../actions/quiz';

import QuizForm from './QuizForm';
import styles from './App.module.css';

class QuizCreate extends React.Component {
  getInitialValues() {
    const res = {
      name : '',
      endTime : undefined,
      startTime: undefined,
      duration : {
        days: undefined,
        hours: undefined,
        minutes: undefined
      },
      maxAttempts : 1,
    };
    return res;
  }

  onSubmit = (formValues) => {
    const { createQuiz, match } = this.props;
    createQuiz(match.params.classroomId, formValues);
  }

  render() {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="card shadow col-6 px-4 pt-5" style={{ border: "none" }}>
          <h5 className={`card-title ml-4 ${styles.cardTitle}`}>
            Create Quiz
        </h5>
          <div className={`card-body px-2 mt-1 ${styles.formText}`}>
            <QuizForm buttonText='Submit' initialValue={this.getInitialValues()} actionType = '0' onSubmit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
};

export default connect(null, { createQuiz })(QuizCreate);
