import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  SIGN_OUT,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  USER_LOADING,
  USER_LOADED,
} from "../actions/types";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADING:
    case AUTH_START:
    case REGISTER_USER_START:
      return { ...state, isLoading: true };

    case USER_LOADED:
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case REGISTER_USER_SUCCESS:
    case AUTH_SUCCESS:
      localStorage.setItem("token", `${payload.token}`);
      console.log(localStorage.getItem("token"));
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
        isLoading: false,
      };

    case REGISTER_USER_FAILURE:
    case AUTH_FAILURE:
    case SIGN_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};
