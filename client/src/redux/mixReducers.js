import {combineReducers} from "redux";
import {authReducer} from "./reducers/auth/authReducer";
import {tokenReducer} from "./reducers/auth/tokenReducer";
import {userInfoReducer} from "./reducers/auth/userInfoReducer";
import {roomReducer} from "./reducers/room/roomReducer";
import {createRoomReducer} from "./reducers/room/createRoomReducer";
import {gameReducer} from "./reducers/game/gameReducer";
import {messageReducer} from "./reducers/game/messageReducer";

export default combineReducers({
    auth: authReducer,
    token: tokenReducer,
    userInfoReducer: userInfoReducer,
    roomReducer: roomReducer,
    createRoomReducer: createRoomReducer,
    gameReducer: gameReducer,
    messageReducer: messageReducer,
});