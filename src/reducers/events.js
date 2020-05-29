import { LOAD_EVENTS } from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_EVENTS:
      return { ...payload };
    default:
      return state;
  }
}
