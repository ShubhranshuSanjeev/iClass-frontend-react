import {
  FETCH_CLASSROOMS,
  FETCH_CLASSROOM,
} from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CLASSROOMS:
      var classrooms = new Map();
      payload.classrooms.forEach(classroom => classrooms[classroom.id] = classroom);
      return { ...state, ...classrooms }
    default:
      return state;
  }
}; 
