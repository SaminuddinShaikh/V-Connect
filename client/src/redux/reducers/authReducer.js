import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GLOBALTYPES.AUTH:
      return actions.payload;
    default:
      return state;
  }
};

export default authReducer;
