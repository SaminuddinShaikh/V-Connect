import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {};

const alertReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GLOBALTYPES.ALERT:
      return actions.payload;
    default:
      return state;
  }
};

export default alertReducer;
