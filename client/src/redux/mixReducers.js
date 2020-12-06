import {combineReducers} from "redux";
import {authReducer} from "./reducers/auth/authReducer";
import {tokenReducer} from "./reducers/auth/tokenReducer";
import {userInfoReducer} from "./reducers/auth/userInfoReducer";
import {roomReducer} from "./reducers/room/roomReducer";

export default combineReducers({
    auth: authReducer,
    token: tokenReducer,
    userInfoReducer: userInfoReducer,
    roomReducer: roomReducer,
});