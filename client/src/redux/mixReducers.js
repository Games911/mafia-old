import {combineReducers} from "redux";
import {authReducer} from "./reducers/auth/authReducer";
import {tokenReducer} from "./reducers/auth/tokenReducer";
import {userInfoReducer} from "./reducers/auth/userInfoReducer";
import {roomReducer} from "./reducers/room/roomReducer";
import {createRoomReducer} from "./reducers/room/createRoomReducer";

export default combineReducers({
    auth: authReducer,
    token: tokenReducer,
    userInfoReducer: userInfoReducer,
    roomReducer: roomReducer,
    createRoomReducer: createRoomReducer,
});