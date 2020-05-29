import {
  FETCH_CLASSROOM_STUDENTS,
  REMOVE_CLASSROOM_STUDENT
} from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CLASSROOM_STUDENTS:
      var students = {};
      payload.students.forEach(student => students[student.id] = student);
      return { ...students };
    case REMOVE_CLASSROOM_STUDENT:
      var copyState = state;
      delete copyState[payload];
      return { ...copyState };
    default:
      return state;
  }
}; 
