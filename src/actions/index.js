import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  SIGN_OUT,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  GET_ERRORS,
  USER_LOADING,
  USER_LOADED,
} from "./types";
import { createMessage } from "./messages";
import axios from "../api";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const token = getState().auth.token;
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  axios
    .get("/auth/user", config)
    .then(res => {
      // setTimeout(() => {
      dispatch({ type: USER_LOADED, payload: res.data });
      // }, 1000);
    })
    .catch(err => {
      setTimeout(() => {
        const errors = {
          msg: err.response.data,
          status: err.response.status,
        };
        dispatch({ type: GET_ERRORS, payload: errors });
        dispatch({ type: AUTH_FAILURE });
      }, 1000);
    });
};

export const registerUser = formValues => dispatch => {
  dispatch({ type: REGISTER_USER_START });

  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    role,
  } = formValues;
  var is_student = false,
    is_teacher = false;
  if (role === "student") is_student = true;
  else if (role === "teacher") is_teacher = true;

  const body = JSON.stringify({
    username,
    email,
    password,
    first_name,
    last_name,
    is_student,
    is_teacher,
  });
  axios
    .post("/auth/register", body, config)
    .then(res => {
      dispatch(
        createMessage({
          userRegistered:
            "Your account has been successfully created.",
        })
      );
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch({ type: GET_ERRORS, payload: errors });
      dispatch({ type: REGISTER_USER_FAILURE });
    });
};

export const loginUser = formValues => dispatch => {
  dispatch({ type: AUTH_START });

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { email, password } = formValues;
  const body = JSON.stringify({ email, password });

  axios
    .post("/auth/login", body, config)
    .then(res => {
      dispatch({ type: AUTH_SUCCESS, payload: res.data });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      setTimeout(() => {
        dispatch({ type: GET_ERRORS, payload: errors });
        dispatch({ type: AUTH_FAILURE });
      }, 1000);
    });
};

export const logoutUser = () => (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios.post('/auth/logout', {}, config)
    .then(res => {
      dispatch({ type: SIGN_OUT });
    })
    .catch(err => {
      console.log(err.response);
    })
}
