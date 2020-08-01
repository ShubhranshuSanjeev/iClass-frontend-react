import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import classrooms from './classroom';
import assignments from './assignments';
import submissions from './submissions';
import quiz from './quiz';
import members from './members';
import joinRequests from './joinRequests';
import events from './events';
import referenceMaterials from './referenceMaterials';

export default combineReducers({
  auth,
  errors,
  messages,
  classrooms,
  assignments,
  submissions,
  quiz,
  members,
  joinRequests,
  events,
  referenceMaterials
});
