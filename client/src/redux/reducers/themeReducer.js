import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = false;

const themeReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GLOBALTYPES.THEME:
      return actions.payload;
    default:
      return state;
  }
};

export default themeReducer;
