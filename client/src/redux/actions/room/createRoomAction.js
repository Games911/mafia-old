import {errorsResult, isRequire, maxLength, minLength, startValidation} from "../../helpers/Validation";
import * as types from "../../types/room/createRoomType";
import axios from "axios";
const ws = new WebSocket('ws://localhost:8888');


export const nameValidate = (value) =>async dispatch=>{
    const field = 'name';

    startValidation(field);
    isRequire(value, field);
    minLength(value, field, 2);
    maxLength(value, field, 20);

    dispatch({
        type: types.CREATE_ROOM_SET_NAME_ERROR,
        errors: errorsResult[field],
    });
    dispatch({
        type: types.CREATE_ROOM_CHANGED_NAME_STATE,
        changed: true,
    });
};

export const createRoom = (name, userId, token) =>async dispatch=>{
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('userId', userId);

    axios({
        method: 'post',
        url: 'http://localhost:9999/room',
        data: params,
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 201) {
            ws.send(JSON.stringify({route: 'refresh-rooms'}));
            const roomId = response.data.room._id;
            ws.send(JSON.stringify({route: 'add-network', roomId: roomId}));
            localStorage.setItem('currentRoomId', roomId);
            localStorage.setItem('currentRoom', JSON.stringify(response.data.room));
            window.location.href = '/cabinet/room/' + roomId;
        }
    }).catch((error) => {
        console.log(error.response);
        dispatch({
            type: types.CREATE_ROOM_API_ERROR,
            message: error.response.data.message,
        });
    });
}