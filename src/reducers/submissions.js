import {
  FETCH_SUBMISSIONS, UPDATE_SUBMISSION,
} from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUBMISSIONS:
      var submissions = {};
      payload.submissions.forEach(assignment => submissions[assignment.id] = assignment);
      return { ...submissions };
    case UPDATE_SUBMISSION:
      return { ...state, [payload.submission.id]: payload.submission };
    default:
      return state;
  }
}; 
