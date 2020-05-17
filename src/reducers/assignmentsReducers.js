import {
  FETCH_ASSIGNMENTS,
  FETCH_ASSIGNMENT
} from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ASSIGNMENTS:
      var assignments = {};
      payload.assignments.forEach(assignment => assignments[assignment.id] = assignment);
      return { ...assignments };
    default:
      return state;
  }
}; 
