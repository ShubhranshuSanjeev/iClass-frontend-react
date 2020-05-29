import {
  FETCH_ASSIGNMENTS,
  FETCH_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  DELETE_ASSIGNMENT
} from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ASSIGNMENTS:
      var assignments = {};
      payload.assignments.forEach(assignment => assignments[assignment.id] = assignment);
      return { ...assignments };
    case UPDATE_ASSIGNMENT:
    case FETCH_ASSIGNMENT:
      return { ...state, [payload.assignment.id]: payload.assignment };
    case DELETE_ASSIGNMENT:
      var copyState = state;
      delete copyState[payload];
      return { ...copyState };
    default:
      return state;
  }
}; 
