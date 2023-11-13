import { combineReducers } from "redux";
import authReducer from "@/store/slices/auth";
import userReducer from "@/store/slices/user";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
