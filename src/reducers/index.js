import { combineReducers } from "redux";
import auth from "./authReducers";
import errors from "./errors";
import messages from "./messages";
import classrooms from './classroomReducers';
import assignments from './assignmentsReducers';

export default combineReducers({
  auth,
  errors,
  messages,
  classrooms,
  assignments
});
