import {
  FETCH_QUIZZES,
  FETCH_QUIZ,
  UPDATE_QUIZ,
  DELETE_QUIZ,
  FETCH_QUIZ_PERMISSIONS,
  UPDATE_QUIZ_PERMISSIONS,
} from './types';

import history from '../history';
import { createMessage }  from './messages';
import axios from '../api';

export const createQuiz = (id, {name, maxAttempts, startTime, endTime, duration}) => (dispatch, getState) => {

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
    end_time: endTime,
    duration: duration
  }

  axios.post(`/classrooms/${id}/quizzes`, body, config)
    .then(res => {
      history.push(`/classrooms/${id}/quiz`);
      dispatch(
        createMessage({
          quiz: res.data.message
        })
      );
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

export const fetchQuiz = (classroomId, id) => (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {}
  };
  if(token)
    config.headers['Authorization'] = `Token ${token}`;
  console.log("Start Fetch");
  axios.get(`/classrooms/${classroomId}/quizzes/${id}`, config)
    .then(res => {
      console.log(res.data);
      dispatch({ type: FETCH_QUIZ, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
}

export const updateQuiz = (
  classroomId,
  id, {
    name,
    maxAttempts,
    startTime,
    endTime,
    duration
  }) => (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: { 'Content-Type' : 'application/json', }
  }
  if(token)
    config.headers['Authorization'] = `Token ${token}`;

  const body = {
    name: name,
    max_attempts: maxAttempts,
    start_time: startTime,
    end_time: endTime,
    duration: duration
  }

  // axios.patch(`/classrooms/${classroomId}/quizzes/${id}`,)
  //   .
}

export const deleteQuiz = (classroomId, id) => (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: { 'Content-Type' : 'application/json', }
  }
  if(token)
    config.headers['Authorization'] = `Token ${token}`;

  // axios.delete(`/classrooms/${classroomId}/quizzes/${id}`, config)
}

export const fetchQuizPermissions = (classroomId, id) => (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: { 'Content-Type' : 'application/json', }
  }
  if(token)
    config.headers['Authorization'] = `Token ${token}`;

  axios.get(`/classrooms/${classroomId}/quizzes/${id}/permissions`, config)
  .then(res => {
    console.log(res.data);
    dispatch({
      type: FETCH_QUIZ_PERMISSIONS,
      payload: res.data
    });
  })
  .catch(err => {
    console.log(err.data);
  });
}


export const updateQuizPermissions = (classroomId, id, formValues) => (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: { 'Content-Type' : 'application/json', }
  }
  if(token)
    config.headers['Authorization'] = `Token ${token}`;

  // axios.patch(`/classrooms/${classroomId}/quizzes/${id}/permissions`, config)
}
