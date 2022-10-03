import { TYPES } from "../actions/notifyAction";

const initialState = {};

const notifyReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.NOTIFY:
      return actions.payload;
    default:
      return state;
  }
};

export default notifyReducer;
