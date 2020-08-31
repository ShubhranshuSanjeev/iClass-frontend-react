import {
  FETCH_QUIZ_PERMISSIONS,
  UPDATE_QUIZ_PERMISSIONS,
} from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  var permissions = {};
  switch (type) {
    case FETCH_QUIZ_PERMISSIONS:
      payload.permissions.forEach(permission => permissions[permission.id] = permission);
      return { ...permissions };
    case UPDATE_QUIZ_PERMISSIONS:
      payload.permissions.forEach(permission => permissions[permission.id] = permission);
      return { ...state, ...permissions };
    default:
      return state;
  }
};
