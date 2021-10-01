import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  downloadCreateReducer,
  downloadListReducer,
  singleDownloadCreateReducer,
} from "./reducers/downloadReducers";

const reducer = combineReducers({
  downloadList: downloadListReducer,
  downloadCreate: downloadCreateReducer,
  singleDownloadCreate: singleDownloadCreateReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
