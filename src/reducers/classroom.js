import {
  FETCH_CLASSROOMS,
  FETCH_CLASSROOM,
  UPDATE_CLASSROOM,
  DELETE_CLASSROOM,
} from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CLASSROOMS:
      var classrooms = new Map();
      payload.classrooms.forEach(classroom => classrooms[classroom.id] = classroom);
      return { ...classrooms }
    case UPDATE_CLASSROOM:
    case FETCH_CLASSROOM:
      return { ...state, [payload.id]: payload }
    case DELETE_CLASSROOM:
      const copyState = state;
      delete copyState[payload];
      return { ...copyState };
    default:
      return state;
  }
}; 
