import { combineReducers } from "redux";
import auth from "./authReducer";
import notify from "./notifyReducers";

export default combineReducers({
  auth,
  notify,
});
