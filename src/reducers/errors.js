import { GET_ERRORS } from "../actions/types";

const INITIAL_STATE = {
	msg: {},
	status: null,
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_ERRORS:
			return { msg: payload.msg, status: payload.status };
		default:
			return state;
	}
};
