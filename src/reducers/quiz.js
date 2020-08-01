import {
  FETCH_QUIZZES,
  FETCH_QUIZ,
  UPDATE_QUIZ,
  DELETE_QUIZ
} from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_QUIZZES:
      var quizzes = {};
      payload.quizzes.forEach(quiz => quizzes[quiz.id] = quiz);
      return { ...quizzes };
    case UPDATE_QUIZ:
    case FETCH_QUIZ:
      return { ...state, [payload.quiz.id]: payload.quiz };
    case DELETE_QUIZ:
      var copyState = state;
      delete copyState[payload];
      return { ...copyState };
    default:
      return state;
  }
};
