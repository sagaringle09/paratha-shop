import { combineReducers } from "redux";
import AddOnReducer from "./addOn";

import cart from "./cart";

const rootReducer = combineReducers({
  cart,
  addOnReducer: AddOnReducer,
});

export default rootReducer;
