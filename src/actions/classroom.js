import {
  FETCH_CLASSROOMS,
  FETCH_CLASSROOM,
  FETCH_ASSIGNMENTS,
  FETCH_ASSIGNMENT,
  FETCH_REFERENCE_MATERIALS,
  FETCH_REFERENCE_MATERIAL,
  FETCH_CLASSROOM_STUDENTS
} from './types';

import axios from '../api';

export const fetchClassrooms = () => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  console.log(config);
  axios.get('/classrooms', config)
    .then(res => {
      console.log('Here', res.data);
      setTimeout(() => dispatch({ type: FETCH_CLASSROOMS, payload: res.data }), 1100);
    })
    .catch(err => {
      console.log(err.response);
    })
};

export const fetchClassroom = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  console.log(config);
  axios.get(`/classrooms/${id}`, config)
    .then(res => {
      console.log('Here', res.data);
      // setTimeout(() => dispatch({ type: FETCH_CLASSROOMS, payload: res.data }), 1100);
    })
    .catch(err => {
      console.log(err.response);
    })
};

export const fetchAssignments = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.get(`/classrooms/${id}/assignments`, config)
    .then(res => {
      dispatch({ type: FETCH_ASSIGNMENTS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const fetchAssignment = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {}
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.get(`/assignments/${id}`, config)
    .then(res => {
      window.open(res.data.file);
    });
};
