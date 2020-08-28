import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz } from '../../../actions/quiz';
import { fetchClassroom } from '../../../actions/classroom';
import QuizForm from './QuizForm';
import styles from './App.module.css';


class Quiz extends Component{

}

export default connect(null, { fetchQuiz, fetchClassroom })(Quiz);
