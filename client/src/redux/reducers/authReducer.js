import { TYPES } from "../actions/authActions";

const initialState = {};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.AUTH:
      return actions.payload;
    default:
      return state;
  }
};

export default authReducer;
