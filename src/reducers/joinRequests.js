import {
  FETCH_JOIN_REQUESTS,
  ACCEPT_JOIN_REQUESTS,
  DECLINE_JOIN_REQUESTS
} from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_JOIN_REQUESTS:
      var requests = {};
      payload.join_requests.forEach(request => requests[request.id] = request);
      return { ...requests };
    case ACCEPT_JOIN_REQUESTS:
    case DECLINE_JOIN_REQUESTS:
      var copyState = state;
      delete copyState[payload];
      return { ...copyState };
    default:
      return state;
  }
}; 
