import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import mixReducers from "./mixReducers";
import {composeWithDevTools} from "redux-devtools-extension";

const initialState = {};
const middleware = [thunk];
const store = createStore(mixReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;