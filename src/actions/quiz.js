import {
  FETCH_QUIZZES,
  FETCH_QUIZ,
  UPDATE_QUIZ,
  DELETE_QUIZ
} from './types';

import history from '../history';
import { createMessage }  from './messages';
import axios from '../api';

export const createQuiz = (id, {name, maxAttempts, startTime, duration}) => (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  const body = {
    name: name,
    max_attempts: maxAttempts,
    start_time: startTime,
    duration: duration
  }

  axios.post(`/classrooms/${id}/quizzes`, body, config)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

export const fetchQuizzes = (id) => (dispatch, getState) =>{
  const { token } = getState().auth;
  const config = {
    headers: {}
  };
  if(token)
    config.headers['Authorization'] = `Token ${token}`;
  console.log("Start Fetch");
  axios.get(`/classrooms/${id}/quizzes`, config)
    .then(res => {
      dispatch({ type: FETCH_QUIZZES, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
}
