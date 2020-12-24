import axios from "axios";
import * as types from "../../types/room/roomType";
import {formatRooms} from "../../helpers/FormatRooms";
const ws = new WebSocket('ws://localhost:9999');


export const getRooms = (token, roomsOnPage) =>async dispatch=>{
    axios({
        method: 'get',
        url: 'http://localhost:9999/room',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }).then((response) => {
        const rooms = response.data.rooms;

        const currentRoomId = localStorage.getItem('currentRoomId');
        const roomsFormated = formatRooms(rooms, currentRoomId);

        if (response.status === 200) {
            dispatch({
                type: types.ROOM_SET,
                rooms: roomsFormated,
            });
            dispatch({
                type: types.ROOM_SET_ACTUAL,
                actualRooms: roomsFormated.slice(0, roomsOnPage),
            });
            dispatch({
                type: types.ROOM_SET_STEP,
                step: roomsOnPage,
            });
        }
    }).catch((error) => {
        console.log(error.response.data.message);
    });
}

export const addUser = (roomId, userId, token) =>async dispatch=>{
    const params = new URLSearchParams();
    params.append('userId', userId);

    dispatch({
        type: types.ROOM_SET_UP_CURRENT_ID,
        id: roomId,
    });

    axios({
        method: 'post',
        url: 'http://localhost:9999/room/' + roomId + '/add-user',
        data: params,
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            ws.send(JSON.stringify({route: 'refresh-rooms'}));
            dispatch({
                type: types.ROOM_SUCCESS,
                success: true,
            });

            const roomId = response.data.room._id;
            localStorage.setItem('currentRoomId', roomId);
        }
    }).catch((error) => {
        dispatch({
            type: types.ROOM_SET_MESSAGE,
            message: error.response.data.message,
        });
    });
};

export const outUser = (roomId, userId, token) =>async dispatch=>{
    axios({
        method: 'get',
        url: 'http://localhost:9999/room/' + roomId + '/out/' + userId,
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }).then((response) => {
        ws.send(JSON.stringify({route: 'refresh-rooms'}));
    }).catch((error) => {
        console.log(error.response);
    });
};

export const isBusyUser = (userId, token) =>async dispatch=>{
    axios({
        method: 'get',
        url: 'http://localhost:9999/room/is-user-busy/' + userId,
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }).then((response) => {
        dispatch({
            type: types.ROOM_SET_USER_BUSY,
            isBusy: response.data.isBusy,
        });
    }).catch((error) => {
        console.log(error.response);
    });
};

export const clearRoomData = () =>async dispatch=>{
    localStorage.removeItem('currentRoomId');
    dispatch({
        type: types.ROOM_SET_UP_CURRENT_ID,
        id: '',
    });
}
