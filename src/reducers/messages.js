import { GET_MESSAGES, CREATE_MESSAGE } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_MESSAGES:
			return payload;
		case CREATE_MESSAGE:
			return { ...payload };
		default:
			return state;
	}
};
